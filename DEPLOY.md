# 🚀 Guia de Deploy - ImobHub Landing Page

Este guia explica como fazer o deploy da aplicação em uma VPS Ubuntu 24.04 LTS.

## 📋 Pré-requisitos

- VPS Ubuntu 24.04 LTS
- Acesso SSH como root ou usuário com sudo
- Domínio configurado (opcional, mas recomendado)

## 🔧 Métodos de Deploy

### Método 1: Upload Manual + Script Automatizado (Recomendado)

#### Passo 1: Enviar arquivos para o servidor

Na sua máquina local, execute:

```bash
# Sincronizar arquivos do projeto (exceto node_modules e dist)
rsync -avz --exclude 'node_modules' --exclude 'dist' --exclude '.git' \
  . usuario@ip-do-servidor:/var/www/imobhub-lp/
```

Ou use SFTP/SCP:

```bash
scp -r . usuario@ip-do-servidor:/var/www/imobhub-lp/
```

#### Passo 2: Executar script de deploy

No servidor, execute:

```bash
cd /var/www/imobhub-lp
sudo bash deploy.sh
```

O script irá:
- ✅ Atualizar o sistema
- ✅ Instalar Node.js 20
- ✅ Instalar Nginx
- ✅ Instalar dependências do projeto
- ✅ Buildar a aplicação
- ✅ Configurar Nginx automaticamente
- ✅ Configurar permissões corretas

### Método 2: Git Clone + Deploy

#### Passo 1: Modificar o script

Edite `deploy.sh` e descomente as linhas do git:

```bash
if [ -d ".git" ]; then
    print_step "Atualizando repositório..."
    git pull origin main
else
    print_step "Clonando repositório..."
    git clone https://github.com/seu-usuario/seu-repo.git .
fi
```

#### Passo 2: Executar deploy

```bash
sudo bash deploy.sh
```

## 🌐 Configurar Domínio

Após o deploy inicial, configure seu domínio:

1. Aponte os DNS do seu domínio para o IP do servidor:
   - Tipo A: `exemplo.com` → `IP_DO_SERVIDOR`
   - Tipo A: `www.exemplo.com` → `IP_DO_SERVIDOR`

2. Edite a configuração do Nginx:

```bash
sudo nano /etc/nginx/sites-available/imobhub-lp
```

3. Altere a linha `server_name`:

```nginx
server_name exemplo.com www.exemplo.com;
```

4. Recarregue o Nginx:

```bash
sudo systemctl reload nginx
```

## 🔒 Configurar SSL/HTTPS (Let's Encrypt)

**Importante:** Aguarde a propagação DNS antes de configurar SSL (pode levar até 24h).

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obter certificado SSL
sudo certbot --nginx -d seudominio.com -d www.seudominio.com

# Testar renovação automática
sudo certbot renew --dry-run
```

O Certbot irá:
- Gerar certificados SSL gratuitos
- Configurar HTTPS automaticamente no Nginx
- Configurar renovação automática

## 🔄 Fazer Redeploy (Atualizações)

Quando precisar atualizar a aplicação:

### Opção 1: Reenviar arquivos

```bash
# Na máquina local
rsync -avz --exclude 'node_modules' --exclude 'dist' --exclude '.git' \
  . usuario@ip-do-servidor:/var/www/imobhub-lp/

# No servidor
cd /var/www/imobhub-lp
sudo bash deploy.sh
```

### Opção 2: Git Pull (se usar git)

```bash
cd /var/www/imobhub-lp
sudo bash deploy.sh
```

## 📊 Monitoramento e Logs

### Ver logs do Nginx

```bash
# Logs de acesso
tail -f /var/log/nginx/imobhub-lp_access.log

# Logs de erro
tail -f /var/log/nginx/imobhub-lp_error.log
```

### Status do Nginx

```bash
# Verificar status
sudo systemctl status nginx

# Testar configuração
sudo nginx -t

# Recarregar após mudanças
sudo systemctl reload nginx

# Reiniciar completamente
sudo systemctl restart nginx
```

## 🛠️ Comandos Úteis

### Limpar cache do build

```bash
cd /var/www/imobhub-lp
rm -rf dist node_modules
npm install
npm run build
```

### Verificar espaço em disco

```bash
df -h
```

### Ver processos do Node

```bash
ps aux | grep node
```

### Testar conectividade

```bash
curl -I localhost
curl -I http://seu-dominio.com
```

## 🔐 Segurança Adicional

### Configurar Firewall (UFW)

```bash
# Habilitar UFW
sudo ufw enable

# Permitir SSH
sudo ufw allow ssh

# Permitir HTTP/HTTPS
sudo ufw allow 'Nginx Full'

# Ver status
sudo ufw status
```

### Fail2Ban (proteção contra ataques)

```bash
sudo apt install fail2ban -y
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### Atualizações automáticas de segurança

```bash
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

## 🐛 Troubleshooting

### Erro 502 Bad Gateway
- Verifique se o build foi gerado: `ls -la /var/www/imobhub-lp/dist`
- Execute o build novamente: `cd /var/www/imobhub-lp && npm run build`

### Erro 403 Forbidden
- Verifique permissões: `sudo chown -R www-data:www-data /var/www/imobhub-lp/dist`
- Verifique SELinux (se habilitado): `sudo setenforce 0`

### Rotas do React não funcionam (404)
- Certifique-se que a configuração do Nginx tem `try_files $uri $uri/ /index.html;`
- Recarregue o Nginx: `sudo systemctl reload nginx`

### Nginx não inicia
- Teste a configuração: `sudo nginx -t`
- Veja os erros: `sudo journalctl -u nginx -n 50`

## 📁 Estrutura de Arquivos no Servidor

```
/var/www/imobhub-lp/
├── dist/                 # Build da aplicação (servido pelo Nginx)
│   ├── index.html
│   ├── assets/
│   └── ...
├── src/                  # Código fonte
├── node_modules/         # Dependências
├── package.json
├── vite.config.ts
└── deploy.sh            # Script de deploy
```

## 📞 Suporte

Se encontrar problemas, verifique:
1. Logs do Nginx: `/var/log/nginx/`
2. Logs do sistema: `sudo journalctl -xe`
3. Status dos serviços: `sudo systemctl status nginx`

## 🎯 Checklist de Deploy

- [ ] VPS configurada com Ubuntu 24.04 LTS
- [ ] Arquivos enviados para `/var/www/imobhub-lp`
- [ ] Script `deploy.sh` executado com sucesso
- [ ] Nginx rodando (`sudo systemctl status nginx`)
- [ ] Aplicação acessível via IP do servidor
- [ ] DNS configurado (se usar domínio)
- [ ] SSL configurado com Let's Encrypt
- [ ] Firewall configurado
- [ ] Logs sendo monitorados

---

**Última atualização:** 2026-02-02
