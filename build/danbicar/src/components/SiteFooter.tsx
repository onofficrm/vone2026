import React from 'react';
import { Link } from 'react-router-dom';
import { CarFront, MessageCircle } from 'lucide-react';
import { openKakaoWithPrefill } from '../lib/consult';

export function SiteFooter() {
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
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 border-b border-slate-800 pb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <CarFront className="w-8 h-8 text-brand-light" />
              <span className="text-2xl font-bold text-white tracking-tight">단비카</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              개인회생, 저신용 전문 중고차 할부 상담.
              <br />
              어려운 상황에서도 최선의 방법을 찾습니다.
            </p>
            <div className="text-2xl font-bold text-white mb-2">1599-4950</div>
            <button
              type="button"
              onClick={openKakao}
              className="inline-flex items-center gap-2 text-sm text-[#FEE500] hover:text-[#F4DC00] font-semibold transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> 카카오톡 상담
            </button>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">안내</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  회사소개
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link to="/guide" className="hover:text-white transition-colors">
                  상담 가이드
                </Link>
              </li>
              <li>
                <Link to="/process" className="hover:text-white transition-colors">
                  진행 일정
                </Link>
              </li>
              <li>
                <Link to="/status" className="hover:text-white transition-colors">
                  상담 진행 조회
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link to="/documents" className="hover:text-white transition-colors">
                  서류 안내
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 text-xs space-y-2 text-slate-500 leading-relaxed">
            <p>
              <strong className="text-slate-400">대표자명:</strong> [관리자 입력: 대표자명]{' '}
              <span className="mx-2 text-slate-700">|</span>{' '}
              <strong className="text-slate-400">사업자등록번호:</strong> [관리자 입력: 사업자등록번호]
            </p>
            <p>
              <strong className="text-slate-400">자동차매매업 등록번호:</strong> [관리자 입력: 자동차매매업 등록번호]{' '}
              <span className="mx-2 text-slate-700">|</span>{' '}
              <strong className="text-slate-400">통신판매업 신고번호:</strong> [관리자 입력: 통신판매업 신고번호]
            </p>
            <p>
              <strong className="text-slate-400">사업장 주소:</strong> [관리자 입력: 사업장 주소]
            </p>
            <p>
              <strong className="text-slate-400">개인정보관리책임자:</strong> [관리자 입력: 개인정보관리책임자]
            </p>
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

        <div className="mt-8 text-center text-xs text-slate-600">© 2026 Danbi Car. All rights reserved.</div>
      </div>
    </footer>
  );
}
