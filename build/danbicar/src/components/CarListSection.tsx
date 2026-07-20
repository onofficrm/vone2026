import React, { useMemo, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useHomeFeed, type FeedCar } from '../lib/homeFeed';
import { openKakaoWithPrefill } from '../lib/consult';

const categories = ['전체', '경차', '준중형', '중형', '대형', 'SUV', '승합차', '화물차'];

const fallbackCars: FeedCar[] = [
  { id: 1, manufacturer: '현대', name: '아반떼', year: '2022', mileage: '3만 km', fuel: '가솔린', type: '준중형', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&fm=webp&w=800', stock: '상담 후 확인' },
  { id: 2, manufacturer: '기아', name: 'K5', year: '2021', mileage: '5만 km', fuel: '가솔린', type: '중형', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&fm=webp&w=800', stock: '상담 후 확인' },
  { id: 3, manufacturer: '현대', name: '그랜저', year: '2020', mileage: '6만 km', fuel: '가솔린/하이브리드', type: '대형', image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&q=80&fm=webp&w=800', stock: '상담 후 확인' },
  { id: 4, manufacturer: '기아', name: '레이', year: '2023', mileage: '1만 km', fuel: '가솔린', type: '경차', image: 'https://images.unsplash.com/photo-1629897048514-3dd7414272aa?auto=format&fit=crop&q=80&fm=webp&w=800', stock: '상담 후 확인' },
];

export function CarListSection() {
  const { feed } = useHomeFeed();
  const [filter, setFilter] = useState('전체');
  const cars = feed.cars?.length ? feed.cars : fallbackCars;

  const filteredCars = useMemo(
    () => (filter === '전체' ? cars : cars.filter((car) => car.type === filter)),
    [cars, filter],
  );

  const askCar = (car: FeedCar) => {
    window.dispatchEvent(
      new CustomEvent('set-consultation', {
        detail: `[차량 상담]\n관심 차량: ${car.manufacturer} ${car.name} (${car.year}, ${car.type})`,
      }),
    );
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const askCarKakao = async (car: FeedCar) => {
    const copied = await openKakaoWithPrefill(
      `[단비카 차량 상담]\n관심 차량: ${car.manufacturer} ${car.name} (${car.year}, ${car.type})\n할부 상담 부탁드립니다.`,
    );
    if (copied) {
      window.dispatchEvent(
        new CustomEvent('danbi-toast', {
          detail: '차량 상담 문구가 복사되었습니다. 카카오톡에 붙여넣어 주세요.',
        }),
      );
    }
  };

  return (
    <section className="py-24 bg-white" id="cars">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-4 tracking-tight">월 납입 부담을 고려한 인기 중고차</h2>
          <p className="text-slate-600 text-lg">출퇴근, 생업, 가족용 등 차량 용도와 월 납입 가능 금액을 기준으로 상담할 수 있습니다.</p>
          {feed.updatedAt && (
            <p className="text-xs text-slate-400 mt-2">재고 업데이트: {feed.updatedAt}{feed.isSample ? ' · 샘플/상담용 목록' : ''}</p>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                filter === category ? 'bg-brand-navy text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col group shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
            >
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
                    <span className="text-slate-600">차량 가격</span>
                    <span className="font-bold text-brand-navy">{car.priceLabel || '상담 문의'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">예상 월 납입</span>
                    <span className="font-bold text-brand-blue">{car.monthlyLabel || '조건에 따라 확인'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">재고 상태</span>
                    <span className="font-bold text-slate-700">{car.stock || '상담 후 확인'}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-auto">
                  <button type="button" onClick={() => askCar(car)} className="w-full px-2 py-2.5 text-sm font-bold rounded-xl bg-brand-navy text-white hover:bg-brand-navy-dark">
                    할부 상담하기
                  </button>
                  <button
                    type="button"
                    onClick={() => askCarKakao(car)}
                    className="w-full px-2 py-2.5 text-sm font-bold rounded-xl bg-[#FEE500] text-[#3A2929] hover:bg-[#F4DC00] inline-flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4" />
                    카카오 바로 상담
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredCars.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-500">
              해당 조건의 추천 차량을 준비 중입니다. 상담을 통해 원하시는 차량을 찾아드릴 수 있습니다.
            </div>
          )}
        </div>
        <p className="text-center text-xs text-slate-400 mt-8 break-keep">
          * 표시된 차량·월 납입 구간은 상담용 안내이며, 실제 가능 여부와 조건은 심사 후 확정됩니다.
        </p>
      </div>
    </section>
  );
}
