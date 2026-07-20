import React from 'react';
import { Clock } from 'lucide-react';
import { BUSINESS_HOURS } from '../lib/consult';

export function ResponseHoursNotice({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 rounded-2xl bg-brand-navy/5 border border-brand-navy/10 px-5 py-4 ${className}`}
    >
      <div className="flex items-center gap-2 text-brand-navy font-bold shrink-0">
        <Clock className="w-5 h-5 text-brand-blue" />
        상담 운영 안내
      </div>
      <div className="text-sm text-slate-600 break-keep leading-relaxed">
        <span className="font-semibold text-slate-800">{BUSINESS_HOURS.weekdays}</span>
        <span className="mx-2 text-slate-300">|</span>
        <span>{BUSINESS_HOURS.saturday}</span>
        <span className="mx-2 text-slate-300">|</span>
        <span>{BUSINESS_HOURS.sunday}</span>
        <span className="block sm:inline sm:before:content-['·'] sm:before:mx-2 text-brand-blue font-semibold mt-1 sm:mt-0">
          {BUSINESS_HOURS.response}
        </span>
      </div>
    </div>
  );
}
