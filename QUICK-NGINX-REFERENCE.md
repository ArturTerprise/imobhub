# ⚡ Referência Rápida - Nginx + SSL

## 🚀 Setup Inicial (Ordem correta)

### 1️⃣ Configurar DNS
```
Tipo A: seudominio.com.br → IP_SERVIDOR
Tipo A: www.seudominio.com.br → IP_SERVIDOR
```
⏰ Aguarde propagação (teste: `dig +short seudominio.com.br`)

### 2️⃣ Executar script
```bash
cd /var/www/imobhub-lp
sudo bash setup-nginx-ssl.sh
```

### 3️⃣ Acessar
```
https://seudominio.com.br
```

---

## 📝 Tipos de Configuração

| Tipo | Descrição | Exemplo de Uso |
|------|-----------|----------------|
| **1 - Site Estático** | Serve arquivos HTML/JS/CSS | React/Vite buildado |
| **2 - Node.js** | Proxy para app Node | Express, NestJS, etc |
| **3 - Outra Porta** | Proxy genérico | Qualquer servidor |

---

## 🛠️ Comandos Essenciais

### Nginx

```bash
# Testar configuração
sudo nginx -t

# Recarregar (sem downtime)
sudo systemctl reload nginx

# Reiniciar
sudo systemctl restart nginx

# Status
sudo systemctl status nginx

# Ver logs de erro
tail -f /var/log/nginx/seudominio_error.log
```

### SSL/Certbot

```bash
# Ver certificados
sudo certbot certificates

# Renovar
sudo certbot renew

# Testar renovação
sudo certbot renew --dry-run

# Obter certificado manualmente
sudo certbot --nginx -d seudominio.com -d www.seudominio.com
```

### Editar Configuração

```bash
# Abrir editor
sudo nano /etc/nginx/sites-available/seudominio.com

# Testar
sudo nginx -t

# Aplicar
sudo systemctl reload nginx
```

---

## 🔧 Troubleshooting Rápido

### Site não carrega (502)
```bash
# Se for proxy, verificar se app está rodando
curl http://localhost:3000

# Ver logs
tail -f /var/log/nginx/seudominio_error.log

# Iniciar app se necessário
cd /var/www/imobhub-lp && npm start
# ou
pm2 start ecosystem.config.js
```

### Rotas do React retornam 404
```bash
# Verificar se tem try_files
grep -A 2 "location /" /etc/nginx/sites-available/seudominio.com
# Deve ter: try_files $uri $uri/ /index.html;
```

### SSL não funciona
```bash
# Verificar DNS
dig +short seudominio.com

# Verificar portas
sudo netstat -tulpn | grep :443

# Tentar novamente
sudo certbot --nginx -d seudominio.com
```

### Arquivos não encontrados (site estático)
```bash
# Verificar build
ls -la /var/www/imobhub-lp/dist/

# Buildar se necessário
cd /var/www/imobhub-lp && npm run build

# Corrigir permissões
sudo chown -R www-data:www-data /var/www/imobhub-lp/dist
sudo chmod -R 755 /var/www/imobhub-lp/dist
```

---

## 📊 Monitoramento

```bash
# Logs em tempo real
tail -f /var/log/nginx/seudominio_access.log
tail -f /var/log/nginx/seudominio_error.log

# Status do sistema
sudo systemctl status nginx
sudo systemctl status certbot.timer

# Verificar certificado
openssl s_client -connect seudominio.com:443 < /dev/null 2>/dev/null | openssl x509 -noout -dates
```

---

## 🎯 Arquivos Importantes

```
/etc/nginx/sites-available/seudominio.com  # Configuração do site
/etc/nginx/sites-enabled/seudominio.com    # Link simbólico (ativo)
/etc/nginx/nginx.conf                      # Config principal
/var/log/nginx/seudominio_access.log       # Logs de acesso
/var/log/nginx/seudominio_error.log        # Logs de erro
/etc/letsencrypt/live/seudominio.com/      # Certificados SSL
```

---

## 🔄 Redeploy

### Site Estático
```bash
cd /var/www/imobhub-lp
git pull  # ou upload novos arquivos
npm install
npm run build
sudo systemctl reload nginx
```

### Aplicação Node.js (com PM2)
```bash
cd /var/www/imobhub-lp
git pull  # ou upload novos arquivos
npm install
pm2 reload imobhub-lp
```

---

## 🔐 Segurança

```bash
# Firewall
sudo ufw allow 'Nginx Full'
sudo ufw allow ssh
sudo ufw enable

# Fail2Ban
sudo apt install fail2ban -y
sudo systemctl enable fail2ban

# Ver tentativas bloqueadas
sudo fail2ban-client status nginx-http-auth
```

---

## 💡 Dicas

### Aumentar limite de upload
```nginx
# Em /etc/nginx/sites-available/seudominio.com
client_max_body_size 100M;
```

### Cache mais agressivo
```nginx
location ~* \.(jpg|jpeg|png|gif|ico)$ {
    expires 30d;
    add_header Cache-Control "public, no-transform";
}
```

### Headers de segurança extras
```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header Content-Security-Policy "default-src 'self'" always;
```

### Redirecionar www → sem www
```nginx
server {
    listen 80;
    server_name www.seudominio.com;
    return 301 $scheme://seudominio.com$request_uri;
}
```

---

## 📞 Ajuda Rápida

### Teste completo
```bash
# DNS
dig +short seudominio.com

# HTTP
curl -I http://seudominio.com

# HTTPS
curl -I https://seudominio.com

# Config Nginx
sudo nginx -T

# Portas abertas
sudo netstat -tulpn | grep nginx
```

### Logs importantes
```bash
# Últimas 50 linhas de erro
sudo tail -50 /var/log/nginx/seudominio_error.log

# Logs do sistema
sudo journalctl -u nginx -n 50

# Logs do Certbot
sudo journalctl -u certbot -n 50
```

---

## 📚 Documentação Completa

Para instruções detalhadas, veja:
- **[NGINX-SSL-SETUP.md](NGINX-SSL-SETUP.md)** - Guia completo
- **[DEPLOY.md](DEPLOY.md)** - Deploy da aplicação

---

**Última atualização:** 2026-02-02
