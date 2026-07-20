import React from 'react';
import { PageHero } from '../components/PageHero';
import { RegionalDeliverySection } from '../components/RegionalDeliverySection';
import { FinalCTASection } from '../sections/FinalCTASection';

export default function DeliveryPage() {
  return (
    <>
      <PageHero pageId="delivery" />
      <RegionalDeliverySection />
      <FinalCTASection />
    </>
  );
}
