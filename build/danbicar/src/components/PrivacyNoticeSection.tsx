import React from 'react';
import { Lock } from 'lucide-react';

export function PrivacyNoticeSection() {
  return (
    <section className="py-16 bg-slate-50 border-t border-slate-100" id="privacy">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 text-brand-navy font-bold mb-4">
          <Lock className="w-5 h-5" />
          개인정보 수집·이용 안내
        </div>
        <h2 className="text-2xl font-bold text-brand-navy mb-4 tracking-tight">상담을 위한 최소 정보만 수집합니다</h2>
        <div className="space-y-3 text-sm text-slate-600 leading-relaxed break-keep">
          <p>
            <strong className="text-slate-800">수집 항목:</strong> 이름, 연락처, 상담 관련 선택 정보(현재 상태·희망 시간·문의 내용)
          </p>
          <p>
            <strong className="text-slate-800">이용 목적:</strong> 중고차 할부·차량 상담 연락 및 안내
          </p>
          <p>
            <strong className="text-slate-800">보유 기간:</strong> 상담 목적 달성 후 지체 없이 파기(관련 법령에 따라 보관이 필요한 경우 해당 기간)
          </p>
          <p>
            <strong className="text-slate-800">동의 거부:</strong> 동의를 거부할 수 있으나, 이 경우 상담 신청이 제한될 수 있습니다.
          </p>
          <p className="text-slate-500">
            문의: 1599-4950 · 카카오톡 오픈채팅. 자세한 방침은 추후 관리자 입력 후 별도 페이지로 안내됩니다.
          </p>
        </div>
      </div>
    </section>
  );
}
