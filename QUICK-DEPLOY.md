# 🚀 Quick Deploy Guide

Guia rápido para deploy na VPS Ubuntu 24.04 LTS.

## 🎯 Deploy em 3 Passos

### 1️⃣ Enviar arquivos para o servidor

**No Windows (PowerShell):**
```powershell
.\upload.ps1
```

**No Linux/Mac:**
```bash
bash upload.sh
```

**Ou manualmente via rsync:**
```bash
rsync -avz --exclude 'node_modules' --exclude 'dist' --exclude '.git' \
  . usuario@ip-servidor:/var/www/imobhub-lp/
```

### 2️⃣ Conectar no servidor

```bash
ssh usuario@ip-servidor
```

### 3️⃣ Executar deploy

```bash
cd /var/www/imobhub-lp
sudo bash deploy.sh
```

Pronto! 🎉

---

## 📝 O que o script faz?

O `deploy.sh` automaticamente:

- ✅ Instala Node.js 20
- ✅ Instala Nginx
- ✅ Instala dependências (`npm install`)
- ✅ Builda a aplicação (`npm run build`)
- ✅ Configura o Nginx
- ✅ Define permissões corretas
- ✅ Reinicia os serviços

## 🌐 Acessar aplicação

Após o deploy:
- **HTTP:** `http://ip-do-servidor`
- **Com domínio:** Configure DNS e SSL (veja [DEPLOY.md](DEPLOY.md))

## 🔄 Fazer update

```bash
# 1. Enviar novos arquivos
.\upload.ps1   # Windows
# ou
bash upload.sh # Linux/Mac

# 2. No servidor
cd /var/www/imobhub-lp
sudo bash deploy.sh
```

## 📚 Documentação completa

Para instruções detalhadas, SSL, troubleshooting e mais:
- Leia: [DEPLOY.md](DEPLOY.md)

## ⚡ Comandos úteis no servidor

```bash
# Ver logs
tail -f /var/log/nginx/imobhub-lp_access.log

# Status do Nginx
sudo systemctl status nginx

# Rebuild manual
cd /var/www/imobhub-lp
npm run build
sudo systemctl reload nginx
```

## 🆘 Problemas?

1. **Nginx não inicia:** `sudo nginx -t`
2. **Build falhou:** Veja os logs do npm
3. **502/403 errors:** Veja [DEPLOY.md](DEPLOY.md) seção Troubleshooting
4. **Dúvidas:** Abra uma issue no repositório
