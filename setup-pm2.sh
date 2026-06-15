#!/bin/bash

################################################################################
# Setup PM2 - Process Manager para Node.js
# Útil se você precisar rodar um servidor Node.js em produção
################################################################################

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Setup PM2 Process Manager${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

print_step() {
    echo -e "${GREEN}▶ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    print_error "Node.js não está instalado"
    exit 1
fi

print_success "Node.js: $(node -v)"

# Instalar PM2 globalmente
print_step "Instalando PM2..."
npm install -g pm2

if [ $? -eq 0 ]; then
    print_success "PM2 instalado: $(pm2 -v)"
else
    print_error "Erro ao instalar PM2"
    exit 1
fi

# Coletar informações
echo ""
echo -e "${YELLOW}Configuração da aplicação:${NC}"
echo ""

read -p "Diretório da aplicação [/var/www/imobhub-lp]: " APP_DIR
APP_DIR=${APP_DIR:-/var/www/imobhub-lp}

read -p "Arquivo principal (ex: server.js, index.js): " MAIN_FILE
read -p "Nome da aplicação [imobhub-lp]: " APP_NAME
APP_NAME=${APP_NAME:-imobhub-lp}

read -p "Porta da aplicação [3000]: " APP_PORT
APP_PORT=${APP_PORT:-3000}

# Verificar se arquivo existe
if [ ! -f "$APP_DIR/$MAIN_FILE" ]; then
    print_error "Arquivo $APP_DIR/$MAIN_FILE não encontrado"
    exit 1
fi

# Criar arquivo ecosystem PM2
print_step "Criando configuração PM2..."

cat > $APP_DIR/ecosystem.config.js << PM2_CONFIG
module.exports = {
  apps: [{
    name: '$APP_NAME',
    script: '$MAIN_FILE',
    cwd: '$APP_DIR',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: $APP_PORT
    },
    error_file: '/var/log/pm2/$APP_NAME-error.log',
    out_file: '/var/log/pm2/$APP_NAME-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    max_restarts: 10,
    min_uptime: '10s'
  }]
};
PM2_CONFIG

print_success "Configuração criada: $APP_DIR/ecosystem.config.js"

# Criar diretório de logs
mkdir -p /var/log/pm2

# Parar processos antigos se existirem
pm2 delete $APP_NAME 2>/dev/null || true

# Iniciar aplicação
print_step "Iniciando aplicação com PM2..."
cd $APP_DIR
pm2 start ecosystem.config.js

if [ $? -eq 0 ]; then
    print_success "Aplicação iniciada!"
else
    print_error "Erro ao iniciar aplicação"
    exit 1
fi

# Salvar lista de processos
print_step "Salvando configuração PM2..."
pm2 save

# Configurar PM2 para iniciar no boot
print_step "Configurando inicialização automática..."
pm2 startup systemd -u $USER --hp $HOME

# Gerar comando de startup
STARTUP_CMD=$(pm2 startup systemd -u $USER --hp $HOME | tail -n 1)
if [[ $STARTUP_CMD == sudo* ]]; then
    eval $STARTUP_CMD
fi

pm2 save

print_success "PM2 configurado para iniciar no boot!"

# Resumo
echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}✓ Setup PM2 concluído!${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo "Informações:"
echo "  • Aplicação: $APP_NAME"
echo "  • Diretório: $APP_DIR"
echo "  • Arquivo: $MAIN_FILE"
echo "  • Porta: $APP_PORT"
echo "  • Logs: /var/log/pm2/"
echo ""
echo "Comandos úteis do PM2:"
echo ""
echo "  pm2 status              # Ver status de todas apps"
echo "  pm2 logs $APP_NAME      # Ver logs em tempo real"
echo "  pm2 logs $APP_NAME --lines 100  # Últimas 100 linhas"
echo "  pm2 restart $APP_NAME   # Reiniciar app"
echo "  pm2 stop $APP_NAME      # Parar app"
echo "  pm2 start $APP_NAME     # Iniciar app"
echo "  pm2 reload $APP_NAME    # Reload sem downtime"
echo "  pm2 delete $APP_NAME    # Remover app"
echo "  pm2 monit               # Monitor interativo"
echo "  pm2 save                # Salvar lista de processos"
echo ""
echo "Ver logs:"
echo "  tail -f /var/log/pm2/$APP_NAME-out.log"
echo "  tail -f /var/log/pm2/$APP_NAME-error.log"
echo ""

# Mostrar status
print_step "Status atual:"
pm2 status

echo ""
print_success "Aplicação rodando em: http://localhost:$APP_PORT"
echo ""
