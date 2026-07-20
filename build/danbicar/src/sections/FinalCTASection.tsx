import React from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { Button, KakaoCta } from '../components/ui';

export function FinalCTASection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 bg-brand-navy rounded-3xl overflow-hidden shadow-2xl">
          <div className="w-full lg:w-1/2 h-64 lg:h-auto self-stretch">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&fm=webp"
              alt="상담사와 고객"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="w-full lg:w-1/2 p-8 sm:p-12 text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight leading-snug break-keep">
              신용 문제 때문에 필요한 차량까지 포기하지 마세요
            </h2>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed break-keep">
              혼자서 여러 금융사를 알아보거나 반복해서 신용조회를 진행하기 전에 현재 상황에서 확인할 수 있는 방법부터 상담받아 보세요.
              단비카가 차량 선택, 할부 조건, 월 납입 계획과 추가 필요자금 상담까지 함께 확인해 드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button as={Link} to="/contact" variant="primary" className="!bg-white !text-brand-navy hover:!bg-slate-100 flex-1">
                무료 상담 신청
              </Button>
              <Button as="a" href="tel:15994950" variant="outline" icon={Phone} className="border-white/30 text-white hover:bg-white/10 flex-1">
                1599-4950 전화상담
              </Button>
              <KakaoCta className="flex-1">카카오톡 상담</KakaoCta>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
