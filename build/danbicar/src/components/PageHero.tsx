import React from 'react';
import { Link } from 'react-router-dom';
import { getPageById } from '../lib/seo';

type Props = {
  pageId: string;
  children?: React.ReactNode;
};

/** 서브 페이지 상단: 페이지 전용 H1 + 요약 */
export function PageHero({ pageId, children }: Props) {
  const page = getPageById(pageId);
  if (!page) return null;

  return (
    <section className="bg-brand-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-slate-800 to-brand-navy" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-20 relative z-10">
        <p className="text-sm font-medium tracking-[0.14em] text-brand-light/80 mb-4">단비카</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight break-keep mb-4">{page.navLabel}</h1>
        <p className="text-lg text-slate-300 break-keep leading-relaxed max-w-2xl">{page.description}</p>
        {children}
        <div className="mt-8">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-bold bg-brand-orange hover:bg-orange-700 text-white transition-colors"
          >
            무료 상담 신청
          </Link>
        </div>
      </div>
    </section>
  );
}
