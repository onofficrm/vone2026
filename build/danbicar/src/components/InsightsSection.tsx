import React, { useState } from 'react';
import { BookOpen, ChevronDown } from 'lucide-react';

const articles = [
  {
    id: 'rehab-before-after',
    keyword: '개인회생중고차할부',
    title: '개인회생 인가 전과 인가 후, 할부 상담이 달라질 수 있나요?',
    summary: '인가 전·후와 변제 회차에 따라 검토 가능한 금융 조건이 달라질 수 있습니다. 확정 승인이 아니라, 현재 단계에 맞는 상담 방향부터 확인하는 것이 중요합니다.',
    body: [
      '개인회생 중이어도 소득 증빙과 변제 상태가 확인되면 상담을 진행할 수 있는 경우가 있습니다.',
      '인가 결정을 받고 일정 회차 이상 납부한 경우에는 선택지가 더 넓어질 수 있지만, 결과는 고객별 심사에 따라 다릅니다.',
      '상담 신청만으로 신용조회나 계약이 자동 진행되지는 않습니다.',
    ],
  },
  {
    id: 'low-credit',
    keyword: '저신용중고차할부',
    title: '신용점수가 낮아도 중고차 할부 상담을 받을 수 있나요?',
    summary: '점수만으로 단정하지 않고, 소득·재직·기대출·월 납입 가능 금액을 함께 봅니다. 거절 경험이 있어도 보완 포인트를 정리해 재상담하는 사례가 있습니다.',
    body: [
      '저신용 고객은 한도·금리 조건이 보수적으로 나올 수 있어, 차량 가격보다 월 납입 예산을 먼저 맞추는 편이 안전합니다.',
      '타사 거절 사유를 파악하면 서류·소득 증빙을 보완한 뒤 다시 검토할 여지가 생길 수 있습니다.',
      '모든 고객의 승인이나 특정 금리 조건을 보장하지는 않습니다.',
    ],
  },
  {
    id: 'budget-first',
    keyword: '중고차월납입',
    title: '차량부터 고르지 말고, 월 납입 예산부터 정해야 하는 이유',
    summary: '할부 상담에서는 차량 취향보다 감당 가능한 월 납입과 유지비가 먼저입니다. 예산에 맞는 차급을 좁힌 뒤 차량을 고르면 출고 후 부담을 줄일 수 있습니다.',
    body: [
      '같은 차종이라도 연식·주행거리·옵션에 따라 월 납입 구간이 달라집니다.',
      '보험료·취등록비·탁송비까지 포함한 총비용을 상담에서 함께 확인하는 것이 좋습니다.',
      '시뮬레이터 결과는 참고용이며, 실제 조건은 심사 후 안내됩니다.',
    ],
  },
  {
    id: 'extra-funds',
    keyword: '중고차여유자금',
    title: '차만 사면 끝날까요? 여유자금 상담이 필요한 경우',
    summary: '출고 직후 보험료·생활비·초기 비용이 부담될 수 있습니다. 필요 시에만 여유자금 상담을 함께 진행하며, 불필요한 금융상품을 권하지 않습니다.',
    body: [
      '추가자금은 모든 고객에게 제공되지 않으며, 소득·신용·심사 결과에 따라 가능 여부가 달라집니다.',
      '차량 구매와 무관한 고위험 대출을 권하지 않습니다.',
      '구체적인 금리·한도는 상담과 심사 후에만 안내합니다.',
    ],
  },
  {
    id: 'rejected-again',
    keyword: '할부거절재상담',
    title: '다른 곳에서 할부가 거절됐다면, 바로 포기하기 전에 확인할 것',
    summary: '거절 사유를 파악하면 서류·소득 증빙·차량 가격대를 조정해 다시 검토할 여지가 생길 수 있습니다. 반복 조회만으로 점수를 깎지 않도록 상담 순서를 잡는 것이 중요합니다.',
    body: [
      '거절 이력만으로 모든 금융사가 동일하게 거절하는 것은 아닙니다.',
      '월 납입 예산을 낮추거나 차급을 조정하면 가능한 조건이 달라질 수 있습니다.',
      '상담 신청만으로 즉시 신용조회가 진행되지는 않습니다.',
    ],
  },
  {
    id: 'nationwide-delivery',
    keyword: '중고차전국탁송',
    title: '지방에 살아도 상담·출고가 가능한가요?',
    summary: '전국 탁송이 가능하므로 거주 지역과 관계없이 상담을 시작할 수 있습니다. 탁송비·일정은 차량·지역에 따라 안내됩니다.',
    body: [
      '상담은 전화·카카오·웹 폼으로 진행하고, 출고 차량은 탁송으로 받으실 수 있습니다.',
      '차량 상태·사고 이력은 계약 전에 확인할 수 있도록 안내합니다.',
      '탁송 가능 여부와 비용은 차량·지역에 따라 달라질 수 있습니다.',
    ],
  },
];

export function InsightsSection() {
  const [openId, setOpenId] = useState<string | null>(articles[0].id);

  return (
    <section className="py-24 bg-slate-50" id="insights">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-brand-blue font-bold text-sm mb-4">
            <BookOpen className="w-5 h-5" />
            상담 가이드
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-4 tracking-tight">
            상담 전에 알아두면 좋은 이야기
          </h2>
          <p className="text-slate-600 text-lg break-keep">
            개인회생·저신용 중고차 할부에서 자주 묻는 내용을 짧게 정리했습니다.
          </p>
        </div>

        <div className="space-y-3">
          {articles.map((article) => {
            const open = openId === article.id;
            return (
              <article
                key={article.id}
                id={article.id}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm scroll-mt-24"
              >
                <button
                  type="button"
                  className="w-full text-left px-5 sm:px-6 py-5 flex items-start justify-between gap-4"
                  onClick={() => setOpenId(open ? null : article.id)}
                  aria-expanded={open}
                >
                  <div>
                    <span className="text-xs font-bold text-brand-orange">{article.keyword}</span>
                    <h3 className="text-lg sm:text-xl font-bold text-brand-navy mt-1 break-keep leading-snug">
                      {article.title}
                    </h3>
                    {!open && (
                      <p className="text-sm text-slate-500 mt-2 break-keep line-clamp-2">{article.summary}</p>
                    )}
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-slate-400 shrink-0 transition-transform ${open ? 'rotate-180 text-brand-blue' : ''}`}
                  />
                </button>
                {open && (
                  <div className="px-5 sm:px-6 pb-6 border-t border-slate-50 pt-4">
                    <p className="text-slate-600 font-medium mb-4 break-keep leading-relaxed">{article.summary}</p>
                    <ul className="space-y-3">
                      {article.body.map((line) => (
                        <li key={line} className="text-slate-600 text-sm leading-relaxed break-keep flex gap-2">
                          <span className="text-brand-blue font-bold">·</span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#contact"
                      className="inline-flex mt-6 px-5 py-2.5 rounded-xl text-sm font-bold bg-brand-navy text-white hover:bg-brand-navy-dark"
                    >
                      이 내용으로 상담 신청
                    </a>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
