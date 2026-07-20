import React from 'react';
import { MessageCircle } from 'lucide-react';
import { openKakaoWithPrefill } from '../lib/consult';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'kakao';
  icon?: React.ComponentType<{ className?: string }>;
  as?: any;
  to?: string;
  href?: string;
  className?: string;
  children?: React.ReactNode;
};

export const Button = ({
  children,
  variant = 'primary',
  className = '',
  icon: Icon,
  as: Component = 'button',
  ...props
}: ButtonProps) => {
  const baseStyle =
    'inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-all duration-200 text-[15px] sm:text-base';
  const variants = {
    primary: 'bg-brand-navy hover:bg-brand-navy-dark text-white shadow-sm',
    secondary: 'bg-brand-blue hover:bg-sky-700 text-white shadow-sm',
    accent: 'bg-brand-orange hover:bg-orange-700 text-white shadow-md hover:shadow-lg',
    outline: 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300',
    kakao: 'bg-kakao hover:bg-[#FADA0A] text-kakao-text shadow-sm',
  };

  return (
    <Component className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </Component>
  );
};

export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  id?: string;
}> = ({ children, className = '', hover = false, id }) => (
  <div
    id={id}
    className={`bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 ${
      hover
        ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-brand-light shadow-sm'
        : 'shadow-sm'
    } ${className}`}
  >
    {children}
  </div>
);

export const KakaoCta = ({
  children,
  className = '',
  variant = 'kakao',
  message,
  showIcon = true,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: 'kakao' | 'outline';
  message?: string;
  showIcon?: boolean;
}) => (
  <Button
    type="button"
    variant={variant}
    className={className}
    icon={showIcon ? MessageCircle : undefined}
    onClick={async () => {
      const copied = await openKakaoWithPrefill(message || '단비카 상담 문의합니다.');
      if (copied) {
        window.dispatchEvent(
          new CustomEvent('danbi-toast', {
            detail: '상담 문구가 복사되었습니다. 카카오톡에 붙여넣어 주세요.',
          }),
        );
      }
    }}
  >
    {children}
  </Button>
);
