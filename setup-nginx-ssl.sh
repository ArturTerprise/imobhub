#!/bin/bash

################################################################################
# Script de Configuração Nginx + SSL/HTTPS
# Configura proxy reverso com certificado Let's Encrypt
# Para Ubuntu 24.04 LTS
################################################################################

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Configuração Nginx + SSL${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Funções
print_step() {
    echo -e "${GREEN}▶ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

# Verificar root
if [ "$EUID" -ne 0 ]; then 
    print_error "Execute como root ou com sudo"
    exit 1
fi

# Coletar informações
echo -e "${YELLOW}Configuração do domínio:${NC}"
echo ""

read -p "Digite seu domínio (ex: imobhub.com.br): " DOMAIN
read -p "Incluir www? (S/n): " INCLUDE_WWW
INCLUDE_WWW=${INCLUDE_WWW:-S}

read -p "Email para certificado SSL: " SSL_EMAIL

# Perguntar se é site estático ou aplicação com servidor
echo ""
echo -e "${YELLOW}Tipo de aplicação:${NC}"
echo "1) Site estático (arquivos HTML/JS/CSS)"
echo "2) Aplicação Node.js (com servidor backend)"
echo "3) Aplicação em outra porta (proxy reverso)"
echo ""
read -p "Escolha (1-3): " APP_TYPE

if [ "$APP_TYPE" = "2" ] || [ "$APP_TYPE" = "3" ]; then
    read -p "Porta da aplicação (ex: 3000, 8080): " APP_PORT
    APP_PORT=${APP_PORT:-3000}
fi

read -p "Diretório da aplicação [/var/www/imobhub-lp]: " APP_DIR
APP_DIR=${APP_DIR:-/var/www/imobhub-lp}

# Confirmar configuração
echo ""
echo -e "${GREEN}Configuração:${NC}"
echo "  Domínio: $DOMAIN"
if [[ $INCLUDE_WWW =~ ^[Ss]$ ]]; then
    echo "  Subdomínio: www.$DOMAIN"
fi
echo "  Email SSL: $SSL_EMAIL"
echo "  Tipo: $APP_TYPE"
if [ "$APP_TYPE" != "1" ]; then
    echo "  Porta: $APP_PORT"
fi
echo "  Diretório: $APP_DIR"
echo ""

read -p "Confirma? (s/N): " CONFIRM
if [[ ! $CONFIRM =~ ^[Ss]$ ]]; then
    echo "Configuração cancelada."
    exit 0
fi

echo ""

# 1. Instalar dependências
print_step "Instalando dependências..."
apt update
apt install -y nginx certbot python3-certbot-nginx

# 2. Verificar se o diretório existe
if [ "$APP_TYPE" = "1" ]; then
    if [ ! -d "$APP_DIR/dist" ] && [ ! -f "$APP_DIR/index.html" ]; then
        print_warning "Diretório $APP_DIR/dist ou $APP_DIR/index.html não encontrado"
        print_warning "Certifique-se de buildar a aplicação antes de continuar"
    fi
fi

# 3. Criar configuração Nginx baseada no tipo
CONFIG_FILE="/etc/nginx/sites-available/$DOMAIN"

print_step "Criando configuração Nginx..."

if [ "$APP_TYPE" = "1" ]; then
    # Site estático
    ROOT_DIR="$APP_DIR/dist"
    if [ ! -d "$ROOT_DIR" ]; then
        ROOT_DIR="$APP_DIR"
    fi

cat > $CONFIG_FILE << NGINX_STATIC
server {
    listen 80;
    listen [::]:80;
    
    server_name $DOMAIN$([ "$INCLUDE_WWW" = "S" ] || [ "$INCLUDE_WWW" = "s" ] && echo " www.$DOMAIN");
    
    root $ROOT_DIR;
    index index.html;
    
    # Logs
    access_log /var/log/nginx/${DOMAIN}_access.log;
    error_log /var/log/nginx/${DOMAIN}_error.log;
    
    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;
    
    # Cache para assets estáticos
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
    
    # SPA Routing - todas as rotas servem index.html
    location / {
        try_files \$uri \$uri/ /index.html;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    
    # Bloquear acesso a arquivos ocultos
    location ~ /\. {
        deny all;
    }
}
NGINX_STATIC

else
    # Proxy reverso para aplicação
cat > $CONFIG_FILE << NGINX_PROXY
upstream backend {
    server 127.0.0.1:$APP_PORT;
    keepalive 64;
}

server {
    listen 80;
    listen [::]:80;
    
    server_name $DOMAIN$([ "$INCLUDE_WWW" = "S" ] || [ "$INCLUDE_WWW" = "s" ] && echo " www.$DOMAIN");
    
    # Logs
    access_log /var/log/nginx/${DOMAIN}_access.log;
    error_log /var/log/nginx/${DOMAIN}_error.log;
    
    # Client upload size
    client_max_body_size 50M;
    
    # Proxy settings
    location / {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        
        # Headers
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        
        # Cache bypass
        proxy_cache_bypass \$http_upgrade;
    }
    
    # WebSocket support (se necessário)
    location /ws {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
}
NGINX_PROXY

fi

print_success "Configuração criada: $CONFIG_FILE"

# 4. Habilitar site
print_step "Habilitando site..."
ln -sf $CONFIG_FILE /etc/nginx/sites-enabled/

# Remover default se existir
rm -f /etc/nginx/sites-enabled/default

# 5. Testar configuração
print_step "Testando configuração Nginx..."
nginx -t

if [ $? -ne 0 ]; then
    print_error "Erro na configuração do Nginx"
    exit 1
fi

# 6. Reiniciar Nginx
print_step "Reiniciando Nginx..."
systemctl restart nginx
systemctl enable nginx

print_success "Nginx configurado!"

# 7. Verificar DNS
echo ""
print_step "Verificando DNS..."
DOMAIN_IP=$(dig +short $DOMAIN | tail -n1)
SERVER_IP=$(curl -s ifconfig.me)

if [ -z "$DOMAIN_IP" ]; then
    print_warning "DNS não resolvido para $DOMAIN"
    echo ""
    echo "Configure os registros DNS:"
    echo "  Tipo A: $DOMAIN → $SERVER_IP"
    if [[ $INCLUDE_WWW =~ ^[Ss]$ ]]; then
        echo "  Tipo A: www.$DOMAIN → $SERVER_IP"
    fi
    echo ""
    read -p "DNS já está configurado? Pressione Enter para continuar..."
else
    if [ "$DOMAIN_IP" = "$SERVER_IP" ]; then
        print_success "DNS configurado corretamente!"
    else
        print_warning "DNS aponta para $DOMAIN_IP, mas servidor é $SERVER_IP"
        echo "Aguarde propagação DNS ou verifique configuração"
        read -p "Deseja continuar mesmo assim? (s/N): " CONTINUE
        if [[ ! $CONTINUE =~ ^[Ss]$ ]]; then
            print_warning "Configure o DNS e execute: sudo certbot --nginx -d $DOMAIN"
            exit 0
        fi
    fi
fi

# 8. Configurar SSL com Let's Encrypt
echo ""
print_step "Configurando SSL com Let's Encrypt..."

CERTBOT_DOMAINS="-d $DOMAIN"
if [[ $INCLUDE_WWW =~ ^[Ss]$ ]]; then
    CERTBOT_DOMAINS="$CERTBOT_DOMAINS -d www.$DOMAIN"
fi

certbot --nginx $CERTBOT_DOMAINS \
    --non-interactive \
    --agree-tos \
    --email "$SSL_EMAIL" \
    --redirect

if [ $? -eq 0 ]; then
    print_success "SSL configurado com sucesso!"
    
    # 9. Configurar renovação automática
    print_step "Configurando renovação automática..."
    
    # Testar renovação
    certbot renew --dry-run
    
    if [ $? -eq 0 ]; then
        print_success "Renovação automática configurada!"
    else
        print_warning "Erro ao testar renovação"
    fi
else
    print_error "Erro ao configurar SSL"
    echo ""
    echo "Possíveis causas:"
    echo "  1. DNS não propagado ainda (aguarde até 24h)"
    echo "  2. Porta 80/443 não acessível"
    echo "  3. Firewall bloqueando"
    echo ""
    echo "Tente manualmente:"
    echo "  sudo certbot --nginx $CERTBOT_DOMAINS"
    exit 1
fi

# 10. Configurar firewall
if command -v ufw &> /dev/null; then
    print_step "Configurando firewall..."
    ufw allow 'Nginx Full'
    ufw allow ssh
    print_success "Firewall configurado!"
fi

# 11. Otimizações Nginx adicionais
print_step "Aplicando otimizações..."

# Aumentar worker connections se necessário
if ! grep -q "worker_connections 4096" /etc/nginx/nginx.conf; then
    sed -i 's/worker_connections [0-9]*;/worker_connections 4096;/' /etc/nginx/nginx.conf
fi

systemctl reload nginx

# 12. Informações finais
echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}✓ Configuração concluída!${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo "Informações:"
echo "  • Site: https://$DOMAIN"
if [[ $INCLUDE_WWW =~ ^[Ss]$ ]]; then
    echo "  • Alternativo: https://www.$DOMAIN"
fi
echo "  • Certificado SSL: Ativo (Let's Encrypt)"
echo "  • Renovação: Automática"
echo "  • Nginx config: $CONFIG_FILE"
echo "  • Logs access: /var/log/nginx/${DOMAIN}_access.log"
echo "  • Logs error: /var/log/nginx/${DOMAIN}_error.log"
echo ""

if [ "$APP_TYPE" != "1" ]; then
    echo "IMPORTANTE:"
    echo "  Certifique-se que sua aplicação está rodando na porta $APP_PORT"
    echo ""
    echo "  Verificar: curl http://localhost:$APP_PORT"
    echo ""
fi

echo "Comandos úteis:"
echo "  • Ver logs: tail -f /var/log/nginx/${DOMAIN}_error.log"
echo "  • Testar Nginx: sudo nginx -t"
echo "  • Reload Nginx: sudo systemctl reload nginx"
echo "  • Renovar SSL: sudo certbot renew"
echo "  • Status SSL: sudo certbot certificates"
echo ""

print_success "Acesse: https://$DOMAIN"
echo ""
