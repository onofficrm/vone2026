import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';

export function ProcessSection() {
  return (
    <section className="py-24 bg-white" id="process">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-4 tracking-tight">상담부터 출고까지 어렵지 않습니다</h2>
          <p className="text-slate-600 text-lg">단비카의 투명하고 체계적인 진행 절차를 안내해 드립니다.</p>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-brand-blue/20 -translate-x-1/2" />
          <div className="space-y-8 md:space-y-12">
            {[
              { step: '1단계', title: '무료 상담 신청', desc: '전화, 카카오톡 또는 홈페이지 상담폼으로 신청합니다.' },
              { step: '2단계', title: '고객 조건 확인', desc: '개인회생 상태, 소득, 재직 상태와 월 납입 가능 금액을 확인합니다.' },
              { step: '3단계', title: '할부 조건 사전 검토', desc: '고객 조건에 따라 이용 가능한 금융 조건을 검토합니다.' },
              { step: '4단계', title: '차량 선택 및 확인', desc: '예산과 용도에 맞는 차량을 추천하고 차량 상태를 확인합니다.' },
              { step: '5단계', title: '계약 및 출고', desc: '계약 내용을 충분히 안내하고 고객이 동의한 후 출고를 진행합니다.' },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-12 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left w-full">
                  <div
                    className={`w-full bg-white p-6 rounded-2xl shadow-sm border border-brand-blue/10 relative ${
                      idx % 2 === 0 ? 'md:text-left' : 'md:text-right'
                    }`}
                  >
                    <span className="text-brand-orange font-bold text-sm mb-2 block">{item.step}</span>
                    <h3 className="text-xl font-bold text-brand-navy mb-3">{item.title}</h3>
                    <p className="text-slate-600 break-keep">{item.desc}</p>
                  </div>
                </div>
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-brand-blue rounded-full border-4 border-white items-center justify-center text-white font-bold z-10 shadow-sm">
                  {idx + 1}
                </div>
                <div className="md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 text-center">
          <p className="text-sm font-semibold text-slate-500 bg-slate-100 py-3 px-6 rounded-full inline-block break-keep">
            * 고객 동의 없이 계약이나 금융 심사를 임의로 진행하지 않습니다.
          </p>
          <div className="mt-6">
            <Button as={Link} to="/process" variant="outline">
              진행 과정 자세히 보기
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
