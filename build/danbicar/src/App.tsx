import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Seo } from './components/Seo';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { ToastHost } from './components/ToastHost';
import { SoftCtaBanner } from './components/SoftCtaBanner';
import { FloatingNav } from './components/FloatingNav';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CarsPage from './pages/CarsPage';
import SimulatorPage from './pages/SimulatorPage';
import DeliveryPage from './pages/DeliveryPage';
import GuidePage from './pages/GuidePage';
import ReviewsPage from './pages/ReviewsPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import StatusPage from './pages/StatusPage';
import ProcessPage from './pages/ProcessPage';
import FundsPage from './pages/FundsPage';
import PrivacyPage from './pages/PrivacyPage';
import DocumentsPage from './pages/DocumentsPage';

/** 예전 #앵커 링크 → 독립 URL */
const HASH_REDIRECTS: Record<string, string> = {
  '#about': '/about',
  '#simulator': '/simulator',
  '#delivery': '/delivery',
  '#insights': '/guide',
  '#reviews': '/reviews',
  '#contact': '/contact',
  '#status-lookup': '/status',
  '#process': '/process',
  '#process-video': '/process',
  '#timeline': '/process',
  '#privacy': '/privacy',
  '#funds': '/funds',
  '#cars': '/cars',
  '#faq': '/faq',
  '#guide': '/guide',
};

function HashRedirect() {
  const location = useLocation();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && HASH_REDIRECTS[hash]) {
      window.location.replace(HASH_REDIRECTS[hash]);
    }
  }, [location]);
  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppShell() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-gray selection:bg-brand-blue selection:text-white pb-24 lg:pb-0">
      <Seo />
      <ScrollToTop />
      <HashRedirect />
      <ToastHost />
      <SoftCtaBanner />
      <SiteHeader />
      <main className="flex-grow pt-[4.5rem]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/simulator" element={<SimulatorPage />} />
          <Route path="/delivery" element={<DeliveryPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/funds" element={<FundsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <SiteFooter />
      <FloatingNav />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
