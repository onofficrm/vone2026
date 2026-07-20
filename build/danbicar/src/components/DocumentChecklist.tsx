import React, { useState } from 'react';
import { CheckCircle2, FileText } from 'lucide-react';

const tabs = [
  {
    id: 'employee',
    title: '직장인',
    items: [
      '신분증',
      '건강보험 자격득실 확인서 또는 재직증명서',
      '소득금액증명원 또는 원천징수영수증',
      '통장 거래내역 (필요 시)',
    ],
  },
  {
    id: 'biz',
    title: '사업자·프리랜서',
    items: [
      '신분증',
      '사업자등록증 (해당 시)',
      '소득금액증명원 또는 부가세과세표준증명',
      '사업용·급여 통장 거래내역',
    ],
  },
  {
    id: 'rehab',
    title: '개인회생',
    items: [
      '신분증',
      '개인회생 관련 결정·인가 서류',
      '변제금 납부 내역',
      '소득·재직 증빙 (직장인/사업자 기준과 동일)',
    ],
  },
  {
    id: 'common',
    title: '공통·출고',
    items: [
      '운전면허증 (보험·명의 이전용)',
      '주민등록등본 (필요 시)',
      '기존 할부·대출 내역 파악용 자료',
      '희망 차량·월 납입 예산 메모',
    ],
  },
] as const;

export function DocumentChecklist() {
  const [active, setActive] = useState(0);
  const current = tabs[active];

  return (
    <section className="py-24 bg-slate-50" id="documents">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-brand-blue font-bold text-sm mb-4">
            <FileText className="w-5 h-5" />
            준비 서류
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-4 tracking-tight">
            상담 전에 이 정도만 준비하면 됩니다
          </h2>
          <p className="text-slate-600 text-lg break-keep">
            처음부터 모든 서류가 필요하지 않습니다. 상황에 맞는 목록만 확인해 보세요.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab, idx) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(idx)}
              className={`px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                active === idx
                  ? 'bg-brand-navy text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-blue/40'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-10 shadow-sm">
          <h3 className="text-xl font-bold text-brand-navy mb-6">{current.title} 기준</h3>
          <ul className="space-y-4">
            {current.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-slate-700 font-medium break-keep">
                <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-slate-500 mt-8 break-keep leading-relaxed">
            * 상담 신청 단계에서는 서류 제출이 필수가 아닙니다. 담당자가 필요한 항목만 안내합니다.
          </p>
          <a
            href="#contact"
            className="inline-flex mt-6 px-6 py-3 rounded-xl font-bold bg-brand-navy text-white hover:bg-brand-navy-dark transition-colors"
          >
            서류 준비 전에도 상담 신청하기
          </a>
        </div>
      </div>
    </section>
  );
}
