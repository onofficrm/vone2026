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

export type FeedCar = {
  id: number;
  manufacturer: string;
  name: string;
  year: string;
  mileage: string;
  fuel: string;
  type: string;
  image: string;
  priceLabel?: string;
  monthlyLabel?: string;
  stock?: string;
};

export type HomeFeed = {
  updatedAt?: string;
  isSample?: boolean;
  consultations: FeedConsultation[];
  reviews: FeedReview[];
  cars?: FeedCar[];
};

export const FEED_URL = '/plugin/onoff-builder-bridge/imports/danbicar/home-feed.json';
export const FEED_API_URL = '/api/danbi-feed.php';

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
  cars: [],
};

function mergeFeed(data: HomeFeed): HomeFeed {
  return {
    ...fallbackFeed,
    ...data,
    consultations: data.consultations?.length ? data.consultations : fallbackFeed.consultations,
    reviews: data.reviews?.length ? data.reviews : fallbackFeed.reviews,
    cars: data.cars?.length ? data.cars : fallbackFeed.cars,
  };
}

export function useHomeFeed() {
  const [feed, setFeed] = useState<HomeFeed>(fallbackFeed);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    const ctrl = new AbortController();
    const timer = window.setTimeout(() => ctrl.abort(), 4000);

    // 정적 JSON 우선 (PHP/DB 장애와 무관). API는 보조.
    fetch(FEED_URL, { credentials: 'same-origin', signal: ctrl.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: HomeFeed) => {
        if (!alive || !data) return;
        setFeed(mergeFeed(data));
      })
      .catch(() => {
        /* keep fallback */
      })
      .finally(() => {
        window.clearTimeout(timer);
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
      ctrl.abort();
      window.clearTimeout(timer);
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
