import React from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { Button } from '../components/ui';
import { FinalCTASection } from '../sections/FinalCTASection';

export default function FundsPage() {
  return (
    <>
      <PageHero pageId="funds" />
      <section className="py-20 bg-sky-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6 text-lg text-slate-600 break-keep leading-relaxed">
          <p>중고차 구매 시 차량 가격 외에 보험료, 취등록비, 이전비, 정비비 등이 발생할 수 있습니다.</p>
          <p>
            단비카는 소득과 월 납입 가능 금액을 확인한 뒤 차량 구매 비용과 <strong className="text-brand-navy">추가 필요자금 상담</strong>을
            함께 진행합니다.
          </p>
          <p>모든 고객에게 추가자금이 제공되는 것은 아니며, 금융사 심사 결과에 따라 달라집니다.</p>
          <Button as={Link} to="/contact" variant="primary" className="mt-4">
            차량＋자금 조건 확인하기
          </Button>
        </div>
      </section>
      <FinalCTASection />
    </>
  );
}
