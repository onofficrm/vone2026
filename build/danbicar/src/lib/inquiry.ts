/** fetch with AbortController timeout (PHP hang 대비) */
export async function fetchWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit = {},
  timeoutMs = 6000,
): Promise<Response> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    window.clearTimeout(timer);
  }
}

const DRAFT_KEY = 'danbi_inquiry_draft_v1';

export type InquiryDraft = {
  name: string;
  phone: string;
  status: string;
  timeSlot: string;
  message: string;
  savedAt: string;
};

export function saveInquiryDraft(draft: Omit<InquiryDraft, 'savedAt'>) {
  try {
    const payload: InquiryDraft = { ...draft, savedAt: new Date().toISOString() };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
  } catch {
    /* ignore quota / private mode */
  }
}

export function loadInquiryDraft(): InquiryDraft | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as InquiryDraft;
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearInquiryDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* ignore */
  }
}

export function buildKakaoInquiryMessage(input: {
  name: string;
  phone: string;
  status: string;
  timeSlot: string;
  message: string;
}): string {
  return [
    '[단비카 웹 상담 신청]',
    `이름: ${input.name}`,
    `연락처: ${input.phone}`,
    input.status ? `현재 상태: ${input.status}` : '',
    input.timeSlot ? `희망 시간: ${input.timeSlot}` : '',
    '',
    input.message || '상담 부탁드립니다.',
  ]
    .filter((line) => line !== '')
    .join('\n');
}
