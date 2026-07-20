import React, { useEffect, useState } from 'react';

export function ToastHost() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    let timer: number | undefined;
    const onToast = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      setMessage(detail || '');
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setMessage(''), 3200);
    };
    window.addEventListener('danbi-toast', onToast);
    return () => {
      window.removeEventListener('danbi-toast', onToast);
      window.clearTimeout(timer);
    };
  }, []);

  if (!message) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[70] max-w-sm w-[calc(100%-2rem)] px-4 py-3 rounded-xl bg-brand-navy text-white text-sm font-medium text-center shadow-xl break-keep animate-[slideIn_0.3s_ease-out]">
      {message}
    </div>
  );
}
