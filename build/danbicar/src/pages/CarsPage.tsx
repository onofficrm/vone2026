import React from 'react';
import { PageHero } from '../components/PageHero';
import { CarListSection } from '../components/CarListSection';
import { CompareSection } from '../components/CompareSection';
import { VehicleCheckGuide } from '../components/VehicleCheckGuide';
import { FinalCTASection } from '../sections/FinalCTASection';

export default function CarsPage() {
  return (
    <>
      <PageHero pageId="cars" />
      <CarListSection />
      <CompareSection />
      <VehicleCheckGuide />
      <FinalCTASection />
    </>
  );
}
