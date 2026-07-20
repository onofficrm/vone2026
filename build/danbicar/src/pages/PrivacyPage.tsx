import React from 'react';
import { PageHero } from '../components/PageHero';
import { PrivacyNoticeSection } from '../components/PrivacyNoticeSection';

export default function PrivacyPage() {
  return (
    <>
      <PageHero pageId="privacy" />
      <PrivacyNoticeSection />
    </>
  );
}
