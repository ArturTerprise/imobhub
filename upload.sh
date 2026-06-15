#!/bin/bash

################################################################################
# Script de Upload - ImobHub Landing Page
# Envia arquivos para o servidor VPS
################################################################################

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Upload para Servidor${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Verificar se rsync está instalado
if ! command -v rsync &> /dev/null; then
    echo -e "${RED}✗ rsync não está instalado${NC}"
    echo "Instale com: sudo apt install rsync (Ubuntu/Debian)"
    echo "           ou brew install rsync (macOS)"
    exit 1
fi

# Solicitar informações do servidor
echo -e "${YELLOW}Configure as informações do servidor:${NC}"
echo ""

read -p "Usuário SSH (ex: root, ubuntu): " SSH_USER
read -p "IP ou domínio do servidor: " SERVER_IP
read -p "Diretório de destino [/var/www/imobhub-lp]: " DEST_DIR
DEST_DIR=${DEST_DIR:-/var/www/imobhub-lp}

echo ""
echo -e "${GREEN}Configuração:${NC}"
echo "  Servidor: $SSH_USER@$SERVER_IP"
echo "  Destino: $DEST_DIR"
echo ""

read -p "Confirma o upload? (s/N): " CONFIRM
if [[ ! $CONFIRM =~ ^[Ss]$ ]]; then
    echo "Upload cancelado."
    exit 0
fi

echo ""
echo -e "${BLUE}Enviando arquivos...${NC}"

# Fazer upload com rsync
rsync -avz --progress \
  --exclude 'node_modules' \
  --exclude 'dist' \
  --exclude '.git' \
  --exclude '.env.local' \
  --exclude '.DS_Store' \
  --exclude 'coverage' \
  --exclude '.vscode' \
  --exclude '.idea' \
  . "$SSH_USER@$SERVER_IP:$DEST_DIR/"

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✓ Upload concluído com sucesso!${NC}"
    echo ""
    echo "Próximo passo:"
    echo "  ssh $SSH_USER@$SERVER_IP"
    echo "  cd $DEST_DIR"
    echo "  sudo bash deploy.sh"
    echo ""
else
    echo -e "${RED}✗ Erro durante o upload${NC}"
    exit 1
fi
