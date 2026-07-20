import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, CarFront, ShieldCheck, Clock, ChevronRight, ChevronDown, FileWarning, TrendingDown, CreditCard, Briefcase, PiggyBank, Users, Calculator, HandCoins, ClipboardList, Wallet, MapPin, CalendarDays, Home, ArrowUp, X, MessageSquareText } from 'lucide-react';
import { LiveRollingSection } from './components/LiveRollingSection';
import { StatisticsSection } from './components/StatisticsSection';
import { PaymentSimulator } from './components/PaymentSimulator';
import { DocumentChecklist } from './components/DocumentChecklist';
import { ContactForm } from './components/ContactForm';
import { ResponseHoursNotice } from './components/ResponseHoursNotice';
import { VehicleCheckGuide } from './components/VehicleCheckGuide';
import { SituationAnchors } from './components/SituationAnchors';
import { ToastHost } from './components/ToastHost';
import { RegionalDeliverySection } from './components/RegionalDeliverySection';
import { InsightsSection } from './components/InsightsSection';
import { ConsultationStatusSection } from './components/ConsultationStatusSection';
import { ReviewSection } from './components/ReviewSection';
import { openKakaoWithPrefill, buildSituationMessage } from './lib/consult';

/**
 * 단비카 공통 버튼 컴포넌트
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  icon: Icon,
  as: Component = 'button',
  ...props 
}: any) => {
  const baseStyle = "inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-all duration-200 text-[15px] sm:text-base";
  
  const variants = {
    primary: "bg-brand-navy hover:bg-brand-navy-dark text-white shadow-sm",
    secondary: "bg-brand-blue hover:bg-sky-700 text-white shadow-sm",
    accent: "bg-brand-orange hover:bg-orange-700 text-white shadow-md hover:shadow-lg",
    outline: "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300",
    kakao: "bg-kakao hover:bg-[#FADA0A] text-kakao-text shadow-sm",
  };

  return (
    <Component 
      className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </Component>
  );
};

/**
 * 단비카 공통 카드 컴포넌트
 */
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  id?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = false, id }) => {
  return (
    <div id={id} className={`bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 
      ${hover ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-brand-light shadow-sm' : 'shadow-sm'} 
      ${className}`}
    >
      {children}
    </div>
  );
};

const openKakaoConsult = async (message = '단비카 상담 문의합니다.') => {
  const copied = await openKakaoWithPrefill(message);
  if (copied) {
    window.dispatchEvent(
      new CustomEvent('danbi-toast', {
        detail: '상담 문구가 복사되었습니다. 카카오톡에 붙여넣어 주세요.',
      }),
    );
  }
};

const KakaoCta = ({
  children,
  className = '',
  variant = 'kakao',
  message,
  showIcon = true,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: 'kakao' | 'outline';
  message?: string;
  showIcon?: boolean;
}) => (
  <Button
    type="button"
    variant={variant}
    className={className}
    icon={showIcon ? MessageCircle : undefined}
    onClick={() => openKakaoConsult(message)}
  >
    {children}
  </Button>
);

const carData = [
  { id: 1, manufacturer: '현대', name: '아반떼', year: '2022', mileage: '3만 km', fuel: '가솔린', type: '준중형', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&fm=webp&w=800' },
  { id: 2, manufacturer: '기아', name: 'K5', year: '2021', mileage: '5만 km', fuel: '가솔린', type: '중형', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&fm=webp&w=800' },
  { id: 3, manufacturer: '현대', name: '그랜저', year: '2020', mileage: '6만 km', fuel: '가솔린/하이브리드', type: '대형', image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&q=80&fm=webp&w=800' },
  { id: 4, manufacturer: '기아', name: '레이', year: '2023', mileage: '1만 km', fuel: '가솔린', type: '경차', image: 'https://images.unsplash.com/photo-1629897048514-3dd7414272aa?auto=format&fit=crop&q=80&fm=webp&w=800' },
  { id: 5, manufacturer: '현대', name: '캐스퍼', year: '2022', mileage: '2만 km', fuel: '가솔린', type: '경차', image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&fm=webp&w=800' },
  { id: 6, manufacturer: '기아', name: '스포티지', year: '2021', mileage: '4만 km', fuel: '디젤', type: 'SUV', image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&fm=webp&w=800' },
  { id: 7, manufacturer: '현대', name: '싼타페', year: '2020', mileage: '7만 km', fuel: '디젤/가솔린', type: 'SUV', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&fm=webp&w=800' },
  { id: 8, manufacturer: '기아', name: '카니발', year: '2022', mileage: '4만 km', fuel: '디젤/가솔린', type: '승합차', image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&fm=webp&w=800' }
];

const CarListSection = () => {
  const [filter, setFilter] = useState('전체');
  const categories = ['전체', '경차', '준중형', '중형', '대형', 'SUV', '승합차', '화물차'];

  const filteredCars = filter === '전체' ? carData : carData.filter(car => car.type === filter);

  return (
    <section className="py-24 bg-white" id="cars">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-4 tracking-tight">월 납입 부담을 고려한 인기 중고차</h2>
          <p className="text-slate-600 text-lg">출퇴근, 생업, 가족용 등 차량 용도와 월 납입 가능 금액을 기준으로 상담할 수 있습니다.</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                filter === category
                  ? 'bg-brand-navy text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCars.map(car => (
            <Card key={car.id} hover className="!p-0 overflow-hidden flex flex-col group">
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                <img loading="lazy" src={car.image} alt={`${car.manufacturer} ${car.name}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3">
                  <span className="bg-brand-orange text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">상담 가능</span>
                </div>
              </div>
              <div className="p-5 flex-grow flex flex-col">
                <div className="text-xs text-slate-500 font-semibold mb-1">{car.manufacturer}</div>
                <h3 className="text-xl font-bold text-brand-navy mb-3">{car.name}</h3>
                
                <div className="flex flex-wrap gap-2 mb-4 text-xs text-slate-600 font-medium">
                  <span className="bg-slate-100 px-2 py-1 rounded">{car.year}년식</span>
                  <span className="bg-slate-100 px-2 py-1 rounded">{car.mileage}</span>
                  <span className="bg-slate-100 px-2 py-1 rounded">{car.fuel}</span>
                  <span className="bg-slate-100 px-2 py-1 rounded">{car.type}</span>
                </div>

                <div className="bg-sky-50 rounded-lg p-3 mb-5 space-y-1 mt-auto">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">차량 가격:</span>
                    <span className="font-bold text-brand-navy">상담 문의</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">예상 월 납입금:</span>
                    <span className="font-bold text-brand-blue">조건에 따라 확인</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">재고 상태:</span>
                    <span className="font-bold text-slate-700">상담 후 확인</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-auto">
                  <Button as="a" href="#contact" variant="outline" className="flex-1 !px-2 !py-2.5 !text-sm">
                    자세히 보기
                  </Button>
                  <Button as="a" href="#contact" variant="primary" className="flex-1 !px-2 !py-2.5 !text-sm">
                    할부 상담하기
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          {filteredCars.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-500">
              해당 조건의 추천 차량을 준비 중입니다. 상담을 통해 원하시는 차량을 찾아드릴 수 있습니다.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const ProcessSection = () => {
  return (
    <section className="py-24 bg-white" id="process">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-4 tracking-tight">상담부터 출고까지 어렵지 않습니다</h2>
          <p className="text-slate-600 text-lg">단비카의 투명하고 체계적인 진행 절차를 안내해 드립니다.</p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-brand-blue/20 -translate-x-1/2"></div>
          
          <div className="space-y-8 md:space-y-12">
            {[
              { step: '1단계', title: '무료 상담 신청', desc: '전화, 카카오톡 또는 홈페이지 상담폼으로 신청합니다.' },
              { step: '2단계', title: '고객 조건 확인', desc: '개인회생 상태, 소득, 재직 상태와 월 납입 가능 금액을 확인합니다.' },
              { step: '3단계', title: '할부 조건 사전 검토', desc: '고객 조건에 따라 이용 가능한 금융 조건을 검토합니다.' },
              { step: '4단계', title: '차량 선택 및 확인', desc: '예산과 용도에 맞는 차량을 추천하고 차량 상태를 확인합니다.' },
              { step: '5단계', title: '계약 및 출고', desc: '계약 내용을 충분히 안내하고 고객이 동의한 후 출고를 진행합니다.' },
            ].map((item, idx) => (
              <div key={idx} className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-12 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left w-full">
                  <div className={`w-full bg-white p-6 rounded-2xl shadow-sm border border-brand-blue/10 relative ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <span className="text-brand-orange font-bold text-sm mb-2 block">{item.step}</span>
                    <h3 className="text-xl font-bold text-brand-navy mb-3">{item.title}</h3>
                    <p className="text-slate-600 break-keep">{item.desc}</p>
                  </div>
                </div>
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-brand-blue rounded-full border-4 border-white items-center justify-center text-white font-bold z-10 shadow-sm">
                  {idx + 1}
                </div>
                <div className="md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm font-semibold text-slate-500 bg-slate-100 py-3 px-6 rounded-full inline-block break-keep">
            * 고객 동의 없이 계약이나 금융 심사를 임의로 진행하지 않습니다.
          </p>
        </div>
      </div>
    </section>
  );
};

const CustomerTypeSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { 
      title: '개인회생 진행 중', 
      content: '인가 전이거나 납부 회차가 적더라도 소득 증빙이 가능하다면 진행 방법을 찾아볼 수 있습니다. 현재 변제금과 남은 여유 자금을 기준으로 무리가 되지 않는 선에서 상담을 도와드립니다.'
    },
    { 
      title: '개인회생 인가 후', 
      content: '인가 결정을 받고 일정 회차 이상 납부하셨다면 보다 유리한 조건으로 진행이 가능할 수 있습니다. 미납 여부와 소득을 확인하여 최적의 상품을 안내해 드립니다.'
    },
    { 
      title: '저신용 고객', 
      content: '신용점수가 낮아 한도가 나오지 않거나 금리가 높아 고민이신가요? 단비카의 예외 승인 노하우와 제휴 금융사를 통해 가능한 조건을 다각도로 검토합니다.'
    },
    { 
      title: '할부 거절 경험 고객', 
      content: '타사에서 한 번 거절되었다고 끝난 것이 아닙니다. 거절 사유를 정확히 분석하고, 고객님의 긍정적인 요소를 어필하여 재심사를 진행해 볼 수 있습니다.'
    },
    { 
      title: '사업자·프리랜서', 
      content: '소득 증빙이 까다로운 개인사업자나 프리랜서 고객님도 통장 수령 내역이나 기타 보조 자료를 활용하여 한도를 산출할 수 있는 방법을 안내해 드립니다.'
    }
  ];

  return (
    <section className="py-24 bg-brand-navy text-white" id="guide">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">고객 유형별 안내</h2>
          <p className="text-slate-300 text-lg">비슷한 상황이라도 세부 조건에 따라 해법이 다릅니다.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === idx
                  ? 'bg-brand-orange text-white shadow-md'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 sm:p-12 text-center shadow-xl min-h-[300px] flex flex-col justify-center items-center">
          <h3 className="text-2xl font-bold text-brand-light mb-6">{tabs[activeTab].title}</h3>
          <p className="text-lg text-slate-200 leading-relaxed break-keep max-w-3xl mx-auto mb-10">
            {tabs[activeTab].content}
          </p>
          <Button as="a" href="#contact" variant="primary" className="!bg-white !text-brand-navy hover:!bg-slate-100 text-lg px-8 py-4">
            내 조건 확인하기
          </Button>
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    { q: '개인회생 중에도 중고차 할부가 가능한가요?', a: '네, 가능합니다. 다만 확정적으로 승인된다고 말씀드릴 수는 없으며, 개인회생 진행 단계(인가 전/후), 변제금 납부 내역, 현재 소득 등 고객님의 세부 조건에 따라 가능한 금융사와 한도가 달라질 수 있습니다.' },
    { q: '개인회생 인가 전과 인가 후의 조건이 다른가요?', a: '인가 전이거나 납입 횟수가 적은 경우보다, 인가 결정을 받고 일정 회차 이상 납부하신 경우 선택할 수 있는 금융사와 한도 조건이 더 유리해질 수 있습니다. 정확한 조건은 상담을 통해 확인해 드립니다.' },
    { q: '신용점수가 낮아도 상담할 수 있나요?', a: '물론입니다. 단비카는 저신용 고객님을 위한 다양한 예외 승인 플랜을 보유하고 있습니다. 금융사 심사 기준에 따라 결과는 다를 수 있지만, 최선의 방법을 함께 찾아드립니다.' },
    { q: '다른 곳에서 할부가 거절됐는데 다시 확인할 수 있나요?', a: '거절된 이유를 분석하여 보완할 수 있는 긍정적인 요소를 어필하면 재심사에서 승인되는 경우가 있습니다. 포기하지 마시고 전문 상담을 받아보시길 권장합니다.' },
    { q: '직장인이 아니어도 상담할 수 있나요?', a: '사업자, 프리랜서, 주부, 일용직 고객님도 통장 수령 내역이나 재산세 납부 내역, 신용카드 사용 내역 등을 통해 소득을 증빙할 수 있는 방법이 있습니다. 고객님의 조건에 따라 다르게 적용됩니다.' },
    { q: '초기 비용 없이 차량을 구입할 수 있나요?', a: '조건에 따라 차량 대금은 물론 취등록비, 보험료까지 전액 할부로 진행이 가능할 수 있습니다. 단, 모든 고객에게 적용되는 것은 아니며 금융사 심사 결과에 따라 달라집니다.' },
    { q: '차량 구매와 추가 필요자금 상담을 함께 받을 수 있나요?', a: '네, 차량 구매 비용 외에 생활자금 등 여유자금 확보가 필요하신 경우 함께 상담해 드립니다. 한도는 고객님의 조건과 금융사 심사 기준에 따라 결정됩니다.' },
    { q: '상담하면 신용조회가 바로 진행되나요?', a: '아닙니다. 상담을 신청하신다고 해서 바로 신용조회가 진행되거나 등급이 하락하지 않습니다. 가조회를 통해 안전하게 가능 여부만 먼저 확인하실 수 있습니다.' },
    { q: '상담 신청 후 반드시 계약해야 하나요?', a: '아닙니다. 상담 신청만으로 차량 계약이나 금융상품 가입이 진행되지 않으며, 모든 조건을 꼼꼼히 확인하신 후 고객님께서 최종적으로 결정하시면 됩니다.' },
    { q: '전국 어디에서나 차량을 받을 수 있나요?', a: '네, 전국 탁송이 가능하므로 거주 지역에 상관없이 상담 및 출고를 진행하실 수 있습니다.' },
    { q: '필요한 서류는 무엇인가요?', a: '기본적으로 신분증이 필요하며, 직군(직장인, 사업자 등)이나 현재 상황(개인회생 등)에 따라 추가 서류(소득금액증명원, 건강보험자격득실확인서, 변제금 납부 내역서 등)가 필요할 수 있습니다. 상담 시 상세히 안내해 드립니다.' },
    { q: '상담 비용이 있나요?', a: '단비카의 모든 상담은 무료로 진행됩니다. 부담 없이 문의해 주시기 바랍니다.' },
  ];

  return (
    <section className="py-24 bg-white" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-4 tracking-tight">자주 묻는 질문</h2>
          <p className="text-slate-600 text-lg">고객님들이 가장 궁금해하시는 내용을 모았습니다.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:border-brand-blue/30 transition-colors">
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              >
                <span className="font-bold text-brand-navy text-lg pr-4">{faq.q}</span>
                <ChevronDown className={`w-6 h-6 text-slate-400 shrink-0 transition-transform duration-300 ${openIdx === idx ? 'rotate-180 text-brand-blue' : ''}`} />
              </button>
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${openIdx === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-6 pt-2 text-slate-600 leading-relaxed break-keep font-medium border-t border-slate-50 mt-2 bg-slate-50/50">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const InteractivePrompt = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isClosed) return;
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isClosed]);

  const handleOptionClick = (option: string) => {
    window.dispatchEvent(new CustomEvent('set-consultation', { detail: option }));
    setIsClosed(true);
    setIsVisible(false);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleKakaoClick = async (option: string) => {
    const copied = await openKakaoWithPrefill(buildSituationMessage(option));
    setIsClosed(true);
    setIsVisible(false);
    if (copied) {
      window.dispatchEvent(
        new CustomEvent('danbi-toast', {
          detail: '상담 내용이 복사되었습니다. 카카오톡에 붙여넣어 주세요.',
        }),
      );
    }
  };

  const options = [
    '개인회생 중이에요',
    '신용점수가 낮아요',
    '기존 할부가 거절됐어요',
    '월 납입금이 궁금해요',
    '여유자금 상담이 필요해요'
  ];

  if (!isVisible || isClosed) return null;

  return (
    <div className="fixed bottom-24 lg:bottom-10 left-4 lg:left-10 z-50 w-72 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-brand-navy/10 overflow-hidden flex flex-col animate-[slideIn_0.5s_ease-out]">
      <div className="bg-brand-navy text-white p-4 pr-10 relative">
        <div className="flex items-center gap-2 mb-1">
          <MessageSquareText className="w-5 h-5 text-brand-orange" />
          <span className="font-bold text-sm">단비카 매니저</span>
        </div>
        <p className="text-sm font-medium leading-snug break-keep">개인회생이나 저신용 때문에 할부가 걱정되시나요?</p>
        <button 
          onClick={() => { setIsClosed(true); setIsVisible(false); }}
          className="absolute top-3 right-3 text-white/50 hover:text-white transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-3 bg-slate-50 flex flex-col gap-1.5 max-h-64 overflow-y-auto">
        {options.map((opt, i) => (
          <div key={i} className="flex gap-1.5">
            <button 
              onClick={() => handleOptionClick(opt)}
              className="text-left flex-1 px-3 py-2.5 bg-white border border-slate-200 hover:border-brand-blue hover:text-brand-blue hover:bg-sky-50 rounded-xl text-sm font-medium text-slate-700 transition-colors shadow-sm"
            >
              {opt}
            </button>
            <button
              type="button"
              onClick={() => handleKakaoClick(opt)}
              className="px-2.5 rounded-xl bg-[#FEE500] text-[#3A2929] text-xs font-bold hover:bg-[#F4DC00]"
              title="카카오톡으로 상담"
            >
              카톡
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const FloatingMenuPC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const openKakao = async () => {
    const copied = await openKakaoWithPrefill('단비카 상담 문의합니다.');
    if (copied) {
      window.dispatchEvent(
        new CustomEvent('danbi-toast', {
          detail: '상담 문구가 복사되었습니다. 카카오톡에 붙여넣어 주세요.',
        }),
      );
    }
  };

  return (
    <div className="hidden lg:flex fixed right-6 bottom-10 flex-col gap-3 z-50">
      <a href="tel:15994950" className="w-14 h-14 bg-brand-navy rounded-full shadow-lg flex items-center justify-center text-white hover:bg-brand-navy-dark transition-transform hover:-translate-y-1 group relative">
        <Phone className="w-6 h-6" />
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-brand-navy text-white px-3 py-1.5 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">전화상담</div>
      </a>
      <button type="button" onClick={openKakao} className="w-14 h-14 bg-[#FEE500] rounded-full shadow-lg flex items-center justify-center text-[#3A2929] hover:bg-[#F4DC00] transition-transform hover:-translate-y-1 group relative">
        <MessageCircle className="w-6 h-6" />
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-[#FEE500] text-[#3A2929] px-3 py-1.5 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">카카오톡</div>
      </button>
      <a href="#contact" className="w-14 h-14 bg-brand-blue rounded-full shadow-lg flex items-center justify-center text-white hover:bg-sky-700 transition-transform hover:-translate-y-1 group relative">
        <ClipboardList className="w-6 h-6" />
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-brand-blue text-white px-3 py-1.5 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">간편상담</div>
      </a>
      <button onClick={scrollToTop} className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-500 hover:text-brand-navy transition-transform hover:-translate-y-1 border border-slate-100">
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
};

const FloatingMenuMobile = () => {
  const openKakao = async () => {
    const copied = await openKakaoWithPrefill('단비카 상담 문의합니다.');
    if (copied) {
      window.dispatchEvent(
        new CustomEvent('danbi-toast', {
          detail: '상담 문구가 복사되었습니다. 카카오톡에 붙여넣어 주세요.',
        }),
      );
    }
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 z-50 flex items-center justify-between pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <a href="#" className="flex-1 flex flex-col items-center justify-center py-2.5 text-slate-500 hover:text-brand-navy transition-colors">
        <Home className="w-5 h-5 mb-1" />
        <span className="text-[10px] font-bold">홈</span>
      </a>
      <a href="#cars" className="flex-1 flex flex-col items-center justify-center py-2.5 text-slate-500 hover:text-brand-navy transition-colors">
        <CarFront className="w-5 h-5 mb-1" />
        <span className="text-[10px] font-bold">차량 보기</span>
      </a>
      <a href="tel:15994950" className="flex-1 flex flex-col items-center justify-center py-2.5 text-brand-navy font-bold hover:bg-slate-50 transition-colors border-l border-slate-100 relative">
        <div className="absolute -top-1 right-2 w-2 h-2 bg-brand-orange rounded-full animate-ping"></div>
        <Phone className="w-5 h-5 mb-1" />
        <span className="text-[10px]">전화상담</span>
      </a>
      <button type="button" onClick={openKakao} className="flex-1 flex flex-col items-center justify-center py-2.5 text-[#3A2929] bg-[#FEE500] hover:bg-[#F4DC00] font-bold transition-colors">
        <MessageCircle className="w-5 h-5 mb-1" />
        <span className="text-[10px]">카카오톡</span>
      </button>
    </div>
  );
};

const FinalCTASection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 bg-brand-navy rounded-3xl overflow-hidden shadow-2xl">
          <div className="w-full lg:w-1/2 h-64 lg:h-auto self-stretch">
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&fm=webp" alt="상담사와 고객" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="w-full lg:w-1/2 p-8 sm:p-12 text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight leading-snug break-keep">신용 문제 때문에 필요한 차량까지 포기하지 마세요</h2>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed break-keep">
              혼자서 여러 금융사를 알아보거나 반복해서 신용조회를 진행하기 전에 현재 상황에서 확인할 수 있는 방법부터 상담받아 보세요.<br className="hidden lg:block" />
              단비카가 차량 선택, 할부 조건, 월 납입 계획과 추가 필요자금 상담까지 함께 확인해 드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button as="a" href="#contact" variant="primary" className="!bg-white !text-brand-navy hover:!bg-slate-100 flex-1">
                무료 상담 신청
              </Button>
              <Button as="a" href="tel:15994950" variant="outline" icon={Phone} className="border-white/30 text-white hover:bg-white/10 flex-1">
                1599-4950 전화상담
              </Button>
              <KakaoCta className="flex-1">
                카카오톡 상담
              </KakaoCta>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-gray selection:bg-brand-blue selection:text-white pb-24 lg:pb-0">
      <ToastHost />
      
      {/* 1. Header (GNB) */}
      <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-navy flex items-center justify-center">
              <CarFront className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-brand-navy tracking-tight">단비카</span>
          </div>
          
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-5 text-sm font-semibold text-slate-700">
              <a href="#about" className="hover:text-brand-blue transition-colors">소개</a>
              <a href="#simulator" className="hover:text-brand-blue transition-colors">월 납입</a>
              <a href="#delivery" className="hover:text-brand-blue transition-colors">탁송</a>
              <a href="#insights" className="hover:text-brand-blue transition-colors">가이드</a>
              <a href="#reviews" className="hover:text-brand-blue transition-colors">후기</a>
              <a href="#contact" className="hover:text-brand-blue transition-colors">무료 상담</a>
            </nav>
            
            <div className="hidden sm:flex items-center gap-2">
              <Button as="a" href="tel:15994950" variant="primary" className="!py-2 !px-4 !rounded-lg text-sm !gap-1.5">
                <Phone className="w-4 h-4" />
                1599-4950
              </Button>
              <KakaoCta className="!py-2 !px-4 !rounded-lg text-sm !gap-1.5" showIcon={false}>
                <MessageCircle className="w-4 h-4" />
                카카오톡 상담
              </KakaoCta>
            </div>
            
            <button className="md:hidden p-2 text-slate-600 hover:text-brand-navy">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow pt-16">
        
        {/* 2. Hero Section */}
        <section className="bg-brand-navy text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&fm=webp')] bg-cover bg-center opacity-30 mix-blend-luminosity"></div>
          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-transparent"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-32 relative z-10 flex flex-col items-start text-left">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 rounded-full bg-brand-orange/20 text-orange-200 border border-orange-500/30 text-xs font-semibold backdrop-blur-sm">개인회생 고객 상담</span>
              <span className="px-3 py-1 rounded-full bg-brand-blue/20 text-sky-200 border border-sky-500/30 text-xs font-semibold backdrop-blur-sm">저신용 고객 상담</span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-slate-200 border border-white/20 text-xs font-semibold backdrop-blur-sm hidden sm:inline-block">할부 거절 고객 재상담</span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-slate-200 border border-white/20 text-xs font-semibold backdrop-blur-sm hidden sm:inline-block">전국 차량 상담</span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-slate-200 border border-white/20 text-xs font-semibold backdrop-blur-sm">상담비 무료</span>
            </div>

            <h1 className="sr-only">개인회생중고차할부·저신용중고차할부 전문상담 단비카</h1>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.15] tracking-tight mb-6 break-keep max-w-3xl">
              <span className="block mb-2 text-brand-light/90 font-medium text-3xl sm:text-4xl">개인회생 중이어도</span>
              내 상황에 맞는 <br className="hidden sm:block" />
              <span className="text-brand-orange">중고차 할부</span>를 찾아드립니다
            </h2>
            
            <div className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl break-keep font-medium space-y-3 leading-relaxed">
              <p className="text-white font-semibold">신용점수만 보고 포기하지 않습니다.</p>
              <p>현재 소득, 개인회생 진행 상태, 차량 용도와 월 납입 가능 금액을 종합적으로 확인하여 고객에게 적합한 차량 구매 방법을 안내합니다.</p>
              <p>차량 구매뿐 아니라 현재 자금 상황과 추가 필요자금 상담도 함께 진행합니다.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-6">
              <Button as="a" href="#contact" variant="accent" className="w-full sm:w-auto text-base sm:text-lg py-4 px-8">
                내 조건 무료 확인하기
              </Button>
              <Button as="a" href="tel:15994950" variant="outline" icon={Phone} className="w-full sm:w-auto text-base sm:text-lg py-4 px-8 !bg-white/10 !text-white !border-white/30 hover:!bg-white/20">
                전화로 바로 상담하기
              </Button>
              <KakaoCta className="w-full sm:w-auto text-base sm:text-lg py-4 px-8">
                카카오톡으로 상담하기
              </KakaoCta>
            </div>

            <p className="text-sm text-slate-400 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm inline-block">
              * 상담 신청만으로 차량 계약이나 금융상품 가입이 진행되지 않습니다.
            </p>
          </div>
        </section>

        <SituationAnchors />

        {/* 3. Customer Empathy Section */}
        <section className="py-24 bg-white" id="credit">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-4 tracking-tight">혹시 이런 이유로 차량 구매를 포기하고 계신가요?</h2>
              <p className="text-slate-600 text-lg">혼자 고민하지 마세요. 많은 분들이 같은 고민으로 단비카를 찾습니다.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card id="rehab" className="flex flex-col items-start text-left bg-slate-50 hover:bg-white scroll-mt-24">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-slate-600 flex items-center justify-center mb-5 shadow-sm">
                  <FileWarning className="w-6 h-6" />
                </div>
                <p className="text-lg font-bold text-brand-navy break-keep leading-snug">개인회생 중이라 자동차 할부가 불가능할 것 같다.</p>
              </Card>

              <Card id="lowcredit" className="flex flex-col items-start text-left bg-slate-50 hover:bg-white scroll-mt-24">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-slate-600 flex items-center justify-center mb-5 shadow-sm">
                  <TrendingDown className="w-6 h-6" />
                </div>
                <p className="text-lg font-bold text-brand-navy break-keep leading-snug">신용점수가 낮아 금융사에서 거절당했다.</p>
              </Card>

              <Card id="rejected" className="flex flex-col items-start text-left bg-slate-50 hover:bg-white scroll-mt-24">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-slate-600 flex items-center justify-center mb-5 shadow-sm">
                  <CreditCard className="w-6 h-6" />
                </div>
                <p className="text-lg font-bold text-brand-navy break-keep leading-snug">기존 대출이 있어 추가 할부가 걱정된다.</p>
              </Card>

              <Card className="flex flex-col items-start text-left bg-slate-50 hover:bg-white">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-slate-600 flex items-center justify-center mb-5 shadow-sm">
                  <Briefcase className="w-6 h-6" />
                </div>
                <p className="text-lg font-bold text-brand-navy break-keep leading-snug">직장은 있지만 신용 문제로 심사가 어렵다.</p>
              </Card>

              <Card className="flex flex-col items-start text-left bg-slate-50 hover:bg-white">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-slate-600 flex items-center justify-center mb-5 shadow-sm">
                  <CarFront className="w-6 h-6" />
                </div>
                <p className="text-lg font-bold text-brand-navy break-keep leading-snug">출퇴근이나 생업에 꼭 차량이 필요하다.</p>
              </Card>

              <Card className="flex flex-col items-start text-left bg-slate-50 hover:bg-white">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-slate-600 flex items-center justify-center mb-5 shadow-sm">
                  <PiggyBank className="w-6 h-6" />
                </div>
                <p className="text-lg font-bold text-brand-navy break-keep leading-snug">차량 구매 후 보험료와 생활자금이 걱정된다.</p>
              </Card>
            </div>

            <div className="mt-16 text-center bg-brand-light/60 rounded-2xl p-8 sm:p-10 border border-brand-blue/10">
              <p className="text-xl sm:text-2xl font-bold text-brand-navy mb-3">단비카는 단순히 신용점수만 확인하지 않습니다.</p>
              <p className="text-lg text-brand-blue font-semibold">고객의 현재 상황을 먼저 듣고 가능한 방법을 함께 찾아드립니다.</p>
            </div>
          </div>
        </section>

        {/* 4. Core Advantages Section */}
        <section className="py-24 bg-brand-navy text-white relative" id="about">
          <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&fm=webp')] bg-cover bg-center"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">단비카가 고객의 상황을 먼저 확인하는 이유</h2>
              <p className="text-slate-300 text-lg">고객 맞춤형 플랜으로 안심하고 차량을 구매할 수 있습니다.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
              <Card className="bg-white/5 border-white/10 text-white backdrop-blur-sm flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-14 h-14 shrink-0 rounded-xl bg-brand-blue flex items-center justify-center shadow-lg">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">개인회생·저신용 전문 상담</h3>
                  <p className="text-slate-300 leading-relaxed break-keep">개인회생 진행 단계, 변제 현황, 소득과 재직 상태 등을 확인하여 고객 상황에 맞는 상담을 진행합니다.</p>
                </div>
              </Card>

              <Card className="bg-white/5 border-white/10 text-white backdrop-blur-sm flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-14 h-14 shrink-0 rounded-xl bg-brand-orange flex items-center justify-center shadow-lg">
                  <Calculator className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">월 납입금 중심 차량 추천</h3>
                  <p className="text-slate-300 leading-relaxed break-keep">무조건 비싼 차량을 권하지 않고 고객이 감당할 수 있는 월 납입금과 유지비를 기준으로 차량을 추천합니다.</p>
                </div>
              </Card>

              <Card className="bg-white/5 border-white/10 text-white backdrop-blur-sm flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-14 h-14 shrink-0 rounded-xl bg-brand-blue flex items-center justify-center shadow-lg">
                  <HandCoins className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">차량과 자금 계획 동시 상담</h3>
                  <p className="text-slate-300 leading-relaxed break-keep">차량 가격뿐 아니라 취등록비, 보험료, 초기 비용과 추가 필요자금까지 함께 검토합니다.</p>
                </div>
              </Card>

              <Card className="bg-white/5 border-white/10 text-white backdrop-blur-sm flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-14 h-14 shrink-0 rounded-xl bg-brand-orange flex items-center justify-center shadow-lg">
                  <ClipboardList className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">출고까지 전 과정 안내</h3>
                  <p className="text-slate-300 leading-relaxed break-keep">상담, 조건 확인, 차량 선택, 성능 확인, 계약과 출고까지 담당자가 단계별로 안내합니다.</p>
                </div>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button as="a" href="#contact" variant="accent" className="w-full sm:w-auto text-lg py-4 px-8">
                내 조건 상담받기
              </Button>
              <KakaoCta className="w-full sm:w-auto text-lg py-4 px-8">
                카카오톡 문의하기
              </KakaoCta>
            </div>
          </div>
        </section>

        <ProcessSection />
        <CustomerTypeSection />
        <ConsultationStatusSection />
        <LiveRollingSection />
        <StatisticsSection />

        <CarListSection />
        <PaymentSimulator />
        <DocumentChecklist />
        <VehicleCheckGuide />
        <RegionalDeliverySection />
        <InsightsSection />

        {/* 5. Extra Funds Consultation Section */}
        <section className="py-24 bg-sky-50 relative overflow-hidden" id="funds">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] group">
                  <img 
                    src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&fm=webp" 
                    alt="차량 구매와 자금 계획 상담" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/40 to-transparent flex items-end p-6 sm:p-8">
                    <div className="flex gap-3 sm:gap-4 w-full justify-between items-end">
                      <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 sm:p-4 text-white border border-white/30 flex-1 text-center shadow-lg">
                        <CarFront className="w-6 h-6 mx-auto mb-2 opacity-90" />
                        <span className="text-sm font-semibold block break-keep">차량 대금</span>
                      </div>
                      <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 sm:p-4 text-white border border-white/30 flex-1 text-center shadow-lg">
                        <ShieldCheck className="w-6 h-6 mx-auto mb-2 opacity-90" />
                        <span className="text-sm font-semibold block break-keep">보험/이전비</span>
                      </div>
                      <div className="bg-brand-orange/90 backdrop-blur-md rounded-xl p-3 sm:p-4 text-white shadow-xl flex-1 text-center transform -translate-y-2 border border-brand-orange">
                        <Wallet className="w-6 h-6 mx-auto mb-2" />
                        <span className="text-sm font-bold block break-keep">여유자금</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-6 tracking-tight leading-[1.3] break-keep">
                  차만 구입하면 끝일까요?<br />
                  <span className="text-brand-blue">출고 이후의 자금 상황</span>까지 함께 생각합니다
                </h2>
                
                <div className="space-y-4 text-lg text-slate-600 mb-8 break-keep leading-relaxed font-medium">
                  <p>
                    중고차를 구매할 때는 차량 가격 외에도 보험료, 취등록비, 이전비, 정비비 등 여러 비용이 발생할 수 있습니다.
                  </p>
                  <p>
                    단비카는 고객의 소득과 월 납입 가능 금액을 확인한 후 차량 구매 비용과 <strong className="text-brand-navy font-bold">추가 필요자금 상담을 함께 진행</strong>합니다.
                  </p>
                  <p>
                    금융사 심사 결과와 고객 조건에 따라 가능한 범위는 달라질 수 있으며, 무리한 계약이나 불필요한 금융상품 이용을 권하지 않습니다.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-brand-blue/20 shadow-sm mb-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-brand-orange"></div>
                  <p className="text-xl font-bold text-brand-navy mb-2 break-keep">
                    차량 구매와 여유자금이 모두 필요하다면
                  </p>
                  <p className="text-brand-orange font-bold text-lg break-keep">
                    현재 조건부터 부담 없이 확인해 보세요.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full mb-10">
                  <Button as="a" href="#contact" variant="primary" className="w-full sm:flex-1 py-4 text-lg">
                    차량＋자금 조건 확인하기
                  </Button>
                  <KakaoCta variant="outline" className="w-full sm:flex-1 py-4 text-lg bg-white" showIcon={false}>
                    상담사에게 문의하기
                  </KakaoCta>
                </div>
                
                <div className="bg-black/5 rounded-xl p-4 sm:p-5 space-y-2">
                  <p className="text-[13px] text-slate-500 flex gap-2 items-start break-keep leading-tight">
                    <span className="text-slate-400 mt-0.5">•</span>
                    추가자금 가능 여부와 금액은 고객의 소득, 신용 상태와 금융사 심사 결과에 따라 달라집니다.
                  </p>
                  <p className="text-[13px] text-slate-500 flex gap-2 items-start break-keep leading-tight">
                    <span className="text-slate-400 mt-0.5">•</span>
                    모든 고객에게 추가자금이 제공되는 것은 아닙니다.
                  </p>
                  <p className="text-[13px] text-slate-500 flex gap-2 items-start break-keep leading-tight">
                    <span className="text-slate-400 mt-0.5">•</span>
                    금융상품 이용 시 개인의 신용평점이 하락할 수 있습니다.
                  </p>
                  <p className="text-[13px] text-slate-500 flex gap-2 items-start break-keep leading-tight">
                    <span className="text-slate-400 mt-0.5">•</span>
                    구체적인 금리와 조건은 상담과 심사 후 안내됩니다.
                  </p>
                </div>

              </div>

            </div>
          </div>
        </section>

        <ReviewSection />
        <FAQSection />

        <FinalCTASection />

        {/* 6. Quick Consultation Form Section */}
        <section className="py-24 bg-brand-light/30 relative" id="contact">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-4 tracking-tight">30초 간편 상담 신청</h2>
              <p className="text-slate-600 text-lg">복잡한 서류 없이 기본정보를 남겨주시면 상담사가 고객의 상황을 확인한 후 연락드립니다.</p>
            </div>

            <ResponseHoursNotice className="mb-8" />

            <ContactForm />

            <p className="mt-4 text-center text-sm text-slate-500 break-keep">
              * 상담 신청만으로 차량 계약이나 금융상품 가입이 진행되지 않습니다.
            </p>

            <div className="mt-8 bg-brand-navy/5 rounded-xl p-5 border border-brand-navy/10 text-xs text-slate-500 space-y-1.5 leading-relaxed text-left">
              <p className="font-semibold text-slate-600 mb-2 text-sm">※ 유의사항</p>
              <p>• 할부 및 금융 조건은 고객의 신용 상태, 소득, 재직 상태와 금융사 심사 결과에 따라 달라질 수 있습니다.</p>
              <p>• 상담 신청만으로 금융계약이나 차량 구매계약이 체결되지 않습니다.</p>
              <p>• 모든 고객의 승인이나 추가자금 제공을 보장하지 않습니다.</p>
              <p>• 금융상품 이용 시 개인의 신용평점에 영향을 줄 수 있습니다.</p>
            </div>

            <div className="mt-16 text-center">
              <p className="text-slate-500 mb-6 font-medium">폼 작성이 번거로우신가요? 바로 연락주셔도 좋습니다.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button as="a" href="tel:15994950" variant="outline" icon={Phone} className="w-full sm:w-auto py-4 px-8 text-brand-navy border-slate-300 bg-white hover:bg-slate-50">
                  전화상담 1599-4950
                </Button>
                <KakaoCta className="w-full sm:w-auto py-4 px-8">
                  카카오톡 빠른 상담
                </KakaoCta>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* 4. Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 border-b border-slate-800 pb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <CarFront className="w-8 h-8 text-brand-light" />
                <span className="text-2xl font-bold text-white tracking-tight">단비카</span>
              </div>
              <p className="text-sm leading-relaxed mb-6">개인회생, 저신용 전문 중고차 할부 상담.<br />어려운 상황에서도 최선의 방법을 찾습니다.</p>
              <div className="text-2xl font-bold text-white mb-2">1599-4950</div>
              <button type="button" onClick={() => openKakaoConsult()} className="inline-flex items-center gap-2 text-sm text-[#FEE500] hover:text-[#F4DC00] font-semibold transition-colors">
                <MessageCircle className="w-4 h-4" /> 카카오톡 상담
              </button>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">안내</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">회사소개</a></li>
                <li><a href="#" className="hover:text-white transition-colors">이용약관</a></li>
                <li><a href="#" className="hover:text-white transition-colors">개인정보처리방침</a></li>
                <li><a href="#" className="hover:text-white transition-colors">중고차 구매 유의사항</a></li>
                <li><a href="#" className="hover:text-white transition-colors">금융상품 안내</a></li>
              </ul>
            </div>

            <div className="lg:col-span-2 text-xs space-y-2 text-slate-500 leading-relaxed">
              <p><strong className="text-slate-400">대표자명:</strong> [관리자 입력: 대표자명] <span className="mx-2 text-slate-700">|</span> <strong className="text-slate-400">사업자등록번호:</strong> [관리자 입력: 사업자등록번호]</p>
              <p><strong className="text-slate-400">자동차매매업 등록번호:</strong> [관리자 입력: 자동차매매업 등록번호] <span className="mx-2 text-slate-700">|</span> <strong className="text-slate-400">통신판매업 신고번호:</strong> [관리자 입력: 통신판매업 신고번호]</p>
              <p><strong className="text-slate-400">사업장 주소:</strong> [관리자 입력: 사업장 주소]</p>
              <p><strong className="text-slate-400">개인정보관리책임자:</strong> [관리자 입력: 개인정보관리책임자]</p>
            </div>
          </div>

          <div className="text-xs text-slate-500 space-y-2 leading-relaxed bg-slate-800/50 p-6 rounded-xl">
            <h4 className="text-slate-300 font-bold mb-3 text-sm">※ 법적 유의사항</h4>
            <ul className="list-disc pl-4 space-y-1">
              <li>할부 및 금융 조건은 고객의 신용 상태, 소득, 재직 상태와 금융사 심사 결과에 따라 달라질 수 있습니다.</li>
              <li>상담 신청만으로 금융계약이나 차량 구매계약이 체결되지 않습니다.</li>
              <li>모든 고객의 승인이나 추가자금 제공을 보장하지 않습니다.</li>
              <li>금융상품 이용 시 개인의 신용평점에 영향을 줄 수 있습니다.</li>
              <li>차량 가격, 금리, 기간과 월 납입금은 계약 전 별도로 안내합니다.</li>
              <li>실제 차량의 사고 이력, 성능 상태와 주행거리는 계약 전에 확인할 수 있도록 합니다.</li>
              <li>개인정보는 상담 목적으로만 사용합니다.</li>
            </ul>
          </div>
          
          <div className="mt-8 text-center text-xs text-slate-600">
            © 2026 Danbi Car. All rights reserved.
          </div>
        </div>
      </footer>

      <InteractivePrompt />
      <FloatingMenuPC />
      <FloatingMenuMobile />

    </div>
  );
}
