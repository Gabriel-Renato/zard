#!/bin/bash
# Script para gerar ícones PWA a partir do favicon.png
# Requer ImageMagick instalado: sudo apt-get install imagemagick

SOURCE="../favicon.png"
OUTPUT_DIR="."

if [ ! -f "$SOURCE" ]; then
    echo "Erro: favicon.png não encontrado em $SOURCE"
    exit 1
fi

echo "Gerando ícones PWA..."

# Gera ícone 192x192
convert "$SOURCE" -resize 192x192 -background none -gravity center -extent 192x192 "$OUTPUT_DIR/icon-192x192.png"
echo "✓ icon-192x192.png criado"

# Gera ícone 512x512
convert "$SOURCE" -resize 512x512 -background none -gravity center -extent 512x512 "$OUTPUT_DIR/icon-512x512.png"
echo "✓ icon-512x512.png criado"

echo "Ícones gerados com sucesso!"

