import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  CarFront,
  FileWarning,
  TrendingDown,
  CreditCard,
  Briefcase,
  PiggyBank,
  Users,
  Calculator,
  HandCoins,
  ClipboardList,
} from 'lucide-react';
import { LiveRollingSection } from '../components/LiveRollingSection';
import { StatisticsSection } from '../components/StatisticsSection';
import { PaymentSimulator } from '../components/PaymentSimulator';
import { DocumentChecklist } from '../components/DocumentChecklist';
import { ContactForm } from '../components/ContactForm';
import { ResponseHoursNotice } from '../components/ResponseHoursNotice';
import { VehicleCheckGuide } from '../components/VehicleCheckGuide';
import { SituationAnchors } from '../components/SituationAnchors';
import { RegionalDeliverySection } from '../components/RegionalDeliverySection';
import { InsightsSection } from '../components/InsightsSection';
import { ConsultationStatusSection } from '../components/ConsultationStatusSection';
import { ReviewSection } from '../components/ReviewSection';
import { CarListSection } from '../components/CarListSection';
import { CompareSection } from '../components/CompareSection';
import { StatusLookupSection } from '../components/StatusLookupSection';
import { ProcessVideoSection } from '../components/ProcessVideoSection';
import { TrustTimelineSection } from '../components/TrustTimelineSection';
import { PrivacyNoticeSection } from '../components/PrivacyNoticeSection';
import { Button, Card, KakaoCta } from '../components/ui';
import { ProcessSection } from '../sections/ProcessSection';
import { CustomerTypeSection } from '../sections/CustomerTypeSection';
import { FAQSection } from '../sections/FAQSection';
import { FinalCTASection } from '../sections/FinalCTASection';

export default function HomePage() {
  return (
    <>
      <section className="bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&fm=webp')] bg-cover bg-center opacity-30 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-32 relative z-10 flex flex-col items-start text-left">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-brand-orange/20 text-orange-200 border border-orange-500/30 text-xs font-semibold backdrop-blur-sm">
              개인회생 고객 상담
            </span>
            <span className="px-3 py-1 rounded-full bg-brand-blue/20 text-sky-200 border border-sky-500/30 text-xs font-semibold backdrop-blur-sm">
              저신용 고객 상담
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-slate-200 border border-white/20 text-xs font-semibold backdrop-blur-sm hidden sm:inline-block">
              할부 거절 고객 재상담
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-slate-200 border border-white/20 text-xs font-semibold backdrop-blur-sm">
              상담비 무료
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.15] tracking-tight mb-6 break-keep max-w-3xl">
            <span className="block mb-2 text-brand-light/90 font-medium text-3xl sm:text-4xl">개인회생 중이어도</span>
            내 상황에 맞는 <br className="hidden sm:block" />
            <span className="text-brand-orange">중고차 할부</span>를 찾아드립니다
          </h1>
          <div className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl break-keep font-medium space-y-3 leading-relaxed">
            <p className="text-white font-semibold">신용점수만 보고 포기하지 않습니다.</p>
            <p>
              현재 소득, 개인회생 진행 상태, 차량 용도와 월 납입 가능 금액을 종합적으로 확인하여 고객에게 적합한 차량 구매 방법을
              안내합니다.
            </p>
            <p>차량 구매뿐 아니라 현재 자금 상황과 추가 필요자금 상담도 함께 진행합니다.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-6">
            <Button as={Link} to="/contact" variant="accent" className="w-full sm:w-auto text-base sm:text-lg py-4 px-8">
              내 조건 무료 확인하기
            </Button>
            <Button
              as="a"
              href="tel:15994950"
              variant="outline"
              icon={Phone}
              className="w-full sm:w-auto text-base sm:text-lg py-4 px-8 !bg-white/10 !text-white !border-white/30 hover:!bg-white/20"
            >
              전화로 바로 상담하기
            </Button>
            <KakaoCta className="w-full sm:w-auto text-base sm:text-lg py-4 px-8">카카오톡으로 상담하기</KakaoCta>
          </div>
          <p className="text-sm text-slate-400 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm inline-block">
            * 상담 신청만으로 차량 계약이나 금융상품 가입이 진행되지 않습니다.
          </p>
        </div>
      </section>

      <SituationAnchors />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-4 tracking-tight">
              혹시 이런 이유로 차량 구매를 포기하고 계신가요?
            </h2>
            <p className="text-slate-600 text-lg">혼자 고민하지 마세요. 많은 분들이 같은 고민으로 단비카를 찾습니다.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {(
              [
                [FileWarning, '개인회생 중이라 자동차 할부가 불가능할 것 같다.'],
                [TrendingDown, '신용점수가 낮아 금융사에서 거절당했다.'],
                [CreditCard, '기존 대출이 있어 추가 할부가 걱정된다.'],
                [Briefcase, '직장은 있지만 신용 문제로 심사가 어렵다.'],
                [CarFront, '출퇴근이나 생업에 꼭 차량이 필요하다.'],
                [PiggyBank, '차량 구매 후 보험료와 생활자금이 걱정된다.'],
              ] as const
            ).map(([Icon, text], idx) => (
              <Card key={idx} className="flex flex-col items-start text-left bg-slate-50 hover:bg-white">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-slate-600 flex items-center justify-center mb-5 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-lg font-bold text-brand-navy break-keep leading-snug">{text}</p>
              </Card>
            ))}
          </div>
          <div className="mt-16 text-center bg-brand-light/60 rounded-2xl p-8 sm:p-10 border border-brand-blue/10">
            <p className="text-xl sm:text-2xl font-bold text-brand-navy mb-3">단비카는 단순히 신용점수만 확인하지 않습니다.</p>
            <p className="text-lg text-brand-blue font-semibold">고객의 현재 상황을 먼저 듣고 가능한 방법을 함께 찾아드립니다.</p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-brand-navy text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">단비카가 고객의 상황을 먼저 확인하는 이유</h2>
            <p className="text-slate-300 text-lg">고객 맞춤형 플랜으로 안심하고 차량을 구매할 수 있습니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
            {(
              [
                [Users, '개인회생·저신용 전문 상담', '개인회생 진행 단계, 변제 현황, 소득과 재직 상태 등을 확인하여 고객 상황에 맞는 상담을 진행합니다.', 'blue'],
                [Calculator, '월 납입금 중심 차량 추천', '무조건 비싼 차량을 권하지 않고 고객이 감당할 수 있는 월 납입금과 유지비를 기준으로 차량을 추천합니다.', 'orange'],
                [HandCoins, '차량과 자금 계획 동시 상담', '차량 가격뿐 아니라 취등록비, 보험료, 초기 비용과 추가 필요자금까지 함께 검토합니다.', 'blue'],
                [ClipboardList, '출고까지 전 과정 안내', '상담, 조건 확인, 차량 선택, 성능 확인, 계약과 출고까지 담당자가 단계별로 안내합니다.', 'orange'],
              ] as const
            ).map(([Icon, title, desc, tone], idx) => (
              <Card key={idx} className="bg-white/5 border-white/10 text-white backdrop-blur-sm flex flex-col sm:flex-row gap-6 items-start">
                <div
                  className={`w-14 h-14 shrink-0 rounded-xl ${tone === 'blue' ? 'bg-brand-blue' : 'bg-brand-orange'} flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">{title}</h3>
                  <p className="text-slate-300 leading-relaxed break-keep">{desc}</p>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button as={Link} to="/contact" variant="accent" className="w-full sm:w-auto text-lg py-4 px-8">
              내 조건 상담받기
            </Button>
            <Button as={Link} to="/about" variant="outline" className="w-full sm:w-auto text-lg py-4 px-8 !bg-white/10 !text-white !border-white/30">
              소개 자세히 보기
            </Button>
          </div>
        </div>
      </section>

      <ProcessSection />
      <ProcessVideoSection />
      <TrustTimelineSection />
      <CustomerTypeSection />
      <ConsultationStatusSection />
      <StatusLookupSection />
      <LiveRollingSection />
      <StatisticsSection />
      <CarListSection />
      <PaymentSimulator />
      <CompareSection />
      <DocumentChecklist />
      <VehicleCheckGuide />
      <RegionalDeliverySection />
      <InsightsSection />

      <section className="py-24 bg-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-6 tracking-tight leading-[1.3] break-keep">
              차만 구입하면 끝일까요?
              <br />
              <span className="text-brand-blue">출고 이후의 자금 상황</span>까지 함께 생각합니다
            </h2>
            <p className="text-lg text-slate-600 mb-8 break-keep leading-relaxed">
              단비카는 고객의 소득과 월 납입 가능 금액을 확인한 후 차량 구매 비용과 추가 필요자금 상담을 함께 진행합니다.
            </p>
            <Button as={Link} to="/funds" variant="primary" className="py-4 text-lg">
              여유자금 상담 자세히 보기
            </Button>
          </div>
        </div>
      </section>

      <ReviewSection />
      <FAQSection />
      <PrivacyNoticeSection />
      <FinalCTASection />

      <section className="py-24 bg-brand-light/30 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-4 tracking-tight">30초 간편 상담 신청</h2>
            <p className="text-slate-600 text-lg">
              복잡한 서류 없이 기본정보를 남겨주시면 상담사가 고객의 상황을 확인한 후 연락드립니다.
            </p>
          </div>
          <ResponseHoursNotice className="mb-8" />
          <ContactForm />
          <p className="mt-4 text-center text-sm text-slate-500 break-keep">
            * 상담 신청만으로 차량 계약이나 금융상품 가입이 진행되지 않습니다.
          </p>
        </div>
      </section>
    </>
  );
}
