import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

export function SoftCtaBanner() {
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (closed) return;
    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = (window.scrollY + window.innerHeight) / doc.scrollHeight;
      setVisible(scrolled > 0.55 && window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [closed]);

  if (!visible || closed) return null;

  return (
    <div className="fixed bottom-20 lg:bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-1.5rem)] max-w-lg">
      <div className="relative flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl bg-brand-navy text-white px-5 py-4 shadow-2xl border border-white/10">
        <button
          type="button"
          className="absolute top-2 right-2 p-1 text-white/50 hover:text-white"
          onClick={() => setClosed(true)}
          aria-label="닫기"
        >
          <X className="w-4 h-4" />
        </button>
        <p className="text-sm font-medium break-keep pr-6 sm:pr-0">
          조건만 먼저 확인해 보세요. 상담 신청만으로 계약은 진행되지 않습니다.
        </p>
        <Link
          to="/contact"
          className="shrink-0 inline-flex justify-center px-4 py-2.5 rounded-xl text-sm font-bold bg-brand-orange hover:bg-orange-700 transition-colors"
        >
          30초 상담
        </Link>
      </div>
    </div>
  );
}
