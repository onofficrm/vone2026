import React, { useEffect, useState } from 'react';
import { ShieldCheck } from 'lucide-react';

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all';

const Button = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' | 'accent' }) => {
  const variants = {
    primary: 'bg-brand-navy hover:bg-brand-navy-dark text-white shadow-sm',
    secondary: 'bg-brand-blue hover:bg-sky-700 text-white shadow-sm',
    accent: 'bg-brand-orange hover:bg-orange-700 text-white shadow-md',
    outline: 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50',
  };
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-all duration-200 text-[15px] sm:text-base ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

async function fetchInquiryToken(): Promise<string> {
  const res = await fetch('/proc/inquiry-token.php', {
    method: 'GET',
    credentials: 'same-origin',
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error('token');
  const data = await res.json();
  if (!data?.token) throw new Error('token');
  return String(data.token);
}

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    status: '',
    timeSlot: '',
    message: '',
    agreement: false,
    website_url: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleSetConsultation = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      setFormData((prev) => ({
        ...prev,
        message: prev.message.trim()
          ? `${detail}\n\n${prev.message}`
          : `${detail}\n\n상담 부탁드립니다.`,
      }));
    };
    window.addEventListener('set-consultation', handleSetConsultation);
    return () => window.removeEventListener('set-consultation', handleSetConsultation);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (name === 'phone') {
      setFormData((prev) => ({ ...prev, phone: value.replace(/[^0-9-]/g, '') }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const buildMessage = () => {
    const parts = [
      formData.status ? `현재 상태: ${formData.status}` : '',
      formData.timeSlot ? `희망 상담 시간: ${formData.timeSlot}` : '',
      formData.message.trim(),
    ].filter(Boolean);
    let msg = parts.join('\n');
    if (msg.length < 10) {
      msg = `${msg}\n단비카 무료 상담을 신청합니다.`.trim();
    }
    return msg;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.agreement) {
      setError('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }
    if (!formData.timeSlot) {
      setError('희망 상담 시간을 선택해 주세요.');
      return;
    }
    if (isSubmitting) return;
    if (formData.website_url) return;

    setIsSubmitting(true);

    try {
      const token = await fetchInquiryToken();
      const body = new FormData();
      body.append('name', formData.name.trim());
      body.append('phone', formData.phone.trim());
      body.append('message', buildMessage());
      body.append('privacy_agree', '1');
      body.append('onoff_inquiry_token', token);
      body.append('referer_page', window.location.href);
      body.append('website_url', formData.website_url);

      const res = await fetch('/proc/inquiry-submit.php', {
        method: 'POST',
        credentials: 'same-origin',
        body,
      });
      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        throw new Error(data?.message || '접수에 실패했습니다.');
      }

      setIsSubmitted(true);
      if (data.redirect_url) {
        window.setTimeout(() => {
          window.location.href = data.redirect_url;
        }, 1200);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : '접수에 실패했습니다.';
      setError(
        `${msg} 잠시 후 다시 시도하거나, 전화(1599-4950)·카카오톡으로 바로 상담해 주세요.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl p-8 sm:p-12 text-center shadow-lg border border-slate-100">
        <div className="w-16 h-16 bg-brand-light text-brand-blue rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-brand-navy mb-4 break-keep">
          상담 신청이 정상적으로 접수되었습니다.
        </h3>
        <p className="text-slate-600 text-lg mb-8 break-keep">담당자가 확인 후 순차적으로 연락드리겠습니다.</p>
        <Button type="button" onClick={() => setIsSubmitted(false)} variant="outline">
          새로운 상담 신청하기
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-100 text-left">
      <p className="text-sm text-slate-500 mb-6 break-keep">
        이름·연락처·상태·희망 시간만 남겨주시면 됩니다. 자세한 내용은 상담 시 함께 확인합니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            이름 <span className="text-brand-orange">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            maxLength={50}
            placeholder="홍길동"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            연락처 <span className="text-brand-orange">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            maxLength={30}
            placeholder="010-0000-0000"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            현재 상태 <span className="text-brand-orange">*</span>
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className={`${inputClass} bg-white`}
          >
            <option value="">선택해주세요</option>
            <option value="개인회생 신청 준비 중">개인회생 신청 준비 중</option>
            <option value="개인회생 진행 중">개인회생 진행 중</option>
            <option value="개인회생 인가">개인회생 인가</option>
            <option value="개인회생 면책">개인회생 면책</option>
            <option value="파산면책">파산면책</option>
            <option value="저신용">저신용</option>
            <option value="기존 할부 거절">기존 할부 거절</option>
            <option value="기타">기타</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            희망 상담 시간 <span className="text-brand-orange">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {['오전', '오후', '저녁', '시간 상관없음'].map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, timeSlot: slot }))}
                className={`px-3 py-3 rounded-xl text-sm font-bold border transition-colors ${
                  formData.timeSlot === slot
                    ? 'bg-brand-navy text-white border-brand-navy'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-brand-blue/40'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
          <input type="hidden" name="timeSlot" value={formData.timeSlot} required={false} />
          {!formData.timeSlot && (
            <p className="text-xs text-slate-400 mt-2">상담 가능한 시간대를 선택해 주세요.</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">문의 내용 (선택)</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            placeholder="월 납입 예산, 희망 차종 등 남기고 싶은 내용을 적어주세요."
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* honeypot */}
        <div className="hidden" aria-hidden="true">
          <label>
            website
            <input type="text" name="website_url" value={formData.website_url} onChange={handleChange} tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="md:col-span-2">
          <label className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer">
            <input
              type="checkbox"
              name="agreement"
              checked={formData.agreement}
              onChange={handleChange}
              required
              className="mt-1 w-5 h-5 rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
            />
            <div className="text-sm text-slate-600 break-keep leading-relaxed">
              <span className="font-semibold text-slate-800">[필수] 개인정보 수집 및 이용 동의</span>
              <br />
              단비카는 상담을 위해 최소한의 개인정보를 수집하며, 입력하신 정보는 차량 할부 상담 및 안내 목적으로만 사용됩니다.
            </div>
          </label>
        </div>
      </div>

      {error && (
        <div className="mt-6 p-4 rounded-xl bg-orange-50 border border-orange-100 text-sm text-orange-800 break-keep leading-relaxed">
          {error}
        </div>
      )}

      <div className="mt-8">
        <Button type="submit" variant="accent" className="w-full py-4 text-lg shadow-lg hover:shadow-xl" disabled={isSubmitting}>
          {isSubmitting ? '접수 중...' : '내 조건 무료로 확인하기'}
        </Button>
      </div>
    </form>
  );
}
