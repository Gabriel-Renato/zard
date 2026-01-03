// Script Node.js para gerar ícones PWA a partir do favicon.png
// Requer: npm install sharp
// Execute: node generate-icons.js

import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourcePath = path.join(__dirname, '../favicon.png');
const outputDir = __dirname;

async function generateIcons() {
  try {
    // Verifica se o arquivo fonte existe
    if (!fs.existsSync(sourcePath)) {
      console.error('Erro: favicon.png não encontrado em', sourcePath);
      process.exit(1);
    }

    console.log('Gerando ícones PWA...');

    // Gera ícone 192x192
    await sharp(sourcePath)
      .resize(192, 192, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .toFile(path.join(outputDir, 'icon-192x192.png'));
    console.log('✓ icon-192x192.png criado');

    // Gera ícone 512x512
    await sharp(sourcePath)
      .resize(512, 512, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .toFile(path.join(outputDir, 'icon-512x512.png'));
    console.log('✓ icon-512x512.png criado');

    console.log('Ícones gerados com sucesso!');
  } catch (error) {
    console.error('Erro ao gerar ícones:', error.message);
    console.log('\nDica: Instale sharp com: npm install sharp');
    process.exit(1);
  }
}

generateIcons();

