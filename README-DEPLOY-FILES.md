# 📚 Guia de Arquivos de Deploy

Este documento explica todos os arquivos de deploy criados e como usá-los.

## 📁 Arquivos Criados

### 🔧 Scripts de Automação

#### 1. `setup-nginx-ssl.sh` ⭐ **PRINCIPAL**
**O que faz:**
- Instala Nginx e Certbot automaticamente
- Configura proxy reverso ou site estático
- Obtém certificado SSL (Let's Encrypt)
- Configura HTTPS com redirect automático
- Ativa renovação automática de SSL

**Quando usar:**
- Primeira configuração do servidor
- Adicionar novo domínio
- Reconfigurar Nginx

**Como usar:**
```bash
sudo bash setup-nginx-ssl.sh
```

---

#### 2. `deploy.sh`
**O que faz:**
- Instala Node.js e dependências
- Builda a aplicação React/Vite
- Configura Nginx básico (sem SSL)
- Define permissões corretas

**Quando usar:**
- Deploy inicial da aplicação
- Redeploy após mudanças no código
- Quando não precisa de domínio/SSL

**Como usar:**
```bash
sudo bash deploy.sh
```

---

#### 3. `setup-pm2.sh`
**O que faz:**
- Instala PM2 (Process Manager)
- Configura aplicação Node.js para rodar 24/7
- Cria configuração de cluster mode
- Ativa restart automático no boot

**Quando usar:**
- Se você tem servidor Node.js (Express, NestJS, etc)
- Quando precisa de auto-restart
- Para rodar múltiplas instâncias

**Como usar:**
```bash
sudo bash setup-pm2.sh
```

---

#### 4. `upload.sh` (Linux/Mac)
**O que faz:**
- Envia arquivos do computador para servidor
- Usa rsync para sincronização eficiente
- Exclui automaticamente node_modules, dist, etc.

**Quando usar:**
- Enviar código para o servidor
- Fazer update da aplicação

**Como usar:**
```bash
bash upload.sh
```

---

#### 5. `upload.ps1` (Windows)
**O que faz:**
- Mesma função do `upload.sh`, mas para Windows
- Compacta arquivos em zip
- Envia via SCP
- Descompacta no servidor

**Quando usar:**
- Você está no Windows
- Enviar código para o servidor

**Como usar:**
```powershell
.\upload.ps1
```

---

### 📖 Documentação

#### 6. `NGINX-SSL-SETUP.md` ⭐ **MAIS COMPLETO**
**Conteúdo:**
- Guia completo de setup Nginx + SSL
- Troubleshooting detalhado
- Comandos úteis
- Segurança e monitoramento
- 40+ páginas de documentação

**Quando ler:**
- Problemas com Nginx ou SSL
- Precisa entender como funciona
- Quer customizar configuração

---

#### 7. `QUICK-NGINX-REFERENCE.md` ⭐ **CONSULTA RÁPIDA**
**Conteúdo:**
- Referência rápida de comandos
- Tabelas e checklists
- Troubleshooting em tópicos
- 2-3 páginas, fácil de imprimir

**Quando ler:**
- Precisa de comando específico rapidamente
- Resolver problema comum
- Lembrar sintaxe

---

#### 8. `nginx-config-examples.md`
**Conteúdo:**
- 10+ exemplos prontos de configuração Nginx
- Site estático, proxy reverso, múltiplos domínios
- Rate limiting, cache, segurança
- Copy-paste direto

**Quando usar:**
- Precisa de configuração customizada
- Quer entender opções avançadas
- Casos de uso específicos

---

#### 9. `DEPLOY.md`
**Conteúdo:**
- Guia de deploy da aplicação
- Métodos de upload
- Configuração de ambiente
- Não foca em Nginx/SSL

**Quando ler:**
- Primeiro deploy da aplicação
- Entender estrutura do projeto

---

#### 10. `QUICK-DEPLOY.md`
**Conteúdo:**
- Resumo em 3 passos do deploy
- Comandos essenciais
- Links para docs completas

**Quando ler:**
- Fazer redeploy rápido
- Lembrar sequência de comandos

---

#### 11. `README-DEPLOY-FILES.md` (este arquivo)
**Conteúdo:**
- Explica todos os arquivos
- Fluxos de trabalho
- Quando usar cada um

**Quando ler:**
- Não sabe qual arquivo usar
- Primeira vez usando os scripts

---

## 🎯 Fluxos de Trabalho

### Cenário 1: Primeiro Deploy Completo (com domínio)

```bash
# 1. Configure DNS (no provedor de domínio)
Tipo A: seudominio.com → IP_SERVIDOR

# 2. Envie arquivos
bash upload.sh  # ou .\upload.ps1 no Windows

# 3. SSH no servidor
ssh usuario@ip-servidor

# 4. Configure Nginx + SSL
cd /var/www/imobhub-lp
sudo bash setup-nginx-ssl.sh
# Escolha: Tipo 1 (site estático)

# 5. Acesse
https://seudominio.com
```

**Arquivos usados:**
- `upload.sh` ou `upload.ps1`
- `setup-nginx-ssl.sh`
- `NGINX-SSL-SETUP.md` (se tiver problemas)

---

### Cenário 2: Deploy Rápido (sem domínio)

```bash
# 1. Envie arquivos
bash upload.sh

# 2. SSH no servidor
ssh usuario@ip-servidor

# 3. Deploy simples
cd /var/www/imobhub-lp
sudo bash deploy.sh

# 4. Acesse via IP
http://ip-do-servidor
```

**Arquivos usados:**
- `upload.sh` ou `upload.ps1`
- `deploy.sh`

---

### Cenário 3: Aplicação Node.js com Backend

```bash
# 1. Envie arquivos
bash upload.sh

# 2. SSH no servidor
ssh usuario@ip-servidor

# 3. Setup PM2
cd /var/www/imobhub-lp
sudo bash setup-pm2.sh
# Informe: server.js, porta 3000

# 4. Configure Nginx + SSL
sudo bash setup-nginx-ssl.sh
# Escolha: Tipo 2 (Node.js), porta 3000

# 5. Acesse
https://seudominio.com
```

**Arquivos usados:**
- `upload.sh` ou `upload.ps1`
- `setup-pm2.sh`
- `setup-nginx-ssl.sh`

---

### Cenário 4: Redeploy (atualização)

**Site estático:**
```bash
# 1. Enviar novos arquivos
bash upload.sh

# 2. No servidor
ssh usuario@servidor
cd /var/www/imobhub-lp
npm run build
sudo systemctl reload nginx
```

**Aplicação Node.js:**
```bash
# 1. Enviar novos arquivos
bash upload.sh

# 2. No servidor
ssh usuario@servidor
cd /var/www/imobhub-lp
npm install
pm2 reload imobhub-lp
```

**Arquivos usados:**
- `upload.sh` ou `upload.ps1`
- `QUICK-DEPLOY.md` (comandos de redeploy)

---

### Cenário 5: Resolver Problema

```bash
# 1. Identifique o problema
- Site não carrega? → erro 502, 404, SSL?
- SSL não funciona? → DNS, Certbot?
- Rotas 404? → Configuração SPA?

# 2. Consulte documentação
- Erro rápido: QUICK-NGINX-REFERENCE.md
- Detalhado: NGINX-SSL-SETUP.md seção Troubleshooting

# 3. Execute comandos
# Exemplo para 502:
tail -f /var/log/nginx/seudominio_error.log
curl http://localhost:3000
pm2 logs
```

**Arquivos usados:**
- `QUICK-NGINX-REFERENCE.md` (consulta rápida)
- `NGINX-SSL-SETUP.md` (troubleshooting detalhado)

---

## 🗺️ Mapa Mental

```
Primeiro Deploy?
├─ Com domínio → setup-nginx-ssl.sh ⭐
├─ Sem domínio → deploy.sh
└─ Com backend Node → setup-pm2.sh + setup-nginx-ssl.sh

Redeploy?
├─ Site estático → upload.sh + build + reload nginx
└─ Node.js → upload.sh + pm2 reload

Problema?
├─ Comando rápido → QUICK-NGINX-REFERENCE.md ⭐
├─ Troubleshooting → NGINX-SSL-SETUP.md (seção 🆘)
└─ Config customizada → nginx-config-examples.md

Aprender?
├─ Nginx + SSL → NGINX-SSL-SETUP.md (completo)
├─ Deploy → DEPLOY.md
└─ Visão geral → README-DEPLOY-FILES.md (este arquivo)
```

---

## 📊 Tabela de Decisão

| Situação | Script | Documentação |
|----------|--------|--------------|
| 🆕 Primeiro deploy com domínio | `setup-nginx-ssl.sh` | `NGINX-SSL-SETUP.md` |
| 🚀 Deploy rápido sem domínio | `deploy.sh` | `QUICK-DEPLOY.md` |
| 🔄 Redeploy/Update | `upload.sh` | `QUICK-DEPLOY.md` |
| 🖥️ Backend Node.js | `setup-pm2.sh` | `NGINX-SSL-SETUP.md` |
| 🐛 Resolver problema | - | `QUICK-NGINX-REFERENCE.md` |
| 🔧 Config customizada | - | `nginx-config-examples.md` |
| 📚 Entender tudo | - | `NGINX-SSL-SETUP.md` |

---

## 💡 Dicas

### ⭐ Os 3 Mais Importantes

1. **`setup-nginx-ssl.sh`** - Use para configurar Nginx + SSL
2. **`NGINX-SSL-SETUP.md`** - Leia quando tiver problemas
3. **`QUICK-NGINX-REFERENCE.md`** - Mantenha aberto para consulta

### 📝 Ordem de Leitura Recomendada

1. Este arquivo (`README-DEPLOY-FILES.md`) - visão geral
2. `QUICK-DEPLOY.md` - entender o básico
3. `NGINX-SSL-SETUP.md` - detalhes quando necessário

### 🎯 Para Iniciantes

Comece simples:
1. Use `deploy.sh` para testar (sem SSL)
2. Quando estiver ok, use `setup-nginx-ssl.sh`
3. Mantenha `QUICK-NGINX-REFERENCE.md` aberto

### 🚀 Para Experientes

- Use `setup-nginx-ssl.sh` direto
- Customize com `nginx-config-examples.md`
- `QUICK-NGINX-REFERENCE.md` para consultas

---

## 🆘 Precisa de Ajuda?

1. **Erro específico?** → `QUICK-NGINX-REFERENCE.md` seção Troubleshooting
2. **Não sabe qual script usar?** → Veja "Fluxos de Trabalho" acima
3. **Precisa entender melhor?** → `NGINX-SSL-SETUP.md` completo
4. **Quer exemplo de config?** → `nginx-config-examples.md`

---

## 📞 Comandos de Emergência

```bash
# Ver logs de erro
sudo tail -50 /var/log/nginx/*_error.log

# Testar Nginx
sudo nginx -t

# Reiniciar tudo
sudo systemctl restart nginx

# Status dos serviços
sudo systemctl status nginx
sudo systemctl status certbot.timer
pm2 status

# Ver aplicação rodando
curl http://localhost:3000  # ajuste a porta
```

---

**Resumo:** Use `setup-nginx-ssl.sh` para Nginx+SSL, consulte `QUICK-NGINX-REFERENCE.md` para comandos, e leia `NGINX-SSL-SETUP.md` quando precisar de detalhes. 🎉

---

**Última atualização:** 2026-02-02
