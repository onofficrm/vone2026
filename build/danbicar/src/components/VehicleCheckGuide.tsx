import React from 'react';
import { SearchCheck, FileSearch, Truck, ShieldCheck } from 'lucide-react';

const steps = [
  {
    icon: SearchCheck,
    title: '차량 상태 확인',
    desc: '주행거리, 외관·실내 상태, 정비 이력을 기준으로 상담 전에 확인할 항목을 정리합니다.',
  },
  {
    icon: FileSearch,
    title: '사고·성능 자료',
    desc: '가능하면 성능점검기록부와 사고 이력 자료를 함께 확인한 뒤 계약 여부를 결정합니다.',
  },
  {
    icon: ShieldCheck,
    title: '보험·이전 안내',
    desc: '명의 이전, 보험 가입, 취등록비 등 출고 전 필수 절차를 단계별로 안내합니다.',
  },
  {
    icon: Truck,
    title: '전국 탁송',
    desc: '거주 지역과 관계없이 탁송으로 출고를 진행할 수 있으며, 일정은 상담 시 확정합니다.',
  },
];

export function VehicleCheckGuide() {
  return (
    <section className="py-24 bg-white" id="vehicle-check">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-4 tracking-tight">
            계약 전에 차량 상태를 확인할 수 있습니다
          </h2>
          <p className="text-slate-600 text-lg break-keep">
            급하게 계약하지 않습니다. 성능과 이력을 확인한 뒤 고객이 동의하면 다음 단계로 진행합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {steps.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex gap-4 p-6 rounded-2xl border border-slate-100 bg-slate-50/80 hover:bg-white hover:border-brand-blue/20 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-brand-blue flex items-center justify-center shrink-0 shadow-sm">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-brand-navy mb-2">{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed break-keep">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-slate-500 mt-10 break-keep">
          * 상담 신청만으로 차량 계약이나 금융 심사가 자동 진행되지 않습니다.
        </p>
      </div>
    </section>
  );
}
