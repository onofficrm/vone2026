import React from 'react';
import { PageHero } from '../components/PageHero';
import { InsightsSection } from '../components/InsightsSection';
import { CustomerTypeSection } from '../sections/CustomerTypeSection';
import { DocumentChecklist } from '../components/DocumentChecklist';
import { FinalCTASection } from '../sections/FinalCTASection';

export default function GuidePage() {
  return (
    <>
      <PageHero pageId="guide" />
      <InsightsSection />
      <CustomerTypeSection />
      <DocumentChecklist />
      <FinalCTASection />
    </>
  );
}
