import React from 'react';
import { PageHero } from '../components/PageHero';
import { PaymentSimulator } from '../components/PaymentSimulator';
import { CompareSection } from '../components/CompareSection';
import { FinalCTASection } from '../sections/FinalCTASection';

export default function SimulatorPage() {
  return (
    <>
      <PageHero pageId="simulator" />
      <PaymentSimulator />
      <CompareSection />
      <FinalCTASection />
    </>
  );
}
