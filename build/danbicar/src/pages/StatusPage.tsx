import React from 'react';
import { PageHero } from '../components/PageHero';
import { StatusLookupSection } from '../components/StatusLookupSection';
import { ConsultationStatusSection } from '../components/ConsultationStatusSection';
import { FinalCTASection } from '../sections/FinalCTASection';

export default function StatusPage() {
  return (
    <>
      <PageHero pageId="status" />
      <StatusLookupSection />
      <ConsultationStatusSection />
      <FinalCTASection />
    </>
  );
}
