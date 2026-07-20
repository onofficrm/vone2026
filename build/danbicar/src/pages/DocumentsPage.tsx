import React from 'react';
import { PageHero } from '../components/PageHero';
import { DocumentChecklist } from '../components/DocumentChecklist';
import { FinalCTASection } from '../sections/FinalCTASection';

export default function DocumentsPage() {
  return (
    <>
      <PageHero pageId="documents" />
      <DocumentChecklist />
      <FinalCTASection />
    </>
  );
}
