import { useEffect, useState } from 'react';

export type FeedConsultation = {
  name: string;
  type: string;
  car: string;
  status: string;
  tone?: 'neutral' | 'blue' | 'orange';
};

export type FeedReview = {
  id: number;
  title: string;
  carName: string;
  situation: string;
  process: string;
  review: string;
  region: string;
  date: string;
  image: string;
};

export type HomeFeed = {
  updatedAt?: string;
  isSample?: boolean;
  consultations: FeedConsultation[];
  reviews: FeedReview[];
};

export const FEED_URL = '/plugin/onoff-builder-bridge/imports/danbicar/home-feed.json';

const fallbackFeed: HomeFeed = {
  updatedAt: '',
  isSample: true,
  consultations: [
    { name: '김○○님', type: '개인회생 인가', car: '카니발', status: '상담 접수', tone: 'neutral' },
    { name: '박○○님', type: '저신용 직장인', car: '아반떼', status: '상담 진행', tone: 'blue' },
    { name: '이○○님', type: '개인회생 진행 중', car: 'SUV', status: '상담 완료', tone: 'orange' },
    { name: '최○○님', type: '기존 할부 거절', car: '레이', status: '상담 접수', tone: 'neutral' },
  ],
  reviews: [],
};

export function useHomeFeed() {
  const [feed, setFeed] = useState<HomeFeed>(fallbackFeed);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetch(FEED_URL, { credentials: 'same-origin' })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: HomeFeed) => {
        if (!alive || !data) return;
        setFeed({
          ...fallbackFeed,
          ...data,
          consultations: data.consultations?.length ? data.consultations : fallbackFeed.consultations,
          reviews: data.reviews?.length ? data.reviews : fallbackFeed.reviews,
        });
      })
      .catch(() => {
        /* keep fallback */
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  return { feed, loading };
}

export function toneClass(tone?: string) {
  switch (tone) {
    case 'blue':
      return 'bg-brand-blue/10 text-brand-blue';
    case 'orange':
      return 'bg-brand-orange/10 text-brand-orange';
    default:
      return 'bg-slate-100 text-slate-600';
  }
}
