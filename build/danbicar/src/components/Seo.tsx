import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { applyDocumentSeo, getPageByPath } from '../lib/seo';

export function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    applyDocumentSeo(getPageByPath(pathname));
  }, [pathname]);

  return null;
}
