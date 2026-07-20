import React from 'react';
import { PageHero } from '../components/PageHero';
import { ReviewSection } from '../components/ReviewSection';
import { ConsultationStatusSection } from '../components/ConsultationStatusSection';
import { LiveRollingSection } from '../components/LiveRollingSection';
import { FinalCTASection } from '../sections/FinalCTASection';

export default function ReviewsPage() {
  return (
    <>
      <PageHero pageId="reviews" />
      <ReviewSection />
      <ConsultationStatusSection />
      <LiveRollingSection />
      <FinalCTASection />
    </>
  );
}
