import React, { useMemo, useState } from 'react';
import { Calculator, ChevronRight } from 'lucide-react';

type BudgetKey = '' | 'under20' | '20to30' | '30to40' | '40to50' | 'over50';
type CarKey = '' | '경차' | '준중형' | '중형' | '대형' | 'SUV' | '승합차';

const budgetLabels: Record<Exclude<BudgetKey, ''>, string> = {
  under20: '20만원 미만',
  '20to30': '20만~30만원',
  '30to40': '30만~40만원',
  '40to50': '40만~50만원',
  over50: '50만원 이상',
};

const guideByBudget: Record<Exclude<BudgetKey, ''>, { range: string; tip: string; cars: string }> = {
  under20: {
    range: '경차·소형 위주',
    tip: '월 납입 부담을 최소화하는 방향으로 차량을 좁혀볼 수 있습니다.',
    cars: '레이, 모닝, 캐스퍼 등',
  },
  '20to30': {
    range: '경차~준중형',
    tip: '출퇴근·생활용으로 많이 찾는 구간입니다. 조건을 확인한 뒤 차량을 추천합니다.',
    cars: '레이, 아반떼, K3 등',
  },
  '30to40': {
    range: '준중형~중형·소형 SUV',
    tip: '가족·출퇴근을 함께 고려할 때 상담 비중이 높은 구간입니다.',
    cars: '아반떼, K5, 소형 SUV 등',
  },
  '40to50': {
    range: '중형~SUV',
    tip: '차량 용도와 유지비까지 함께 보면 선택지가 넓어질 수 있습니다.',
    cars: 'K5, 쏘렌토, 싼타페 등',
  },
  over50: {
    range: '대형·SUV·승합',
    tip: '업무·가족 이동이 많은 경우 카니발·대형 SUV 상담 비중이 높습니다.',
    cars: '그랜저, 싼타페, 카니발 등',
  },
};

export function PaymentSimulator() {
  const [budget, setBudget] = useState<BudgetKey>('');
  const [carType, setCarType] = useState<CarKey>('');
  const [extraFunds, setExtraFunds] = useState('');

  const result = useMemo(() => {
    if (!budget) return null;
    const guide = guideByBudget[budget];
    const carNote =
      carType && !guide.cars.includes(carType) && carType !== '경차'
        ? `선택하신 「${carType}」도 조건에 따라 상담 가능 여부를 함께 확인합니다.`
        : carType
          ? `선택하신 「${carType}」 기준으로 우선 매칭해 드립니다.`
          : '원하시는 차종을 고르지 않아도 예산 기준으로 안내할 수 있습니다.';

    return {
      ...guide,
      carNote,
      budgetLabel: budgetLabels[budget],
      extra:
        extraFunds === '필요함'
          ? '여유자금 상담도 함께 요청하신 내용으로 전달합니다.'
          : extraFunds === '필요하지 않음'
            ? '차량 구매 조건 중심으로 상담을 진행합니다.'
            : '',
    };
  }, [budget, carType, extraFunds]);

  const goConsult = () => {
    const lines = [
      '[월 납입 시뮬레이터]',
      budget ? `희망 월 납입: ${budgetLabels[budget]}` : '',
      carType ? `희망 차종: ${carType}` : '',
      extraFunds ? `여유자금: ${extraFunds}` : '',
    ].filter(Boolean);

    window.dispatchEvent(new CustomEvent('set-consultation', { detail: lines.join('\n') }));
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-white" id="simulator">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-brand-blue font-bold text-sm mb-4">
            <Calculator className="w-5 h-5" />
            월 납입 가이드
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-4 tracking-tight">
            감당 가능한 월 납입부터 확인해 보세요
          </h2>
          <p className="text-slate-600 text-lg break-keep">
            확정 금리·한도가 아니라, 예산에 맞는 상담 방향을 먼저 잡아 드립니다.
          </p>
        </div>

        <div className="bg-brand-light/40 border border-brand-blue/10 rounded-3xl p-6 sm:p-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">희망 월 납입</label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value as BudgetKey)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
              >
                <option value="">선택</option>
                {Object.entries(budgetLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">관심 차종</label>
              <select
                value={carType}
                onChange={(e) => setCarType(e.target.value as CarKey)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
              >
                <option value="">선택 (선택사항)</option>
                <option value="경차">경차</option>
                <option value="준중형">준중형</option>
                <option value="중형">중형</option>
                <option value="대형">대형</option>
                <option value="SUV">SUV</option>
                <option value="승합차">승합차</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">여유자금 상담</label>
              <select
                value={extraFunds}
                onChange={(e) => setExtraFunds(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
              >
                <option value="">선택 (선택사항)</option>
                <option value="필요함">필요함</option>
                <option value="필요하지 않음">필요하지 않음</option>
                <option value="상담 후 결정">상담 후 결정</option>
              </select>
            </div>
          </div>

          {result ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 mb-6 animate-[slideIn_0.35s_ease-out]">
              <p className="text-sm font-bold text-brand-orange mb-2">상담 가이드 (예상)</p>
              <h3 className="text-2xl font-bold text-brand-navy mb-3 break-keep">{result.range}</h3>
              <p className="text-slate-600 mb-3 break-keep leading-relaxed">{result.tip}</p>
              <p className="text-slate-700 font-medium mb-2 break-keep">참고 차종 예: {result.cars}</p>
              <p className="text-slate-600 text-sm mb-2 break-keep">{result.carNote}</p>
              {result.extra && <p className="text-brand-blue text-sm font-semibold break-keep">{result.extra}</p>}
              <p className="text-xs text-slate-400 mt-5 break-keep">
                * 실제 가능 여부·금리·월 납입금은 심사 결과에 따라 달라지며, 본 결과는 상담 참고용입니다.
              </p>
            </div>
          ) : (
            <div className="bg-white/70 rounded-2xl border border-dashed border-slate-200 p-8 text-center text-slate-500 mb-6 break-keep">
              희망 월 납입을 선택하면 상담 방향이 표시됩니다.
            </div>
          )}

          <button
            type="button"
            onClick={goConsult}
            disabled={!budget}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-brand-orange hover:bg-orange-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            이 조건으로 무료 상담 신청
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
