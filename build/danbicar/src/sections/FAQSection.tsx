import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: '개인회생 중에도 중고차 할부가 가능한가요?',
    a: '네, 가능합니다. 다만 확정적으로 승인된다고 말씀드릴 수는 없으며, 개인회생 진행 단계(인가 전/후), 변제금 납부 내역, 현재 소득 등 고객님의 세부 조건에 따라 가능한 금융사와 한도가 달라질 수 있습니다.',
  },
  {
    q: '개인회생 인가 전과 인가 후의 조건이 다른가요?',
    a: '인가 전이거나 납입 횟수가 적은 경우보다, 인가 결정을 받고 일정 회차 이상 납부하신 경우 선택할 수 있는 금융사와 한도 조건이 더 유리해질 수 있습니다. 정확한 조건은 상담을 통해 확인해 드립니다.',
  },
  {
    q: '신용점수가 낮아도 상담할 수 있나요?',
    a: '물론입니다. 단비카는 저신용 고객님을 위한 다양한 예외 승인 플랜을 보유하고 있습니다. 금융사 심사 기준에 따라 결과는 다를 수 있지만, 최선의 방법을 함께 찾아드립니다.',
  },
  {
    q: '다른 곳에서 할부가 거절됐는데 다시 확인할 수 있나요?',
    a: '거절된 이유를 분석하여 보완할 수 있는 긍정적인 요소를 어필하면 재심사에서 승인되는 경우가 있습니다. 포기하지 마시고 전문 상담을 받아보시길 권장합니다.',
  },
  {
    q: '직장인이 아니어도 상담할 수 있나요?',
    a: '사업자, 프리랜서, 주부, 일용직 고객님도 통장 수령 내역이나 재산세 납부 내역, 신용카드 사용 내역 등을 통해 소득을 증빙할 수 있는 방법이 있습니다. 고객님의 조건에 따라 다르게 적용됩니다.',
  },
  {
    q: '초기 비용 없이 차량을 구입할 수 있나요?',
    a: '조건에 따라 차량 대금은 물론 취등록비, 보험료까지 전액 할부로 진행이 가능할 수 있습니다. 단, 모든 고객에게 적용되는 것은 아니며 금융사 심사 결과에 따라 달라집니다.',
  },
  {
    q: '차량 구매와 추가 필요자금 상담을 함께 받을 수 있나요?',
    a: '네, 차량 구매 비용 외에 생활자금 등 여유자금 확보가 필요하신 경우 함께 상담해 드립니다. 한도는 고객님의 조건과 금융사 심사 기준에 따라 결정됩니다.',
  },
  {
    q: '상담하면 신용조회가 바로 진행되나요?',
    a: '아닙니다. 상담을 신청하신다고 해서 바로 신용조회가 진행되거나 등급이 하락하지 않습니다. 가조회를 통해 안전하게 가능 여부만 먼저 확인하실 수 있습니다.',
  },
  {
    q: '상담 신청 후 반드시 계약해야 하나요?',
    a: '아닙니다. 상담 신청만으로 차량 계약이나 금융상품 가입이 진행되지 않으며, 모든 조건을 꼼꼼히 확인하신 후 고객님께서 최종적으로 결정하시면 됩니다.',
  },
  {
    q: '전국 어디에서나 차량을 받을 수 있나요?',
    a: '네, 전국 탁송이 가능하므로 거주 지역에 상관없이 상담 및 출고를 진행하실 수 있습니다.',
  },
  {
    q: '필요한 서류는 무엇인가요?',
    a: '기본적으로 신분증이 필요하며, 직군이나 현재 상황에 따라 추가 서류가 필요할 수 있습니다. 상담 시 상세히 안내해 드립니다.',
  },
  {
    q: '상담 비용이 있나요?',
    a: '단비카의 모든 상담은 무료로 진행됩니다. 부담 없이 문의해 주시기 바랍니다.',
  },
];

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-4 tracking-tight">자주 묻는 질문</h2>
          <p className="text-slate-600 text-lg">고객님들이 가장 궁금해하시는 내용을 모았습니다.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:border-brand-blue/30 transition-colors">
              <button
                type="button"
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              >
                <span className="font-bold text-brand-navy text-lg pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-6 h-6 text-slate-400 shrink-0 transition-transform duration-300 ${
                    openIdx === idx ? 'rotate-180 text-brand-blue' : ''
                  }`}
                />
              </button>
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openIdx === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-6 pt-2 text-slate-600 leading-relaxed break-keep font-medium border-t border-slate-50 mt-2 bg-slate-50/50">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
