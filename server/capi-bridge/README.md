# Ponte de conversões server-side (OpenAI Ads)

Serviço mínimo que manda as conversões da landing para a **Conversions API** do
OpenAI Ads, em vez de depender só do pixel no navegador.

## Por que existe

1. **O pixel não estava entregando.** Em 07/08/2026 a ingestão dele
   (`POST bzr.openai.com/v1/sdk/events`) devolvia **503** em toda carga, enquanto
   a API server-side (`POST bzr.openai.com/v1/events`) respondia **200**.
2. **Adblock.** O endpoint aqui é first-party (`imobhub.app/capi/...`).
3. **Agendamento só é conversão quando vira reserva.** Disparar no clique do
   Calendly superconta quem clica e desiste.

## O que ele envia

| Evento | Origem | Quando |
|---|---|---|
| `registration_completed` | `POST /capi/registration`, chamado pelos forms do site | envio do form de leads e do form de /contato — `amount: 0`, `currency: BRL` |
| `appointment_scheduled` | poller do Calendly | reserva confirmada de verdade |

## Calendly: por que polling e não webhook

A conta é do **plano free**, e webhook exige Standard. A API é explícita:

```
POST /webhook_subscriptions -> 403
{"title": "Permission Denied", "message": "Please upgrade your Calendly account to Standard"}
```

`GET /scheduled_events` funciona no free, então o poller varre a janela de
agendamentos ativos a cada `CALENDLY_POLL_MINUTES` e deduplica pela URI do
agendamento. **Se um dia migrarem para Standard, trocar por webhook é melhor**
(tempo real, sem varredura).

Na primeira execução o poller apenas marca os agendamentos existentes como
vistos, **sem enviar nada** — senão a estreia inventaria um monte de conversão
retroativa.

## Atribuição — a parte fácil de errar

`oppref` é o identificador do clique no anúncio. **É campo de nível do evento**,
verificado contra a própria API:

```
events[0].oppref     -> aceito
events[0].obref      -> 400 Unknown field
events[0].click_id   -> 400 Unknown field
```

Cuidado: o objeto `user` é **permissivo** — nome errado ali não dá erro, a
conversão só chega sem atribuição. (Há guia de terceiro na internet mandando
colocar como `obref` dentro de `user`; está errado.)

Como a reserva acontece fora do nosso site, o `oppref` precisa viajar junto: o
site carimba o cookie `__oppref` no link do Calendly como `salesforce_uuid`
(campo livre de passagem), e o poller lê de volta em `invitee.tracking`.

## Limites da API que o código respeita

- **`timestamp_ms` só dentro dos últimos 7 dias** (`422 event_timestamp_too_old`).
  Reserva mais velha é descartada e marcada como vista — sem isso ela voltaria
  em toda rodada, para sempre.
- **O lote inteiro cai se um evento falhar**, por isso a filtragem vem antes do envio.
- 5xx/429 têm retentativa com backoff; 4xx não (repetir só esconderia o bug).

## Operação

```bash
# estado do serviço
systemctl status openai-capi-bridge
curl -s localhost:3390/healthz

# log
journalctl -u openai-capi-bridge -f

# modo ensaio: valida na OpenAI sem registrar conversão
# (DRY_RUN=true em /etc/openai-capi-bridge.env, depois restart)
```

Segredos ficam em `/etc/openai-capi-bridge.env` (600, fora do git).
Modelo em `.env.example`.

Deploy: `~/imobhub-ops/deploy-capi-bridge.sh` (roda na VPS, via git).
