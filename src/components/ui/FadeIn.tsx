import type { PropsWithChildren, CSSProperties } from 'react';

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

type FadeInProps = PropsWithChildren<{
  className?: string;
  delay?: number;
}>;

export default function FadeIn({ children, className = '', delay = 0 }: FadeInProps) {
  const style: CSSProperties = {
    transitionTimingFunction: EASE,
    transitionDelay: `${delay}ms`,
  };

  return (
    <div
      className={`will-change-transform motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:transition-none transition-[opacity,transform] duration-500 opacity-100 translate-y-0 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
