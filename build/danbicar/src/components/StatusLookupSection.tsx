import React, { useMemo, useState } from 'react';
import { Search, ShieldCheck } from 'lucide-react';

type LookupItem = {
  tail: string;
  name_mask: string;
  status: string;
  created_at?: string;
  type?: string;
  car?: string;
};

const LOOKUP_URL = '/plugin/onoff-builder-bridge/imports/danbicar/inquiry-lookup.json';

const sampleLookup: LookupItem[] = [
  { tail: '1234', name_mask: '김○○님', status: '상담 접수', created_at: '2026-07-18', type: '개인회생 인가', car: '아반떼' },
  { tail: '5678', name_mask: '박○○님', status: '상담 진행', created_at: '2026-07-19', type: '저신용', car: '레이' },
];

export function StatusLookupSection() {
  const [tail, setTail] = useState('');
  const [items, setItems] = useState<LookupItem[] | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const normalized = useMemo(() => tail.replace(/\D/g, '').slice(-4), [tail]);

  const search = async () => {
    if (normalized.length !== 4) {
      setSearched(true);
      setItems([]);
      return;
    }
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(LOOKUP_URL, { credentials: 'same-origin', cache: 'no-store' });
      let list: LookupItem[] = sampleLookup;
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length) {
          list = data;
        }
      }
      setItems(list.filter((row) => String(row.tail) === normalized).slice(0, 5));
    } catch {
      setItems(sampleLookup.filter((row) => row.tail === normalized));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-brand-light/40" id="status-lookup">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-brand-blue font-bold text-sm mb-4">
            <Search className="w-5 h-5" />
            상담 진행 조회
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-4 tracking-tight">
            신청하신 상담 진행 상태를 확인해 보세요
          </h2>
          <p className="text-slate-600 break-keep">연락처 끝 4자리로 최근 접수 건을 조회합니다.</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm">
          <label className="block text-sm font-semibold text-slate-700 mb-2">연락처 끝 4자리</label>
          <div className="flex gap-2">
            <input
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={tail}
              onChange={(e) => setTail(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="예: 1234"
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
            <button
              type="button"
              onClick={search}
              disabled={loading}
              className="px-6 py-3 rounded-xl font-bold bg-brand-navy text-white hover:bg-brand-navy-dark disabled:opacity-50"
            >
              {loading ? '조회 중' : '조회'}
            </button>
          </div>

          {searched && (
            <div className="mt-6 space-y-3">
              {items && items.length > 0 ? (
                items.map((item, idx) => (
                  <div key={`${item.tail}-${idx}`} className="rounded-2xl border border-brand-blue/15 bg-brand-light/40 p-4">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="font-bold text-brand-navy">{item.name_mask}</span>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-white text-brand-blue border border-brand-blue/20">
                        {item.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 break-keep">
                      {item.type ? `${item.type}` : '상담 신청'}
                      {item.car ? ` · ${item.car}` : ''}
                      {item.created_at ? ` · ${item.created_at}` : ''}
                    </p>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-200 p-5 text-center text-slate-500 text-sm break-keep">
                  일치하는 최근 접수 내역이 없습니다. 접수 직후이거나 번호가 다른 경우 전화·카카오로 문의해 주세요.
                </div>
              )}
            </div>
          )}

          <p className="text-xs text-slate-400 mt-6 flex items-start gap-2 break-keep">
            <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
            개인정보 보호를 위해 전체 번호는 저장·표시하지 않고, 끝자리만으로 조회합니다.
          </p>
        </div>
      </div>
    </section>
  );
}
