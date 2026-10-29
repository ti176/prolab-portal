const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '../dist');
const htmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(htmlPath)) {
  console.error('dist/index.html not found. Run npm run build first.');
  process.exit(1);
}

let html = fs.readFileSync(htmlPath, 'utf8');

// Read all CSS files in assets
const assetsDir = path.join(distDir, 'assets');
const files = fs.readdirSync(assetsDir);

const cssFiles = files.filter(f => f.endsWith('.css'));
const jsFiles = files.filter(f => f.endsWith('.js'));

// Inline CSS
cssFiles.forEach(cssFile => {
  const cssContent = fs.readFileSync(path.join(assetsDir, cssFile), 'utf8');
  html = html.replace(
    new RegExp(`<link[^>]+href=["'][^"']*${cssFile}["'][^>]*>`, 'i'),
    `<style>\n${cssContent}\n</style>`
  );
});

// For JS files, let's look at the script tags in html
// Vendor chunks and main app
let combinedJs = '';
// Order: vendor-react, vendor-icons, vendor-xlsx, then index
const orderedJs = [
  ...jsFiles.filter(f => f.startsWith('vendor-react')),
  ...jsFiles.filter(f => f.startsWith('vendor-icons')),
  ...jsFiles.filter(f => f.startsWith('vendor-xlsx')),
  ...jsFiles.filter(f => f.startsWith('index-')),
];

orderedJs.forEach(jsFile => {
  const jsContent = fs.readFileSync(path.join(assetsDir, jsFile), 'utf8');
  combinedJs += `\n/* --- Chunk: ${jsFile} --- */\n${jsContent}\n`;
});

// Remove existing module script tags and modulepreload
html = html.replace(/<link rel="modulepreload"[^>]*>/g, '');
html = html.replace(/<script type="module"[^>]*><\/script>/g, '');

// Append combined script before </body>
html = html.replace(
  '</body>',
  `<script>\n${combinedJs}\n</script>\n</body>`
);

const outPath = path.join(distDir, 'prolab_portal_colaborador_rebuilt.html');
fs.writeFileSync(outPath, html, 'utf8');

console.log(`Single-file standalone HTML generated at: ${outPath}`);
console.log(`Size: ${(Buffer.byteLength(html) / (1024 * 1024)).toFixed(2)} MB`);
