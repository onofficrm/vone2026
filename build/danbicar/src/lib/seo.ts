import routesJson from '../../seo-routes.json';

export type SeoPage = {
  id: string;
  path: string;
  file: string;
  navLabel: string;
  title: string;
  description: string;
  keywords: string;
};

export const SITE_ORIGIN = routesJson.siteOrigin as string;
export const SITE_NAME = routesJson.siteName as string;
export const DEFAULT_OG_IMAGE = routesJson.defaultOgImage as string;
export const SEO_PAGES = routesJson.pages as SeoPage[];

export const NAV_MAIN = SEO_PAGES.filter((p) =>
  ['about', 'simulator', 'delivery', 'guide', 'reviews', 'contact'].includes(p.id),
);

export function getPageByPath(pathname: string): SeoPage {
  const normalized = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname || '/';
  return SEO_PAGES.find((p) => p.path === normalized) || SEO_PAGES[0];
}

export function getPageById(id: string): SeoPage | undefined {
  return SEO_PAGES.find((p) => p.id === id);
}

export function canonicalUrl(path: string): string {
  if (path === '/') return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${path}`;
}

/** SPA 전환 시 document head 갱신 (초기 HTML 메타는 빌드 스크립트가 페이지별로 생성) */
export function applyDocumentSeo(page: SeoPage) {
  if (typeof document === 'undefined') return;

  document.title = page.title;

  const setMeta = (selector: string, attr: 'content' | 'href', value: string) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };

  setMeta('meta[name="description"]', 'content', page.description);
  setMeta('meta[name="keywords"]', 'content', page.keywords);
  setMeta('link[rel="canonical"]', 'href', canonicalUrl(page.path));
  setMeta('meta[property="og:title"]', 'content', page.title);
  setMeta('meta[property="og:description"]', 'content', page.description);
  setMeta('meta[property="og:url"]', 'content', canonicalUrl(page.path));
  setMeta('meta[property="og:site_name"]', 'content', SITE_NAME);
  setMeta('meta[name="twitter:title"]', 'content', page.title);
  setMeta('meta[name="twitter:description"]', 'content', page.description);
}
