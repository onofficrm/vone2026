import React from 'react';
import { PlayCircle } from 'lucide-react';

/**
 * 실제 유튜브 ID가 생기면 VIDEO_ID 만 교체하면 됩니다.
 * 비어 있으면 프로세스 카드 UI로 대체합니다.
 */
const VIDEO_ID = ''; // 예: 'dQw4w9WgXcQ'

const steps = [
  { step: '01', title: '상담 신청', desc: '이름·연락처·희망 시간만 남겨도 접수됩니다.' },
  { step: '02', title: '조건 확인', desc: '회생 단계·소득·월 납입 예산을 함께 확인합니다.' },
  { step: '03', title: '차량 매칭', desc: '예산에 맞는 차급을 추천하고 상태를 안내합니다.' },
  { step: '04', title: '계약·출고', desc: '동의 후 계약하고 전국 탁송으로 출고합니다.' },
];

export function ProcessVideoSection() {
  return (
    <section className="py-24 bg-slate-900 text-white" id="process-video">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-brand-orange font-bold text-sm mb-4">
            <PlayCircle className="w-5 h-5" />
            상담부터 출고까지
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">1분 만에 보는 단비카 진행 과정</h2>
          <p className="text-slate-300 text-lg break-keep">과장 없는 프로세스만 안내합니다. 상담 신청만으로 계약이 진행되지 않습니다.</p>
        </div>

        {VIDEO_ID ? (
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-10 bg-black">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0`}
              title="단비카 상담 출고 안내"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {steps.map((item) => (
              <div key={item.step} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-brand-orange font-bold text-sm mb-2">{item.step}</p>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-slate-300 text-sm break-keep leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        )}

        <div className="text-center">
          <a
            href="#contact"
            className="inline-flex px-8 py-4 rounded-xl font-bold bg-brand-orange hover:bg-orange-700 transition-colors"
          >
            지금 상담 신청하기
          </a>
        </div>
      </div>
    </section>
  );
}
