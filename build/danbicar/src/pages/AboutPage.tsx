import React from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { Card, Button } from '../components/ui';
import { Users, Calculator, HandCoins, ClipboardList } from 'lucide-react';
import { CustomerTypeSection } from '../sections/CustomerTypeSection';
import { FinalCTASection } from '../sections/FinalCTASection';

export default function AboutPage() {
  return (
    <>
      <PageHero pageId="about" />
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-6">
          {(
            [
              [Users, '개인회생·저신용 전문 상담', '진행 단계와 소득·재직 상태를 기준으로 상담합니다.'],
              [Calculator, '월 납입 중심 추천', '감당 가능한 납입·유지비를 먼저 맞춥니다.'],
              [HandCoins, '자금 계획 동시 상담', '보험·이전비·여유자금까지 함께 검토합니다.'],
              [ClipboardList, '출고까지 안내', '상담부터 계약·출고까지 단계별로 안내합니다.'],
            ] as const
          ).map(([Icon, title, desc]) => (
            <Card key={title} className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-brand-light text-brand-blue flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-brand-navy mb-2">{title}</h2>
                <p className="text-slate-600 break-keep">{desc}</p>
              </div>
            </Card>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button as={Link} to="/contact" variant="accent">
            내 조건 상담받기
          </Button>
        </div>
      </section>
      <CustomerTypeSection />
      <FinalCTASection />
    </>
  );
}
