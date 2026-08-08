#!/usr/bin/env node
/**
 * Ponte de conversões server-side da landing imobhub.app.
 *
 * Manda as conversões para a Conversions API do OpenAI Ads (bzr.openai.com),
 * em vez de depender só do pixel no navegador. Dois motivos:
 *
 *   1. O pixel é bloqueável (adblock) e, em 07/08/2026, a ingestão dele estava
 *      devolvendo 503 enquanto a API server-side respondia 200.
 *   2. O agendamento de demo só é conversão de verdade quando a reserva existe.
 *      No clique do Calendly a gente superconta quem clica e desiste.
 *
 * Duas entradas:
 *   POST /capi/registration  -> registration_completed (chamado pelos forms do site)
 *   poller do Calendly       -> appointment_scheduled  (reserva confirmada de verdade)
 *
 * O plano do Calendly é free, que NÃO tem webhook (a API responde 403
 * "Please upgrade your Calendly account to Standard"). Por isso o caminho é
 * polling de /scheduled_events, com dedupe por URI do evento.
 *
 * Zero dependências: só o que vem no Node 18.
 */

import http from "node:http";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

// ---------------------------------------------------------------- config

const env = (key, fallback) => {
  const v = process.env[key];
  if (v === undefined || v === "") {
    if (fallback === undefined) {
      console.error(`[capi-bridge] faltando variável obrigatória: ${key}`);
      process.exit(1);
    }
    return fallback;
  }
  return v;
};

const PORT = Number(env("PORT", "3391"));
const PIXEL_ID = env("OPENAI_PIXEL_ID");
const CAPI_KEY = env("OPENAI_CAPI_KEY");
const CAPI_URL = `https://bzr.openai.com/v1/events?pid=${encodeURIComponent(PIXEL_ID)}`;

const CALENDLY_PAT = env("CALENDLY_PAT", "");
const CALENDLY_USER_URI = env("CALENDLY_USER_URI", "");
const POLL_MINUTES = Number(env("CALENDLY_POLL_MINUTES", "10"));

const ALLOWED_ORIGIN = env("ALLOWED_ORIGIN", "https://imobhub.app");
const CURRENCY = env("CURRENCY", "BRL");
const STATE_FILE = env("STATE_FILE", "/var/lib/openai-capi-bridge/state.json");

/**
 * Modo ensaio: manda validate_only=true, então a OpenAI valida o payload e
 * responde accepted_events SEM registrar conversão. É o dry-run do canário.
 */
const DRY_RUN = env("DRY_RUN", "false") === "true";

// ---------------------------------------------------------------- util

const log = (...args) => console.log(new Date().toISOString(), "[capi-bridge]", ...args);

const sha256 = (value) =>
  crypto.createHash("sha256").update(String(value).trim().toLowerCase()).digest("hex");

/** E-mail nunca vai em claro nem para a OpenAI nem para o log. */
const maskEmail = (email) => {
  const [user = "", domain = ""] = String(email).split("@");
  return `${user.slice(0, 2)}***@${domain}`;
};

// ---------------------------------------------------------------- estado

/**
 * Guarda as URIs de agendamento já enviadas, para o poller não mandar a mesma
 * reserva duas vezes. A CAPI também deduplica pelo `id`, mas não dá para contar
 * com uma janela de dedupe indefinida do lado deles — então guardamos aqui.
 */
let state = { seenEvents: [] };

function loadState() {
  try {
    state = JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));
    if (!Array.isArray(state.seenEvents)) state.seenEvents = [];
    log(`estado carregado: ${state.seenEvents.length} agendamentos já enviados`);
  } catch {
    log("sem estado anterior — começando limpo");
  }
}

function saveState() {
  // Mantém as 5000 mais recentes: o suficiente para anos de agendamento.
  if (state.seenEvents.length > 5000) {
    state.seenEvents = state.seenEvents.slice(-5000);
  }
  fs.mkdirSync(path.dirname(STATE_FILE), { recursive: true });
  fs.writeFileSync(STATE_FILE, JSON.stringify(state), { mode: 0o600 });
}

// ---------------------------------------------------------------- CAPI

/**
 * Envia um lote para a Conversions API, com retentativa em falha transitória.
 * O 503 que vimos na ingestão do pixel mostra que essa API tem indisponibilidade
 * de verdade — sem retry, conversão vira perda silenciosa.
 */
/**
 * A CAPI recusa evento com mais de 7 dias (422 event_timestamp_too_old) e o
 * lote inteiro cai junto se um evento falhar. Então reserva velha é descartada
 * antes de sair — e marcada como vista, senão volta em toda rodada do poller.
 */
const MAX_EVENT_AGE_MS = 6 * 24 * 3600 * 1000; // 6 dias: margem sobre o teto de 7
const isTooOld = (timestampMs) => Date.now() - timestampMs > MAX_EVENT_AGE_MS;

/** Resultado do envio: 'ok' | 'permanente' (não adianta repetir) | 'transitorio'. */
async function sendEvents(events, { attempt = 1 } = {}) {
  if (!events.length) return "ok";
  const body = JSON.stringify({ validate_only: DRY_RUN, events });

  let res;
  try {
    res = await fetch(CAPI_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CAPI_KEY}`,
        "Content-Type": "application/json",
      },
      body,
      signal: AbortSignal.timeout(15000),
    });
  } catch (err) {
    return retryOrFail(events, attempt, `falha de rede: ${err.message}`);
  }

  const text = await res.text().catch(() => "");

  if (res.ok) {
    log(`enviado ${events.length} evento(s)${DRY_RUN ? " [DRY-RUN]" : ""}: ${text.slice(0, 120)}`);
    return "ok";
  }

  // 4xx (fora de 429) é payload errado: retentar não resolve, só esconde o bug.
  if (res.status < 500 && res.status !== 429) {
    log(`ERRO permanente ${res.status}: ${text.slice(0, 300)}`);
    return "permanente";
  }

  return retryOrFail(events, attempt, `HTTP ${res.status}`);
}

async function retryOrFail(events, attempt, reason) {
  const MAX = 5;
  if (attempt >= MAX) {
    log(`desistindo depois de ${MAX} tentativas (${reason}) — eventos pendentes: ${events.length}`);
    return "transitorio";
  }
  const waitMs = Math.min(60000, 2 ** attempt * 1000);
  log(`${reason} — tentativa ${attempt}/${MAX}, nova tentativa em ${waitMs}ms`);
  await new Promise((r) => setTimeout(r, waitMs));
  return sendEvents(events, { attempt: attempt + 1 });
}

/**
 * Monta o evento no formato da CAPI.
 *
 * `oppref` é o identificador de clique do anúncio e vai no NÍVEL DO EVENTO —
 * verificado contra a API: `obref` e `click_id` são rejeitados com
 * "Unknown field". Cuidado: o objeto `user` é permissivo, então nome errado
 * ali passa calado e a conversão chega sem atribuição nenhuma.
 */
function buildEvent({ id, type, timestampMs, sourceUrl, oppref, email, ip, userAgent, data }) {
  const event = {
    id,
    type,
    timestamp_ms: timestampMs,
    source_url: sourceUrl,
    action_source: "web",
    data,
  };

  if (oppref) event.oppref = oppref;

  const user = {};
  if (email) user.email_sha256 = sha256(email);
  if (ip) user.ip_address = ip;
  if (userAgent) user.user_agent = userAgent;
  if (Object.keys(user).length) event.user = user;

  return event;
}

// ---------------------------------------------------------------- HTTP

/** Rate limit simples por IP: o endpoint é público, então tem que ter teto. */
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const windowMs = 60000;
  const max = 20;
  const entry = hits.get(ip);
  if (!entry || now - entry.start > windowMs) {
    hits.set(ip, { start: now, count: 1 });
    return false;
  }
  entry.count += 1;
  return entry.count > max;
}

// Limpeza periódica para o Map não crescer sem teto.
setInterval(() => {
  const cutoff = Date.now() - 120000;
  for (const [ip, entry] of hits) if (entry.start < cutoff) hits.delete(ip);
}, 120000).unref();

const readCookie = (header, name) => {
  const match = String(header || "")
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : "";
};

function readBody(req, limitBytes = 4096) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > limitBytes) {
        reject(new Error("body grande demais"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

async function handleRegistration(req, res) {
  const origin = req.headers.origin;
  if (origin && origin !== ALLOWED_ORIGIN) {
    res.writeHead(403).end();
    return;
  }

  // Atrás do nginx, o IP real vem no X-Forwarded-For.
  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  if (rateLimited(ip || "desconhecido")) {
    res.writeHead(429).end();
    return;
  }

  let payload = {};
  try {
    payload = JSON.parse((await readBody(req)) || "{}");
  } catch {
    res.writeHead(400).end();
    return;
  }

  // O cookie __oppref é first-party do imobhub.app, então o nginx repassa
  // sozinho — não precisa o navegador mandar o valor no corpo (nem daria para
  // confiar se mandasse).
  const oppref = readCookie(req.headers.cookie, "__oppref");

  const event = buildEvent({
    id: String(payload.event_id || crypto.randomUUID()).slice(0, 128),
    type: "registration_completed",
    timestampMs: Date.now(),
    sourceUrl: String(payload.source_url || ALLOWED_ORIGIN).slice(0, 500),
    oppref,
    ip,
    userAgent: req.headers["user-agent"],
    // O valor é fixado no servidor de propósito: endpoint público não pode
    // deixar o navegador escolher quanto vale a conversão.
    data: { type: "customer_action", amount: 0, currency: CURRENCY },
  });

  // Sem oppref a conversão chega mas não casa com o anúncio — e isso é o tipo
  // de coisa que quebra calada. Fica no log para dar para auditar depois.
  log(`registration_completed — oppref: ${oppref ? "sim" : "NÃO (sem atribuição)"}`);

  // Responde na hora: o form do site não pode ficar esperando a OpenAI.
  res.writeHead(204, {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Credentials": "true",
  });
  res.end();

  sendEvents([event]).catch((err) => log("erro no envio de registration:", err.message));
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Max-Age": "86400",
    });
    res.end();
    return;
  }

  if (req.method === "GET" && url.pathname === "/healthz") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        ok: true,
        dry_run: DRY_RUN,
        calendly_poller: Boolean(CALENDLY_PAT && CALENDLY_USER_URI),
        seen_events: state.seenEvents.length,
      }),
    );
    return;
  }

  if (req.method === "POST" && url.pathname === "/capi/registration") {
    await handleRegistration(req, res);
    return;
  }

  res.writeHead(404).end();
});

// ---------------------------------------------------------------- Calendly

async function calendlyGet(url) {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${CALENDLY_PAT}` },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`Calendly ${res.status} em ${url.split("?")[0]}`);
  return res.json();
}

/**
 * Procura reservas novas e manda appointment_scheduled.
 *
 * A API filtra por start_time, não por created_at — então varremos uma janela
 * ampla de agendamentos futuros e usamos as URIs já vistas como dedupe. Uma
 * reserva feita hoje para daqui a 3 meses continua sendo pega.
 */
async function pollCalendly() {
  if (!CALENDLY_PAT || !CALENDLY_USER_URI) return;

  try {
    const minStart = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
    const maxStart = new Date(Date.now() + 180 * 24 * 3600 * 1000).toISOString();
    const listUrl =
      "https://api.calendly.com/scheduled_events" +
      `?user=${encodeURIComponent(CALENDLY_USER_URI)}` +
      `&status=active&count=100&sort=start_time:asc` +
      `&min_start_time=${encodeURIComponent(minStart)}` +
      `&max_start_time=${encodeURIComponent(maxStart)}`;

    const { collection = [] } = await calendlyGet(listUrl);
    const seen = new Set(state.seenEvents);
    const novos = collection.filter((ev) => !seen.has(ev.uri));

    if (!novos.length) {
      log(`poll: ${collection.length} agendamento(s) na janela, nenhum novo`);
      return;
    }

    const events = [];
    const descartados = [];
    for (const ev of novos) {
      const uuid = ev.uri.split("/").pop();
      let invitee = null;
      try {
        const inv = await calendlyGet(
          `https://api.calendly.com/scheduled_events/${uuid}/invitees`,
        );
        invitee = (inv.collection || [])[0] || null;
      } catch (err) {
        log(`aviso: não consegui ler invitee de ${uuid}: ${err.message}`);
      }

      const tracking = invitee?.tracking || {};
      // O site carimba o oppref em salesforce_uuid (campo livre de passagem do
      // Calendly), deixando os UTMs de verdade intactos para o relatório.
      const oppref = tracking.salesforce_uuid || tracking.utm_content || "";

      const timestampMs = new Date(invitee?.created_at || ev.created_at).getTime();

      if (isTooOld(timestampMs)) {
        // A CAPI recusaria (e derrubaria o lote junto). Marca como vista para
        // não voltar em toda rodada.
        descartados.push(ev.uri);
        log(`reserva ${uuid} descartada: feita há mais de 6 dias, fora da janela da CAPI`);
        continue;
      }

      events.push(
        buildEvent({
          // URI do agendamento = id estável. Reenvio do mesmo id é idempotente.
          id: ev.uri,
          type: "appointment_scheduled",
          timestampMs,
          sourceUrl: ALLOWED_ORIGIN,
          oppref,
          email: invitee?.email,
          data: { type: "customer_action" },
        }),
      );

      log(
        `nova reserva ${uuid} (${invitee ? maskEmail(invitee.email) : "sem invitee"})` +
          ` — oppref: ${oppref ? "sim" : "NÃO (sem atribuição)"}`,
      );
    }

    const resultado = await sendEvents(events);

    if (resultado === "transitorio") {
      // Só o que falhou por indisponibilidade volta na próxima rodada.
      log("envio falhou por indisponibilidade — reservas seguem pendentes");
      if (descartados.length) {
        state.seenEvents.push(...descartados);
        saveState();
      }
      return;
    }

    // 'ok' ou 'permanente': em nenhum dos dois casos repetir ajuda.
    state.seenEvents.push(...events.map((e) => e.id), ...descartados);
    saveState();
  } catch (err) {
    log("erro no poll do Calendly:", err.message);
  }
}

/**
 * Na PRIMEIRA execução, os agendamentos que já existem no Calendly são passado —
 * mandá-los para a OpenAI inventaria um monte de conversão retroativa. Então a
 * primeira rodada só marca tudo como visto, sem enviar nada.
 */
async function primeState() {
  if (state.seenEvents.length || !CALENDLY_PAT || !CALENDLY_USER_URI) return;

  const minStart = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
  const maxStart = new Date(Date.now() + 180 * 24 * 3600 * 1000).toISOString();
  const { collection = [] } = await calendlyGet(
    "https://api.calendly.com/scheduled_events" +
      `?user=${encodeURIComponent(CALENDLY_USER_URI)}` +
      `&status=active&count=100&sort=start_time:asc` +
      `&min_start_time=${encodeURIComponent(minStart)}` +
      `&max_start_time=${encodeURIComponent(maxStart)}`,
  );
  state.seenEvents = collection.map((e) => e.uri);
  saveState();
  log(`primeira execução: ${state.seenEvents.length} agendamento(s) existente(s) marcados como já vistos (nada enviado)`);
}

// ---------------------------------------------------------------- boot

loadState();

server.listen(PORT, "127.0.0.1", async () => {
  log(`ouvindo em 127.0.0.1:${PORT}${DRY_RUN ? " [DRY-RUN: nada é registrado]" : ""}`);
  try {
    await primeState();
  } catch (err) {
    log("aviso: não consegui semear o estado inicial:", err.message);
  }
  if (CALENDLY_PAT && CALENDLY_USER_URI) {
    log(`poller do Calendly a cada ${POLL_MINUTES} min`);
    pollCalendly();
    setInterval(pollCalendly, POLL_MINUTES * 60 * 1000);
  } else {
    log("poller do Calendly desligado (sem CALENDLY_PAT/CALENDLY_USER_URI)");
  }
});

for (const sig of ["SIGTERM", "SIGINT"]) {
  process.on(sig, () => {
    log(`recebido ${sig}, encerrando`);
    server.close(() => process.exit(0));
  });
}
