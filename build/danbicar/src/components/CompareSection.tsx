import React from 'react';
import { ArrowRight, XCircle, CheckCircle2 } from 'lucide-react';

const beforeItems = [
  '신용점수만 보고 바로 거절',
  '거절 사유를 구체적으로 안내받지 못함',
  '차량부터 고르다 월 납입 부담이 커짐',
  '상담만 해도 계약·조회가 진행될까 불안',
];

const afterItems = [
  '소득·회생 단계·월 납입 예산을 먼저 확인',
  '거절 사유를 보완할 포인트를 함께 정리',
  '감당 가능한 차급부터 추천',
  '상담 신청만으로 계약·심사가 자동 진행되지 않음',
];

export function CompareSection() {
  return (
    <section className="py-24 bg-white" id="compare">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-4 tracking-tight">
            한 번 거절됐어도, 상담 방식은 달라질 수 있습니다
          </h2>
          <p className="text-slate-600 text-lg break-keep">
            결과를 보장하지는 않습니다. 다만 같은 상황이라도 확인 순서를 바꾸면 선택지가 열릴 수 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-stretch">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <p className="text-sm font-bold text-slate-500 mb-4">흔한 거절 경험</p>
            <ul className="space-y-3">
              {beforeItems.map((item) => (
                <li key={item} className="flex gap-3 text-slate-600 text-sm break-keep">
                  <XCircle className="w-5 h-5 text-slate-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-lg">
              <ArrowRight className="w-6 h-6" />
            </div>
          </div>

          <div className="rounded-3xl border border-brand-blue/20 bg-brand-light/50 p-6 sm:p-8">
            <p className="text-sm font-bold text-brand-blue mb-4">단비카 재상담 접근</p>
            <ul className="space-y-3">
              {afterItems.map((item) => (
                <li key={item} className="flex gap-3 text-slate-700 text-sm font-medium break-keep">
                  <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center mt-10">
          <a
            href="#contact"
            className="inline-flex px-8 py-4 rounded-xl font-bold bg-brand-navy text-white hover:bg-brand-navy-dark transition-colors"
          >
            거절 후 재상담 신청하기
          </a>
        </div>
      </div>
    </section>
  );
}
