import React from 'react';
import { CalendarClock } from 'lucide-react';

const days = [
  {
    day: 'Day 1',
    title: '상담 접수',
    desc: '이름·연락처·상황만 남겨도 접수됩니다. 상담만으로 계약·신용조회는 진행되지 않습니다.',
  },
  {
    day: 'Day 1–2',
    title: '조건 확인',
    desc: '회생 단계·소득·월 납입 예산을 확인하고 가능한 금융 방향을 안내합니다.',
  },
  {
    day: 'Day 2–4',
    title: '차량 매칭',
    desc: '예산에 맞는 차급을 추천하고 상태·탁송 가능 여부를 함께 확인합니다.',
  },
  {
    day: 'Day 3–7',
    title: '계약·출고',
    desc: '조건을 충분히 확인한 뒤 고객 동의 시에만 계약하고 전국 탁송으로 출고합니다.',
  },
];

export function TrustTimelineSection() {
  return (
    <section className="py-24 bg-white" id="timeline">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-brand-blue font-bold text-sm mb-4">
            <CalendarClock className="w-5 h-5" />
            진행 일정 예시
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-4 tracking-tight">
            접수부터 출고까지, 이렇게 진행됩니다
          </h2>
          <p className="text-slate-600 text-lg break-keep">
            실제 일정은 서류·심사·차량 상태에 따라 달라질 수 있습니다. 아래는 일반적인 안내 예시입니다.
          </p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {days.map((item, idx) => (
            <li
              key={item.day}
              className="relative rounded-2xl border border-brand-blue/15 bg-brand-light/30 p-6"
            >
              <p className="text-brand-orange font-bold text-sm mb-2">
                {idx + 1}. {item.day}
              </p>
              <h3 className="text-lg font-bold text-brand-navy mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 break-keep leading-relaxed">{item.desc}</p>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-center text-sm text-slate-500 break-keep">
          * 일정은 고객 조건과 금융사 심사 결과에 따라 앞당겨지거나 길어질 수 있습니다.
        </p>
      </div>
    </section>
  );
}
