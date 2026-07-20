import React from 'react';
import { Phone } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { ContactForm } from '../components/ContactForm';
import { ResponseHoursNotice } from '../components/ResponseHoursNotice';
import { KakaoCta } from '../components/ui';
import { Button } from '../components/ui';

export default function ContactPage() {
  return (
    <>
      <PageHero pageId="contact" />
      <section className="py-20 bg-brand-light/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ResponseHoursNotice className="mb-8" />
          <ContactForm />
          <p className="mt-4 text-center text-sm text-slate-500 break-keep">
            * 상담 신청만으로 차량 계약이나 금융상품 가입이 진행되지 않습니다.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
            <Button as="a" href="tel:15994950" variant="outline" icon={Phone}>
              전화상담 1599-4950
            </Button>
            <KakaoCta>카카오톡 빠른 상담</KakaoCta>
          </div>
        </div>
      </section>
    </>
  );
}
