import React from 'react';
import { PageHero } from '../components/PageHero';
import { ProcessSection } from '../sections/ProcessSection';
import { ProcessVideoSection } from '../components/ProcessVideoSection';
import { TrustTimelineSection } from '../components/TrustTimelineSection';
import { FinalCTASection } from '../sections/FinalCTASection';

export default function ProcessPage() {
  return (
    <>
      <PageHero pageId="process" />
      <ProcessSection />
      <ProcessVideoSection />
      <TrustTimelineSection />
      <FinalCTASection />
    </>
  );
}
