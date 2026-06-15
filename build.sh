#!/bin/bash
set -e

echo "🔨 Building..."
npm run build

echo "📦 Deploying to /var/www/imobhub-lp..."
rm -rf /var/www/imobhub-lp/*
cp -r dist/* /var/www/imobhub-lp/
chown -R www-data:www-data /var/www/imobhub-lp

echo "✅ Deploy complete!"
echo "🌐 https://imobhub.app"