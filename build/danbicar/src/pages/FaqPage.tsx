import React from 'react';
import { PageHero } from '../components/PageHero';
import { FAQSection } from '../sections/FAQSection';
import { FinalCTASection } from '../sections/FinalCTASection';

export default function FaqPage() {
  return (
    <>
      <PageHero pageId="faq" />
      <FAQSection />
      <FinalCTASection />
    </>
  );
}
