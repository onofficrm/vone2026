export const KAKAO_URL = 'https://open.kakao.com/o/sILPODCi';
export const PHONE_TEL = 'tel:15994950';
export const PHONE_DISPLAY = '1599-4950';

export const BUSINESS_HOURS = {
  weekdays: '평일 09:00 – 18:00',
  saturday: '토요일 10:00 – 14:00',
  sunday: '일요일·공휴일 휴무',
  response: '영업시간 기준 평균 30분 내 연락',
};

/** 카카오 오픈채팅은 메시지 프리필이 없어, 내용을 복사한 뒤 채팅방을 엽니다. */
export async function openKakaoWithPrefill(message?: string): Promise<boolean> {
  const text = (message || '단비카 상담 문의합니다. 현재 상황을 안내해 주세요.').trim();
  let copied = false;

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      copied = true;
    }
  } catch {
    copied = false;
  }

  if (!copied) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      copied = document.execCommand('copy');
      document.body.removeChild(ta);
    } catch {
      copied = false;
    }
  }

  window.open(KAKAO_URL, '_blank', 'noopener,noreferrer');
  return copied;
}

export function buildSituationMessage(situation: string): string {
  return `[단비카 상담]\n상황: ${situation}\n상담 부탁드립니다.`;
}
