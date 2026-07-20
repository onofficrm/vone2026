import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';

export function CustomerTypeSection() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {
      title: '개인회생 진행 중',
      content:
        '인가 전이거나 납부 회차가 적더라도 소득 증빙이 가능하다면 진행 방법을 찾아볼 수 있습니다. 현재 변제금과 남은 여유 자금을 기준으로 무리가 되지 않는 선에서 상담을 도와드립니다.',
    },
    {
      title: '개인회생 인가 후',
      content:
        '인가 결정을 받고 일정 회차 이상 납부하셨다면 보다 유리한 조건으로 진행이 가능할 수 있습니다. 미납 여부와 소득을 확인하여 최적의 상품을 안내해 드립니다.',
    },
    {
      title: '저신용 고객',
      content:
        '신용점수가 낮아 한도가 나오지 않거나 금리가 높아 고민이신가요? 단비카의 예외 승인 노하우와 제휴 금융사를 통해 가능한 조건을 다각도로 검토합니다.',
    },
    {
      title: '할부 거절 경험 고객',
      content:
        '타사에서 한 번 거절되었다고 끝난 것이 아닙니다. 거절 사유를 정확히 분석하고, 고객님의 긍정적인 요소를 어필하여 재심사를 진행해 볼 수 있습니다.',
    },
    {
      title: '사업자·프리랜서',
      content:
        '소득 증빙이 까다로운 개인사업자나 프리랜서 고객님도 통장 수령 내역이나 기타 보조 자료를 활용하여 한도를 산출할 수 있는 방법을 안내해 드립니다.',
    },
  ];

  return (
    <section className="py-24 bg-brand-navy text-white" id="guide-types">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">고객 유형별 안내</h2>
          <p className="text-slate-300 text-lg">비슷한 상황이라도 세부 조건에 따라 해법이 다릅니다.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === idx ? 'bg-brand-orange text-white shadow-md' : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 sm:p-12 text-center shadow-xl min-h-[300px] flex flex-col justify-center items-center">
          <h3 className="text-2xl font-bold text-brand-light mb-6">{tabs[activeTab].title}</h3>
          <p className="text-lg text-slate-200 leading-relaxed break-keep max-w-3xl mx-auto mb-10">{tabs[activeTab].content}</p>
          <Button as={Link} to="/contact" variant="primary" className="!bg-white !text-brand-navy hover:!bg-slate-100 text-lg px-8 py-4">
            내 조건 확인하기
          </Button>
        </div>
      </div>
    </section>
  );
}
