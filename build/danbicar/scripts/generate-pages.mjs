import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync, readdirSync, rmSync, cpSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const repoRoot = resolve(root, '../..');
const distDir = join(root, 'dist');
const routes = JSON.parse(readFileSync(join(root, 'seo-routes.json'), 'utf8'));

const ORIGIN = routes.siteOrigin;
const SITE_NAME = routes.siteName;
const OG_IMAGE = routes.defaultOgImage;

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function applyMeta(html, page) {
  const canonical = page.path === '/' ? `${ORIGIN}/` : `${ORIGIN}${page.path}`;
  let out = html;
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(page.title)}</title>`);
  out = out.replace(
    /<meta name="description" content="[^"]*"\s*\/>/,
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
  );
  out = out.replace(
    /<meta name="keywords" content="[^"]*"\s*\/>/,
    `<meta name="keywords" content="${escapeHtml(page.keywords)}" />`,
  );
  out = out.replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`);
  out = out.replace(
    /<meta property="og:url" content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${canonical}" />`,
  );
  out = out.replace(
    /<meta property="og:title" content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
  );
  out = out.replace(
    /<meta property="og:description" content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
  );
  if (!out.includes('property="og:image"')) {
    out = out.replace(
      '<meta property="og:site_name"',
      `<meta property="og:image" content="${OG_IMAGE}" />\n    <meta property="og:site_name"`,
    );
  } else {
    out = out.replace(/<meta property="og:image" content="[^"]*"\s*\/>/, `<meta property="og:image" content="${OG_IMAGE}" />`);
  }
  if (!out.includes('name="twitter:title"')) {
    out = out.replace(
      '<meta name="twitter:card"',
      `<meta name="twitter:title" content="${escapeHtml(page.title)}" />\n    <meta name="twitter:description" content="${escapeHtml(page.description)}" />\n    <meta name="twitter:card"`,
    );
  } else {
    out = out.replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`);
    out = out.replace(
      /<meta name="twitter:description" content="[^"]*"\s*\/>/,
      `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
    );
  }
  out = out.replace(/<meta property="og:site_name" content="[^"]*"\s*\/>/, `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`);
  return out;
}

function main() {
  const template = readFileSync(join(distDir, 'index.html'), 'utf8');
  const dest = join(repoRoot, 'plugin/onoff-builder-bridge/imports/danbicar');

  // sync dist → imports
  if (existsSync(dest)) {
    for (const name of readdirSync(dest)) {
      if (name === 'home-feed.json' || name === 'inquiry-lookup.json' || name.startsWith('inquiry-')) continue;
      rmSync(join(dest, name), { recursive: true, force: true });
    }
  } else {
    mkdirSync(dest, { recursive: true });
  }
  cpSync(distDir, dest, { recursive: true });

  // preserve feeds
  for (const feed of ['home-feed.json', 'inquiry-lookup.json']) {
    const fromPublic = join(root, 'public', feed);
    if (existsSync(fromPublic)) copyFileSync(fromPublic, join(dest, feed));
  }

  // root favicons
  for (const f of ['favicon.svg', 'favicon.ico', 'favicon-32x32.png', 'apple-touch-icon.png']) {
    const src = join(root, 'public', f);
    if (existsSync(src)) {
      copyFileSync(src, join(repoRoot, f));
      copyFileSync(src, join(dest, f));
    }
  }

  // generate .page files at site root
  for (const page of routes.pages) {
    const html = applyMeta(template, page);
    writeFileSync(join(repoRoot, page.file), html, 'utf8');
    // also keep html aliases for home
    if (page.id === 'home') {
      for (const alias of ['index.html', 'home.htm', 'home.xhtml', 'danbicar.html']) {
        writeFileSync(join(repoRoot, alias), html, 'utf8');
      }
    }
    console.log('wrote', page.file, '→', page.path);
  }

  // sitemap
  const urls = routes.pages
    .map((p) => {
      const loc = p.path === '/' ? `${ORIGIN}/` : `${ORIGIN}${p.path}`;
      const priority = p.path === '/' ? '1.0' : p.id === 'contact' ? '0.9' : '0.7';
      return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join('\n');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  writeFileSync(join(repoRoot, 'danbi-sitemap.xml'), sitemap, 'utf8');
  console.log('wrote danbi-sitemap.xml');
}

main();
