import React from 'react';
import { useHomeFeed, toneClass } from '../lib/homeFeed';

export function ConsultationStatusSection() {
  const { feed } = useHomeFeed();

  return (
    <section className="py-24 bg-brand-light/50" id="status">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-4 tracking-tight">단비카 상담 진행 현황</h2>
          <p className="text-slate-600 text-lg">최근 단비카를 통해 상담을 진행하신 고객님들의 사례입니다.</p>
          {feed.updatedAt && (
            <p className="text-xs text-slate-400 mt-2">업데이트: {feed.updatedAt}{feed.isSample ? ' · 샘플 데이터' : ''}</p>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {feed.consultations.map((item, idx) => (
            <div key={`${item.name}-${idx}`} className="bg-white rounded-2xl border border-brand-blue/10 p-5 text-left shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg text-brand-navy">{item.name}</span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${toneClass(item.tone)}`}>{item.status}</span>
              </div>
              <div className="space-y-2 text-sm text-slate-600 font-medium">
                <p className="flex justify-between border-b border-slate-100 pb-2">
                  <span>고객 유형</span>
                  <span className="text-slate-800">{item.type}</span>
                </p>
                <p className="flex justify-between pt-1">
                  <span>관심 차량</span>
                  <span className="text-slate-800">{item.car}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-slate-400 mt-8 break-keep">
          * 개인정보 보호를 위해 성명은 일부만 표시합니다. 관리자는 home-feed.json으로 목록을 갱신할 수 있습니다.
        </p>
      </div>
    </section>
  );
}
