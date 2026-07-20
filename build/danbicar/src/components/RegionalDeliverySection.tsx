import React from 'react';
import { MapPin, Truck } from 'lucide-react';

const regions = [
  { area: '서울·경기·인천', note: '당일~익일 탁송 상담 가능' },
  { area: '충청·강원', note: '일정 조율 후 전국 탁송' },
  { area: '경상·전라', note: '출고지 기준 일정 안내' },
  { area: '제주·도서', note: '선박·항공 연계 별도 상담' },
];

export function RegionalDeliverySection() {
  return (
    <section className="py-24 bg-brand-navy text-white" id="delivery">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-brand-light font-bold text-sm mb-4">
            <Truck className="w-5 h-5" />
            전국 탁송
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">거주 지역과 관계없이 상담·출고가 가능합니다</h2>
          <p className="text-slate-300 text-lg break-keep">
            차량 확인 후 고객 일정에 맞춰 탁송을 진행합니다. 정확한 일정과 비용은 상담 시 안내합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {regions.map((item) => (
            <div
              key={item.area}
              className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-blue/30 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-brand-light" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">{item.area}</h3>
                <p className="text-slate-300 text-sm break-keep">{item.note}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="/contact"
            className="inline-flex px-8 py-4 rounded-xl font-bold bg-white text-brand-navy hover:bg-slate-100 transition-colors"
          >
            우리 지역 탁송 일정 상담하기
          </a>
          <p className="text-xs text-slate-400 mt-5 break-keep">
            * 탁송 가능 여부와 소요 시간은 차량 위치·기상·물류 일정에 따라 달라질 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
