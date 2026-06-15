# ################################################################################
# Script de Upload - ImobHub Landing Page (PowerShell para Windows)
# Envia arquivos para o servidor VPS via SCP
# ################################################################################

Write-Host "========================================" -ForegroundColor Blue
Write-Host "  Upload para Servidor (Windows)" -ForegroundColor Blue
Write-Host "========================================" -ForegroundColor Blue
Write-Host ""

# Verificar se scp está disponível (incluído no Windows 10/11)
try {
    $null = Get-Command scp -ErrorAction Stop
} catch {
    Write-Host "✗ SCP não está disponível" -ForegroundColor Red
    Write-Host "Instale o OpenSSH Client nas configurações do Windows" -ForegroundColor Yellow
    Write-Host "Ou use WinSCP: https://winscp.net/" -ForegroundColor Yellow
    exit 1
}

# Solicitar informações do servidor
Write-Host "Configure as informações do servidor:" -ForegroundColor Yellow
Write-Host ""

$SSH_USER = Read-Host "Usuário SSH (ex: root, ubuntu)"
$SERVER_IP = Read-Host "IP ou domínio do servidor"
$DEST_DIR = Read-Host "Diretório de destino [/var/www/imobhub-lp]"
if ([string]::IsNullOrWhiteSpace($DEST_DIR)) {
    $DEST_DIR = "/var/www/imobhub-lp"
}

Write-Host ""
Write-Host "Configuração:" -ForegroundColor Green
Write-Host "  Servidor: $SSH_USER@$SERVER_IP"
Write-Host "  Destino: $DEST_DIR"
Write-Host ""

$CONFIRM = Read-Host "Confirma o upload? (s/N)"
if ($CONFIRM -notmatch '^[Ss]$') {
    Write-Host "Upload cancelado."
    exit 0
}

Write-Host ""
Write-Host "Preparando arquivos..." -ForegroundColor Blue

# Criar arquivo temporário zip
$tempZip = "$env:TEMP\imobhub-lp-deploy.zip"
if (Test-Path $tempZip) {
    Remove-Item $tempZip -Force
}

# Comprimir arquivos (excluindo node_modules, dist, etc)
Write-Host "Compactando arquivos..." -ForegroundColor Blue

# Obter todos os arquivos exceto os excluídos
$excludePatterns = @(
    'node_modules',
    'dist',
    '.git',
    '.env.local',
    '.DS_Store',
    'coverage',
    '.vscode',
    '.idea',
    '*.log'
)

# Criar lista de arquivos para incluir
$files = Get-ChildItem -Recurse -File | Where-Object {
    $file = $_
    $shouldExclude = $false
    foreach ($pattern in $excludePatterns) {
        if ($file.FullName -like "*$pattern*") {
            $shouldExclude = $true
            break
        }
    }
    -not $shouldExclude
}

# Comprimir
Compress-Archive -Path $files.FullName -DestinationPath $tempZip -CompressionLevel Optimal -Force

Write-Host "✓ Arquivos compactados" -ForegroundColor Green
Write-Host ""
Write-Host "Enviando para o servidor..." -ForegroundColor Blue

# Enviar arquivo zip
scp $tempZip "${SSH_USER}@${SERVER_IP}:${DEST_DIR}/imobhub-lp-deploy.zip"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Arquivo enviado" -ForegroundColor Green
    Write-Host ""
    Write-Host "Descompactando no servidor..." -ForegroundColor Blue
    
    # Descompactar no servidor e limpar
    $sshCommands = @"
cd $DEST_DIR && \
unzip -o imobhub-lp-deploy.zip && \
rm imobhub-lp-deploy.zip && \
echo 'Arquivos descompactados com sucesso!'
"@
    
    ssh "${SSH_USER}@${SERVER_IP}" $sshCommands
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✓ Upload concluído com sucesso!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Próximos passos:" -ForegroundColor Yellow
        Write-Host "  1. Conecte via SSH:"
        Write-Host "     ssh $SSH_USER@$SERVER_IP" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "  2. Execute o deploy:"
        Write-Host "     cd $DEST_DIR" -ForegroundColor Cyan
        Write-Host "     sudo bash deploy.sh" -ForegroundColor Cyan
        Write-Host ""
    } else {
        Write-Host "✗ Erro ao descompactar no servidor" -ForegroundColor Red
    }
} else {
    Write-Host "✗ Erro durante o upload" -ForegroundColor Red
    exit 1
}

# Limpar arquivo temporário
Remove-Item $tempZip -Force
Write-Host "✓ Arquivo temporário removido" -ForegroundColor Green
