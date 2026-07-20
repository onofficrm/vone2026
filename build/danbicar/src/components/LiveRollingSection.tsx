import React, { useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';

const liveConsultationData = [
  { id: 1, name: '김○○님', car: 'K5 구매 상담을 신청하셨습니다.', status: '상담접수' },
  { id: 2, name: '박○○님', car: '아반떼 구매 상담을 신청하셨습니다.', status: '상담중' },
  { id: 3, name: '이○○님', car: '카니발 차량 상담을 신청하셨습니다.', status: '차량확인' },
  { id: 4, name: '최○○님', car: '출퇴근용 SUV 상담을 신청하셨습니다.', status: '상담접수' },
  { id: 5, name: '정○○님', car: '그랜저 구매 상담을 신청하셨습니다.', status: '상담완료' },
  { id: 6, name: '한○○님', car: '레이 구매 상담을 신청하셨습니다.', status: '상담중' },
  { id: 7, name: '조○○님', car: '쏘렌토 상담을 신청하셨습니다.', status: '차량확인' },
  { id: 8, name: '윤○○님', car: '경차 구매 상담을 신청하셨습니다.', status: '상담접수' },
  { id: 9, name: '오○○님', car: '생업용 차량 상담을 신청하셨습니다.', status: '상담중' },
  { id: 10, name: '장○○님', car: '가족용 차량 상담을 신청하셨습니다.', status: '차량확인' },
];

const liveStatusData = [
  { id: 1, text: '김○○님 · 개인회생 인가 · K5 조건 확인 중', status: '조건확인' },
  { id: 2, text: '박○○님 · 저신용 직장인 · 아반떼 상담 중', status: '접수완료' },
  { id: 3, text: '이○○님 · 개인회생 진행 중 · SUV 차량 확인', status: '차량추천' },
  { id: 4, text: '최○○님 · 기존 할부 거절 · 재상담 진행', status: '조건확인' },
  { id: 5, text: '정○○님 · 파산면책 · 그랜저 상담 완료', status: '상담완료' },
  { id: 6, text: '한○○님 · 사업자 · 카니발 서류 확인', status: '서류확인' },
  { id: 7, text: '조○○님 · 프리랜서 · 월 납입금 상담', status: '조건확인' },
  { id: 8, text: '윤○○님 · 저신용 고객 · 경차 상담 접수', status: '접수완료' },
  { id: 9, text: '오○○님 · 개인회생 면책 · 차량 추천 중', status: '차량추천' },
  { id: 10, text: '장○○님 · 직장인 · 구매조건 확인 중', status: '조건확인' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case '상담접수':
    case '접수완료':
      return 'bg-slate-100 text-slate-600';
    case '상담중':
    case '조건확인':
    case '서류확인':
      return 'bg-sky-50 text-sky-600 border border-sky-100';
    case '차량확인':
    case '차량추천':
      return 'bg-indigo-50 text-indigo-600 border border-indigo-100';
    case '상담완료':
      return 'bg-brand-orange/10 text-brand-orange border border-brand-orange/20';
    default:
      return 'bg-slate-100 text-slate-600';
  }
};

const RollingList = ({ items, renderItem, speedSeconds = 20 }: { items: any[], renderItem: (item: any) => React.ReactNode, speedSeconds?: number }) => {
  const [isPaused, setIsPaused] = useState(false);
  const displayItems = [...items, ...items]; // Duplicate for infinite scroll

  return (
    <div 
      className="relative h-[320px] overflow-hidden rounded-xl bg-white border border-slate-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div 
        className={`absolute w-full flex flex-col motion-reduce:animate-none`}
        style={{
          animation: `slideUp ${speedSeconds}s linear infinite`,
          animationPlayState: isPaused ? 'paused' : 'running'
        }}
      >
        {displayItems.map((item, index) => (
          <div key={`${item.id}-${index}`} className="px-5 py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
            {renderItem(item)}
          </div>
        ))}
      </div>
      
      {/* Top and Bottom Fades for smooth effect */}
      <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </div>
  );
};

export const LiveRollingSection = () => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden" id="live-status">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-4 tracking-tight">단비카 상담 진행 현황</h2>
          <p className="text-slate-600 text-lg">많은 분들이 단비카를 통해 새로운 차량과 여유자금을 상담받고 있습니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Left Card: 실시간 구매 상담 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-brand-blue animate-pulse"></div>
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight">실시간 구매 상담</h3>
            </div>
            <RollingList 
              items={liveConsultationData}
              speedSeconds={25}
              renderItem={(item) => (
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-700 font-medium truncate">
                      <span className="font-bold text-brand-navy mr-1">{item.name}</span>
                      {item.car}
                    </p>
                  </div>
                  <span className={`shrink-0 text-[13px] font-bold px-2.5 py-1 rounded-md ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
              )}
            />
          </div>

          {/* Right Card: 상담 진행 현황 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-brand-orange animate-pulse"></div>
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight">상담 진행 현황</h3>
            </div>
            <RollingList 
              items={liveStatusData}
              speedSeconds={28}
              renderItem={(item) => (
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-700 font-medium truncate">
                      {item.text}
                    </p>
                  </div>
                  <span className={`shrink-0 text-[13px] font-bold px-2.5 py-1 rounded-md ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
              )}
            />
          </div>

        </div>

        <div className="text-center mb-10">
          <p className="text-xs font-medium text-slate-400 bg-slate-100/50 py-2 px-4 rounded-full inline-block">
            * 현재 화면은 UI 확인을 위한 상담 예시입니다. 실제 운영 시 관리자 등록 데이터로 교체됩니다.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-3xl mx-auto">
          <a href="#contact" className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition-all duration-200 text-base bg-brand-navy text-white hover:bg-brand-navy-dark shadow-md">
            나도 상담 신청하기
          </a>
          <a href="tel:15994950" className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition-all duration-200 text-base bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm">
            <Phone className="w-5 h-5 text-brand-navy" />
            전화상담 1599-4950
          </a>
          <a href="https://open.kakao.com/o/sILPODCi" target="_blank" rel="noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition-all duration-200 text-base bg-[#FEE500] text-[#3A2929] hover:bg-[#F4DC00] shadow-sm">
            <MessageCircle className="w-5 h-5" />
            카카오톡 빠른 상담
          </a>
        </div>
      </div>
    </section>
  );
};
