import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, CarFront, ClipboardList, Home, MessageCircle, MessageSquareText, Phone, X } from 'lucide-react';
import { openKakaoWithPrefill, buildSituationMessage } from '../lib/consult';

export function FloatingNav() {
  return (
    <>
      <InteractivePrompt />
      <FloatingMenuPC />
      <FloatingMenuMobile />
    </>
  );
}

function InteractivePrompt() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isClosed) return;
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isClosed]);

  const handleOptionClick = (option: string) => {
    window.dispatchEvent(new CustomEvent('set-consultation', { detail: option }));
    setIsClosed(true);
    setIsVisible(false);
    window.location.href = '/contact';
  };

  const handleKakaoClick = async (option: string) => {
    const copied = await openKakaoWithPrefill(buildSituationMessage(option));
    setIsClosed(true);
    setIsVisible(false);
    if (copied) {
      window.dispatchEvent(
        new CustomEvent('danbi-toast', {
          detail: '상담 내용이 복사되었습니다. 카카오톡에 붙여넣어 주세요.',
        }),
      );
    }
  };

  const options = ['개인회생 중이에요', '신용점수가 낮아요', '기존 할부가 거절됐어요', '월 납입금이 궁금해요', '여유자금 상담이 필요해요'];

  if (!isVisible || isClosed) return null;

  return (
    <div className="fixed bottom-24 lg:bottom-10 left-4 lg:left-10 z-50 w-72 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-brand-navy/10 overflow-hidden flex flex-col animate-[slideIn_0.5s_ease-out]">
      <div className="bg-brand-navy text-white p-4 pr-10 relative">
        <div className="flex items-center gap-2 mb-1">
          <MessageSquareText className="w-5 h-5 text-brand-orange" />
          <span className="font-bold text-sm">단비카 매니저</span>
        </div>
        <p className="text-sm font-medium leading-snug break-keep">개인회생이나 저신용 때문에 할부가 걱정되시나요?</p>
        <button
          type="button"
          onClick={() => {
            setIsClosed(true);
            setIsVisible(false);
          }}
          className="absolute top-3 right-3 text-white/50 hover:text-white transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-3 bg-slate-50 flex flex-col gap-1.5 max-h-64 overflow-y-auto">
        {options.map((opt, i) => (
          <div key={i} className="flex gap-1.5">
            <button
              type="button"
              onClick={() => handleOptionClick(opt)}
              className="text-left flex-1 px-3 py-2.5 bg-white border border-slate-200 hover:border-brand-blue hover:text-brand-blue hover:bg-sky-50 rounded-xl text-sm font-medium text-slate-700 transition-colors shadow-sm"
            >
              {opt}
            </button>
            <button
              type="button"
              onClick={() => handleKakaoClick(opt)}
              className="px-2.5 rounded-xl bg-[#FEE500] text-[#3A2929] text-xs font-bold hover:bg-[#F4DC00]"
              title="카카오톡으로 상담"
            >
              카톡
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function FloatingMenuPC() {
  const openKakao = async () => {
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
    <div className="hidden lg:flex fixed right-6 bottom-10 flex-col gap-3 z-50">
      <a
        href="tel:15994950"
        className="w-14 h-14 bg-brand-navy rounded-full shadow-lg flex items-center justify-center text-white hover:bg-brand-navy-dark transition-transform hover:-translate-y-1 group relative"
      >
        <Phone className="w-6 h-6" />
      </a>
      <button
        type="button"
        onClick={openKakao}
        className="w-14 h-14 bg-[#FEE500] rounded-full shadow-lg flex items-center justify-center text-[#3A2929] hover:bg-[#F4DC00] transition-transform hover:-translate-y-1"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
      <Link
        to="/contact"
        className="w-14 h-14 bg-brand-blue rounded-full shadow-lg flex items-center justify-center text-white hover:bg-sky-700 transition-transform hover:-translate-y-1"
      >
        <ClipboardList className="w-6 h-6" />
      </Link>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-500 hover:text-brand-navy transition-transform hover:-translate-y-1 border border-slate-100"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
}

function FloatingMenuMobile() {
  const openKakao = async () => {
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
    <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 z-50 flex items-center justify-between pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <Link to="/" className="flex-1 flex flex-col items-center justify-center py-2.5 text-slate-500 hover:text-brand-navy transition-colors">
        <Home className="w-5 h-5 mb-1" />
        <span className="text-[10px] font-bold">홈</span>
      </Link>
      <Link to="/cars" className="flex-1 flex flex-col items-center justify-center py-2.5 text-slate-500 hover:text-brand-navy transition-colors">
        <CarFront className="w-5 h-5 mb-1" />
        <span className="text-[10px] font-bold">차량 보기</span>
      </Link>
      <a
        href="tel:15994950"
        className="flex-1 flex flex-col items-center justify-center py-2.5 text-brand-navy font-bold hover:bg-slate-50 transition-colors border-l border-slate-100 relative"
      >
        <Phone className="w-5 h-5 mb-1" />
        <span className="text-[10px]">전화상담</span>
      </a>
      <button
        type="button"
        onClick={openKakao}
        className="flex-1 flex flex-col items-center justify-center py-2.5 text-[#3A2929] bg-[#FEE500] hover:bg-[#F4DC00] font-bold transition-colors"
      >
        <MessageCircle className="w-5 h-5 mb-1" />
        <span className="text-[10px]">카카오톡</span>
      </button>
    </div>
  );
}
