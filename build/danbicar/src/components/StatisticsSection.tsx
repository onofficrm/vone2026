import React, { useEffect, useState, useRef } from 'react';
import { CalendarDays, Users, CheckCircle, Phone, MessageCircle } from 'lucide-react';

const statsData = {
  isSample: true,
  lastUpdated: '2026-07-11',
  sevenDays: 4230,
  total: 917890,
  success: 362288,
};

const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (prefersReducedMotion) {
            setCount(end);
            return;
          }

          let startTime: number | null = null;
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            // easeOutExpo
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            
            setCount(Math.floor(end * easeProgress));
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [end, duration, hasAnimated]);

  return { count, elementRef };
};

const StatCard = ({ title, number, desc, subDesc, icon: Icon, isHighlighted = false }: any) => {
  const { count, elementRef } = useCountUp(number, 2000);

  return (
    <div ref={elementRef} className="bg-white rounded-[24px] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <span className="inline-flex px-4 py-1.5 rounded-full border border-slate-200 text-sm font-bold text-slate-700 tracking-wider">
          {title}
        </span>
        <div className={`p-3 rounded-2xl ${isHighlighted ? 'bg-brand-blue/10 text-brand-blue' : 'bg-slate-50 text-slate-400'}`}>
          <Icon className="w-6 h-6" strokeWidth={2} />
        </div>
      </div>
      
      <div className="mb-6 flex-grow">
        <div className={`text-4xl sm:text-5xl font-extrabold tracking-tight mb-2 ${isHighlighted ? 'text-brand-blue' : 'text-slate-800'}`}>
          {count.toLocaleString()}
        </div>
        <p className="text-slate-600 text-[15px] leading-relaxed break-keep">
          {desc}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100 mt-auto">
        <p className="text-slate-400 text-sm font-medium">
          {subDesc}
        </p>
      </div>
    </div>
  );
};

export const StatisticsSection = () => {
  return (
    <section className="pt-8 pb-24 bg-slate-50 relative overflow-hidden" id="statistics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-4 tracking-tight">숫자로 확인하는 단비카 상담 현황</h2>
          <p className="text-slate-600 text-lg break-keep">개인회생·저신용 중고차 상담부터 차량 선택과 출고 상담까지 단비카의 상담 현황을 한눈에 확인해 보세요.</p>
        </div>

        {statsData.isSample && (
          <div className="text-center mb-8">
            <p className="text-xs font-medium text-slate-400 bg-slate-50 py-2 px-4 rounded-full inline-block border border-slate-100">
              * 현재 통계는 화면 구성 확인을 위한 예시값입니다. 실제 운영 시 관리자 입력값 또는 집계 데이터로 교체됩니다.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          <StatCard 
            title="7DAYS"
            number={statsData.sevenDays}
            desc="최근 7일간 단비카에 접수된 상담 문의 건수입니다."
            subDesc="차량 구매·개인회생·저신용 상담 포함"
            icon={CalendarDays}
          />
          <StatCard 
            title="TOTAL"
            number={statsData.total}
            desc="단비카에 누적 접수된 전체 상담 문의 건수입니다."
            subDesc="전화·카카오톡·홈페이지 상담 포함"
            icon={Users}
            isHighlighted={true}
          />
          <StatCard 
            title="SUCCESS"
            number={statsData.success}
            desc="상담 절차가 완료되었거나 차량 상담이 다음 단계로 진행된 누적 건수입니다."
            subDesc="상담완료·차량추천·출고상담 단계 포함"
            icon={CheckCircle}
          />
        </div>

        <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 text-center border border-slate-100 max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4 tracking-tight break-keep">나와 비슷한 상황도 상담할 수 있을까요?</h3>
          <p className="text-slate-600 text-lg mb-8 leading-relaxed break-keep">
            개인회생 진행 상태, 현재 소득, 필요한 차량과 원하는 월 납입금부터 부담 없이 확인해 보세요.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <a href="#contact" className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition-all duration-200 text-base bg-brand-navy text-white hover:bg-brand-navy-dark shadow-md max-w-sm mx-auto sm:mx-0 w-full">
              내 조건 무료 확인하기
            </a>
            <a href="tel:15994950" className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition-all duration-200 text-base bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm max-w-sm mx-auto sm:mx-0 w-full">
              <Phone className="w-5 h-5 text-brand-navy" />
              1599-4950 전화상담
            </a>
            <a href="https://open.kakao.com/o/sILPODCi" target="_blank" rel="noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition-all duration-200 text-base bg-[#FEE500] text-[#3A2929] hover:bg-[#F4DC00] shadow-sm max-w-sm mx-auto sm:mx-0 w-full">
              <MessageCircle className="w-5 h-5" />
              카카오톡 상담
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
