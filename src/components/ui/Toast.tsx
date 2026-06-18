import { useEffect } from 'react';
import { createPortal } from 'react-dom';

type ToastPlacement = 'bottom-right' | 'top-right';

type ToastProps = {
  message: string | null;
  onDismiss: () => void;
  duration?: number;
  title?: string;
  iconClassName?: string;
  placement?: ToastPlacement;
};

export default function Toast({
  message,
  onDismiss,
  duration = 4000,
  title = 'Wallet required',
  iconClassName = 'fas fa-wallet',
  placement = 'bottom-right',
}: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(onDismiss, duration);
    return () => window.clearTimeout(timer);
  }, [message, onDismiss, duration]);

  if (!message) return null;

  return createPortal(
    <div
      className={`site-toast site-toast--${placement}`}
      role="status"
      aria-live="polite"
    >
      <div className="site-toast__panel">
        <div className="site-toast__icon" aria-hidden="true">
          <i className={iconClassName} />
        </div>
        <div className="site-toast__content">
          <p className="site-toast__title">{title}</p>
          <p className="site-toast__message">{message}</p>
        </div>
        <button type="button" className="site-toast__close" onClick={onDismiss} aria-label="Dismiss notification">
          <i className="fas fa-times" aria-hidden="true" />
        </button>
      </div>
    </div>,
    document.body,
  );
}
