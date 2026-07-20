import React from 'react';
import { MapPin, CalendarDays, MessageCircle } from 'lucide-react';
import { useHomeFeed, type FeedReview } from '../lib/homeFeed';

const fallbackReviews: FeedReview[] = [
  {
    id: 1,
    title: '개인회생 중 출퇴근용 아반떼 상담 사례',
    carName: '현대 아반떼',
    situation: '개인회생 인가 후 12회차 납부 중, 직장인',
    process: '월 납입금 30만원대 예산으로 아반떼 추천 및 전액 할부 승인',
    review: '출퇴근 차량이 꼭 필요했는데 여기저기 거절당하다가 단비카를 알게 되었습니다.',
    region: '경기 수원',
    date: '2026.06.15',
    image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80&fm=webp&w=800',
  },
];

export function ReviewSection() {
  const { feed } = useHomeFeed();
  const reviews = feed.reviews.length ? feed.reviews : fallbackReviews;

  return (
    <section className="py-24 bg-slate-50" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-4 tracking-tight">단비카와 함께 다시 시작한 고객 이야기</h2>
          <p className="text-slate-600 text-lg">단비카를 통해 희망을 찾은 고객님들의 후기입니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {reviews.map((review) => (
            <article key={review.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-64 bg-slate-200">
                <img loading="lazy" src={review.image} alt={review.carName} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4">
                  <span className="bg-brand-navy/90 backdrop-blur text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-sm">
                    {review.carName}
                  </span>
                </div>
              </div>
              <div className="p-6 sm:p-8 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-brand-navy mb-4 leading-snug">{review.title}</h3>
                <div className="space-y-3 mb-6 flex-grow">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-brand-orange block mb-0.5">고객 상황</span>
                      <p className="text-slate-700 text-sm font-medium">{review.situation}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-brand-blue block mb-0.5">상담 과정</span>
                      <p className="text-slate-700 text-sm font-medium">{review.process}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6 relative">
                  <MessageCircle className="w-5 h-5 text-slate-300 absolute top-4 left-4" />
                  <p className="text-slate-600 text-sm leading-relaxed pl-8 break-keep">"{review.review}"</p>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium pt-4 border-t border-slate-100 mt-auto">
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {review.region}</span>
                  <span className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4" /> {review.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold text-slate-400 bg-white border border-slate-200 py-2.5 px-6 rounded-full inline-block">
            * {feed.isSample !== false ? '이해를 돕기 위한 샘플 사례이며, home-feed.json으로 교체할 수 있습니다.' : '고객 후기는 개인정보를 가려 게시합니다.'}
          </p>
        </div>
      </div>
    </section>
  );
}
