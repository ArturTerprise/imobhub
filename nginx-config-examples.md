# 📋 Exemplos de Configuração Nginx

Exemplos prontos para diferentes cenários.

## 🎨 Site Estático (React/Vue/Vite)

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name imobhub.com.br www.imobhub.com.br;
    
    # Redirecionar HTTP para HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    
    server_name imobhub.com.br www.imobhub.com.br;
    
    # SSL (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/imobhub.com.br/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/imobhub.com.br/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    
    # Diretório do build
    root /var/www/imobhub-lp/dist;
    index index.html;
    
    # Logs
    access_log /var/log/nginx/imobhub_access.log;
    error_log /var/log/nginx/imobhub_error.log;
    
    # Compressão Gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript 
               application/json application/javascript application/xml+rss 
               image/svg+xml;
    
    # Cache para assets estáticos
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
    
    # SPA Routing (React Router, Vue Router)
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    # Bloquear acesso a arquivos ocultos
    location ~ /\. {
        deny all;
    }
}
```

---

## 🚀 Proxy Reverso (Node.js/Express)

```nginx
upstream backend_imobhub {
    server 127.0.0.1:3000;
    keepalive 64;
}

server {
    listen 80;
    listen [::]:80;
    server_name imobhub.com.br www.imobhub.com.br;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    
    server_name imobhub.com.br www.imobhub.com.br;
    
    # SSL
    ssl_certificate /etc/letsencrypt/live/imobhub.com.br/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/imobhub.com.br/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    
    # Logs
    access_log /var/log/nginx/imobhub_access.log;
    error_log /var/log/nginx/imobhub_error.log;
    
    # Tamanho máximo de upload
    client_max_body_size 50M;
    
    # Timeouts
    proxy_connect_timeout 60s;
    proxy_send_timeout 60s;
    proxy_read_timeout 60s;
    
    # Proxy principal
    location / {
        proxy_pass http://backend_imobhub;
        proxy_http_version 1.1;
        
        # Headers
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        proxy_cache_bypass $http_upgrade;
    }
    
    # WebSocket support
    location /socket.io/ {
        proxy_pass http://backend_imobhub;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

---

## 🔀 Frontend + Backend Separados

```nginx
upstream frontend_imobhub {
    server 127.0.0.1:3000;
}

upstream backend_api_imobhub {
    server 127.0.0.1:8080;
}

server {
    listen 80;
    server_name imobhub.com.br www.imobhub.com.br;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name imobhub.com.br www.imobhub.com.br;
    
    ssl_certificate /etc/letsencrypt/live/imobhub.com.br/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/imobhub.com.br/privkey.pem;
    
    # API Backend
    location /api/ {
        proxy_pass http://backend_api_imobhub;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Frontend
    location / {
        proxy_pass http://frontend_imobhub;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🌐 Múltiplos Domínios/Subdomínios

```nginx
# Site principal
server {
    listen 443 ssl http2;
    server_name imobhub.com.br www.imobhub.com.br;
    
    ssl_certificate /etc/letsencrypt/live/imobhub.com.br/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/imobhub.com.br/privkey.pem;
    
    root /var/www/imobhub-lp/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}

# API/Painel Admin
server {
    listen 443 ssl http2;
    server_name api.imobhub.com.br;
    
    ssl_certificate /etc/letsencrypt/live/api.imobhub.com.br/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.imobhub.com.br/privkey.pem;
    
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# Blog/Docs
server {
    listen 443 ssl http2;
    server_name blog.imobhub.com.br;
    
    ssl_certificate /etc/letsencrypt/live/blog.imobhub.com.br/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/blog.imobhub.com.br/privkey.pem;
    
    root /var/www/blog;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 🛡️ Configuração com Rate Limiting

```nginx
# Definir zonas de rate limiting (fora do server {})
limit_req_zone $binary_remote_addr zone=general:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=api:10m rate=5r/s;

server {
    listen 443 ssl http2;
    server_name imobhub.com.br;
    
    # ... SSL config ...
    
    # Rate limit geral
    location / {
        limit_req zone=general burst=20 nodelay;
        try_files $uri $uri/ /index.html;
    }
    
    # Rate limit mais restritivo para API
    location /api/ {
        limit_req zone=api burst=10 nodelay;
        proxy_pass http://localhost:8080;
    }
}
```

---

## 🔐 Autenticação Básica

```nginx
server {
    listen 443 ssl http2;
    server_name admin.imobhub.com.br;
    
    # ... SSL config ...
    
    # Proteger área admin
    location /admin {
        auth_basic "Área Restrita";
        auth_basic_user_file /etc/nginx/.htpasswd;
        
        proxy_pass http://localhost:3000;
    }
}
```

**Criar senha:**
```bash
sudo apt install apache2-utils
sudo htpasswd -c /etc/nginx/.htpasswd admin
```

---

## 📱 Redirecionamento por User-Agent

```nginx
server {
    listen 443 ssl http2;
    server_name imobhub.com.br;
    
    # ... SSL config ...
    
    # Detectar mobile
    set $mobile_rewrite do_not_perform;
    
    if ($http_user_agent ~* "(android|iphone|ipad|mobile)") {
        set $mobile_rewrite perform;
    }
    
    if ($mobile_rewrite = perform) {
        return 301 https://m.imobhub.com.br$request_uri;
    }
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 🗜️ Compressão Avançada

```nginx
http {
    # Gzip
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_min_length 1024;
    gzip_buffers 16 8k;
    gzip_http_version 1.1;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/x-javascript
        application/xml
        application/xml+rss
        application/xhtml+xml
        application/atom+xml
        image/svg+xml
        image/x-icon
        font/opentype
        font/truetype
        font/eot
        font/otf;
    
    # Brotli (se disponível)
    # brotli on;
    # brotli_comp_level 6;
    # brotli_types text/plain text/css application/json application/javascript text/xml application/xml+rss text/javascript;
}
```

---

## 📊 Logs Customizados

```nginx
http {
    # Formato de log customizado
    log_format main_ext '$remote_addr - $remote_user [$time_local] "$request" '
                        '$status $body_bytes_sent "$http_referer" '
                        '"$http_user_agent" "$http_x_forwarded_for" '
                        'rt=$request_time uct="$upstream_connect_time" '
                        'uht="$upstream_header_time" urt="$upstream_response_time"';
    
    server {
        # ...
        access_log /var/log/nginx/imobhub_access.log main_ext;
    }
}
```

---

## 🚫 Bloquear Bots/IPs

```nginx
# Criar arquivo de IPs bloqueados
# /etc/nginx/blocked-ips.conf
# deny 123.456.789.0;
# deny 987.654.321.0;

# Criar arquivo de User-Agents bloqueados
# /etc/nginx/blocked-agents.conf
map $http_user_agent $blocked_agent {
    default 0;
    ~*malicious 1;
    ~*bot 1;
    ~*crawl 1;
}

server {
    # ...
    
    # Incluir IPs bloqueados
    include /etc/nginx/blocked-ips.conf;
    
    # Bloquear por User-Agent
    if ($blocked_agent) {
        return 403;
    }
}
```

---

## 💾 Cache de Proxy

```nginx
# Fora do server {} - em http {}
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=api_cache:10m max_size=1g inactive=60m;

server {
    # ...
    
    location /api/ {
        proxy_cache api_cache;
        proxy_cache_valid 200 302 10m;
        proxy_cache_valid 404 1m;
        proxy_cache_bypass $http_cache_control;
        
        add_header X-Cache-Status $upstream_cache_status;
        
        proxy_pass http://localhost:8080;
    }
}
```

---

## 📝 Como Usar

### 1. Criar arquivo de configuração
```bash
sudo nano /etc/nginx/sites-available/imobhub.com.br
```

### 2. Copiar exemplo apropriado

### 3. Editar variáveis
- `imobhub.com.br` → seu domínio
- `/var/www/imobhub-lp` → seu diretório
- `3000`, `8080` → suas portas

### 4. Testar e ativar
```bash
sudo nginx -t
sudo ln -s /etc/nginx/sites-available/imobhub.com.br /etc/nginx/sites-enabled/
sudo systemctl reload nginx
```

---

**Dica:** Use o script `setup-nginx-ssl.sh` que gera essas configurações automaticamente! ✨
