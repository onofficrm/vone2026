import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CarFront, Menu, MessageCircle, Phone } from 'lucide-react';
import { NAV_MAIN } from '../lib/seo';
import { openKakaoWithPrefill } from '../lib/consult';

const KakaoHeaderCta = () => {
  const onClick = async () => {
    const copied = await openKakaoWithPrefill('단비카 상담 문의합니다.');
    if (copied) {
      window.dispatchEvent(
        new CustomEvent('danbi-toast', {
          detail: '상담 문구가 복사되었습니다. 카카오톡에 붙여넣어 주세요.',
        }),
      );
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-md text-[13px] font-medium tracking-[0.04em] shadow-none border border-[#E6C200] bg-[#F5E6A8] hover:bg-[#F0DC8A] text-[#3A2929] transition-colors"
    >
      <MessageCircle className="w-3.5 h-3.5" strokeWidth={1.75} />
      <span className="hidden lg:inline">카카오톡 상담</span>
      <span className="lg:hidden">카카오</span>
    </button>
  );
};

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[4.5rem] flex items-center gap-6 lg:gap-10">
        <Link to="/" className="shrink-0 flex items-center gap-2.5 group" aria-label="단비카 홈">
          <div className="w-9 h-9 rounded-md bg-brand-navy flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-[1.03]">
            <CarFront className="w-[18px] h-[18px] text-white" strokeWidth={1.75} />
          </div>
          <span className="text-[1.25rem] font-semibold text-brand-navy tracking-[0.12em]">단비카</span>
        </Link>

        <nav className="hidden md:flex flex-1 items-center justify-center gap-7 lg:gap-10" aria-label="주요 메뉴">
          {NAV_MAIN.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative py-1 text-[13px] lg:text-sm font-bold tracking-[0.06em] transition-colors duration-300 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:bg-brand-navy after:transition-transform after:duration-300 ${
                  isActive
                    ? 'text-brand-navy after:scale-x-100'
                    : 'text-slate-700 hover:text-brand-navy after:scale-x-0 hover:after:scale-x-100'
                }`
              }
            >
              {item.navLabel}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto md:ml-0 shrink-0 flex items-center gap-2.5 sm:gap-3">
          <a
            href="tel:15994950"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-[13px] font-medium tracking-[0.06em] text-brand-navy border border-slate-200/90 rounded-md hover:border-brand-navy/40 hover:bg-slate-50 transition-colors duration-300"
          >
            <Phone className="w-3.5 h-3.5 opacity-70" strokeWidth={1.75} />
            1599-4950
          </a>
          <KakaoHeaderCta />
          <Link
            to="/contact"
            className="md:hidden p-2 text-slate-500 hover:text-brand-navy transition-colors"
            aria-label="상담 메뉴"
          >
            <Menu className="w-5 h-5" strokeWidth={1.75} />
          </Link>
        </div>
      </div>
    </header>
  );
}
