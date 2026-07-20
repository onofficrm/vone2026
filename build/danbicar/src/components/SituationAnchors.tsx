import React from 'react';
import { openKakaoWithPrefill, buildSituationMessage } from '../lib/consult';

const situations = [
  { id: 'rehab', label: '개인회생 중', href: '#rehab', message: '개인회생 진행 중인데 중고차 할부 상담이 필요해요.' },
  { id: 'lowcredit', label: '저신용', href: '#lowcredit', message: '신용점수가 낮아 할부가 걱정됩니다.' },
  { id: 'rejected', label: '할부 거절 경험', href: '#rejected', message: '다른 곳에서 할부가 거절되어 재상담이 필요해요.' },
  { id: 'funds', label: '여유자금 상담', href: '#funds', message: '차량 구매와 여유자금 상담을 함께 받고 싶어요.' },
];

export function SituationAnchors() {
  const goKakao = async (message: string) => {
    const copied = await openKakaoWithPrefill(buildSituationMessage(message));
    if (copied) {
      window.dispatchEvent(
        new CustomEvent('danbi-toast', {
          detail: '상담 내용이 복사되었습니다. 카카오톡에 붙여넣어 주세요.',
        }),
      );
    }
  };

  return (
    <section className="py-10 bg-white border-y border-slate-100" id="situations" aria-label="상황별 바로가기">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
          <p className="text-sm font-bold text-brand-navy shrink-0">내 상황으로 바로가기</p>
          <div className="flex flex-wrap gap-2">
            {situations.map((item) => (
              <div key={item.id} className="flex items-center gap-1">
                <a
                  href={item.href}
                  className="px-4 py-2 rounded-full text-sm font-semibold bg-slate-100 text-slate-700 hover:bg-brand-navy hover:text-white transition-colors"
                >
                  {item.label}
                </a>
                <button
                  type="button"
                  onClick={() => goKakao(item.message)}
                  className="px-3 py-2 rounded-full text-xs font-bold bg-[#FEE500] text-[#3A2929] hover:bg-[#F4DC00] transition-colors"
                  title="카카오톡으로 이 내용 상담"
                >
                  카톡
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
