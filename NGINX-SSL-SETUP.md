# 🔒 Configuração Nginx + SSL/HTTPS

Guia para configurar Nginx com proxy reverso e certificado SSL automático.

## 🚀 Uso Rápido

### 1. Configurar DNS PRIMEIRO

**IMPORTANTE:** Configure o DNS antes de executar o script!

No seu provedor de domínio, crie os registros:

```
Tipo A: seudominio.com.br → IP_DO_SERVIDOR
Tipo A: www.seudominio.com.br → IP_DO_SERVIDOR
```

⏰ Aguarde a propagação DNS (pode levar de minutos até 24h)

### 2. Executar script

No servidor:

```bash
cd /var/www/imobhub-lp
sudo bash setup-nginx-ssl.sh
```

### 3. Responder perguntas

O script irá perguntar:
- **Domínio:** `imobhub.com.br`
- **Incluir www?** `S`
- **Email SSL:** `seuemail@exemplo.com`
- **Tipo de aplicação:**
  - `1` = Site estático (HTML/React/Vue buildado)
  - `2` = Aplicação Node.js com servidor
  - `3` = Proxy para outra porta
- **Porta** (se tipo 2 ou 3): `3000`, `8080`, etc.
- **Diretório:** `/var/www/imobhub-lp`

### 4. Pronto!

Acesse: `https://seudominio.com.br` 🎉

---

## 📝 O que o script faz?

### Automaticamente:

✅ Instala Nginx e Certbot  
✅ Cria configuração otimizada do Nginx  
✅ Configura proxy reverso (se aplicável)  
✅ Habilita compressão Gzip  
✅ Define cache para assets estáticos  
✅ Adiciona headers de segurança  
✅ Obtém certificado SSL (Let's Encrypt)  
✅ Configura HTTPS e redirect automático  
✅ Ativa renovação automática do certificado  
✅ Configura firewall (UFW)  

---

## 🎯 Cenários de Uso

### Cenário 1: Site Estático (React/Vite buildado)

```bash
Tipo: 1
Diretório: /var/www/imobhub-lp
```

O Nginx servirá os arquivos de `/var/www/imobhub-lp/dist/`

**Estrutura esperada:**
```
/var/www/imobhub-lp/
└── dist/
    ├── index.html
    ├── assets/
    └── ...
```

### Cenário 2: Aplicação Node.js (backend)

```bash
Tipo: 2
Porta: 3000
Diretório: /var/www/imobhub-lp
```

O Nginx fará proxy reverso para `http://localhost:3000`

**Você precisa rodar sua aplicação:**
```bash
cd /var/www/imobhub-lp
node server.js
# ou
npm start
# ou use PM2 (recomendado)
```

### Cenário 3: Proxy para outra aplicação

```bash
Tipo: 3
Porta: 8080
```

Nginx faz proxy para qualquer aplicação rodando na porta especificada.

---

## 🔄 Configurações Aplicadas

### Site Estático (Tipo 1)

```nginx
✓ Compressão Gzip ativa
✓ Cache de 1 ano para assets (js, css, imagens)
✓ SPA routing (React Router funciona)
✓ Headers de segurança (XSS, Clickjacking, etc)
✓ SSL/HTTPS com redirect automático
✓ HTTP/2 ativado
```

### Proxy Reverso (Tipo 2/3)

```nginx
✓ Proxy para localhost:PORTA
✓ WebSocket support
✓ Headers corretos (X-Real-IP, X-Forwarded-For)
✓ Timeout de 60s
✓ Upload até 50MB
✓ Headers de segurança
✓ SSL/HTTPS com redirect automático
```

---

## 🛠️ Comandos Úteis

### Ver logs do Nginx

```bash
# Logs de acesso
tail -f /var/log/nginx/seudominio.com_access.log

# Logs de erro
tail -f /var/log/nginx/seudominio.com_error.log

# Logs em tempo real (ambos)
tail -f /var/log/nginx/seudominio.com_*.log
```

### Gerenciar Nginx

```bash
# Testar configuração
sudo nginx -t

# Recarregar (sem downtime)
sudo systemctl reload nginx

# Reiniciar
sudo systemctl restart nginx

# Status
sudo systemctl status nginx

# Ver configuração ativa
cat /etc/nginx/sites-enabled/seudominio.com
```

### Gerenciar SSL

```bash
# Ver certificados
sudo certbot certificates

# Renovar manualmente
sudo certbot renew

# Testar renovação
sudo certbot renew --dry-run

# Revogar certificado
sudo certbot revoke --cert-name seudominio.com
```

### Editar configuração

```bash
# Editar
sudo nano /etc/nginx/sites-available/seudominio.com

# Testar
sudo nginx -t

# Aplicar
sudo systemctl reload nginx
```

---

## 🆘 Troubleshooting

### Erro: DNS não resolvido

**Problema:** `DNS não resolvido para seudominio.com`

**Solução:**
1. Verifique os registros DNS no seu provedor
2. Aguarde propagação (até 24h)
3. Teste: `dig +short seudominio.com`
4. Configure depois: `sudo certbot --nginx -d seudominio.com`

### Erro: Certificado SSL falhou

**Problema:** Certbot não consegue obter certificado

**Causas comuns:**
- DNS ainda não propagado
- Portas 80/443 bloqueadas
- Firewall bloqueando

**Solução:**
```bash
# Verificar portas
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :443

# Verificar firewall
sudo ufw status

# Permitir tráfego
sudo ufw allow 'Nginx Full'

# Tentar novamente
sudo certbot --nginx -d seudominio.com -d www.seudominio.com
```

### Erro 502 Bad Gateway

**Problema:** Nginx retorna 502

**Para proxy reverso (Tipo 2/3):**
```bash
# Verificar se aplicação está rodando
curl http://localhost:3000

# Ver logs
tail -f /var/log/nginx/seudominio.com_error.log

# Iniciar aplicação se não estiver rodando
cd /var/www/imobhub-lp
npm start
```

### Erro 404 Not Found

**Para site estático:**
```bash
# Verificar se build existe
ls -la /var/www/imobhub-lp/dist/

# Se não, buildar
cd /var/www/imobhub-lp
npm run build

# Verificar permissões
sudo chown -R www-data:www-data /var/www/imobhub-lp/dist
sudo chmod -R 755 /var/www/imobhub-lp/dist
```

### React Router não funciona (404 nas rotas)

**Problema:** Rotas do React retornam 404

**Solução:** Já incluído no script! Verifica se tem:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### Certificado vai expirar

**Não se preocupe!** A renovação é automática.

Mas se quiser verificar:
```bash
# Ver data de expiração
sudo certbot certificates

# Renovar manualmente
sudo certbot renew
```

---

## 🔐 Segurança Adicional

### Configurar Fail2Ban

Protege contra ataques de força bruta:

```bash
sudo apt install fail2ban -y
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### Rate Limiting no Nginx

Adicione na configuração:

```nginx
# No início do arquivo
limit_req_zone $binary_remote_addr zone=limitzone:10m rate=10r/s;

# Dentro do location /
limit_req zone=limitzone burst=20 nodelay;
```

### Bloquear IPs

```bash
# Editar configuração
sudo nano /etc/nginx/sites-available/seudominio.com

# Adicionar no server {}
deny 123.456.789.0;
allow all;

# Recarregar
sudo systemctl reload nginx
```

---

## 📊 Monitoramento

### Status do sistema

```bash
# Uso de disco
df -h

# Uso de memória
free -h

# Processos
htop

# Conexões ativas
sudo netstat -tulpn
```

### Logs importantes

```bash
# Nginx access
tail -f /var/log/nginx/*_access.log

# Nginx error
tail -f /var/log/nginx/*_error.log

# Sistema
sudo journalctl -u nginx -f
```

---

## 🎯 Checklist Pós-Instalação

- [ ] DNS configurado e propagado
- [ ] Script executado com sucesso
- [ ] Site acessível via HTTPS
- [ ] Redirect HTTP → HTTPS funcionando
- [ ] Certificado SSL válido
- [ ] Renovação automática testada
- [ ] Logs sendo gerados
- [ ] Firewall configurado
- [ ] Aplicação funcionando (se proxy)
- [ ] Rotas SPA funcionando (se React)

---

## 📞 Suporte

**Comandos de diagnóstico:**

```bash
# Info completa
sudo nginx -V
sudo certbot --version
curl -I https://seudominio.com

# Testar SSL
openssl s_client -connect seudominio.com:443 -servername seudominio.com

# Ver configuração completa
sudo nginx -T
```

---

**Criado para:** ImobHub Landing Page  
**Última atualização:** 2026-02-02
