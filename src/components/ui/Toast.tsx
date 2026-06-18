import { useEffect } from 'react';
import { createPortal } from 'react-dom';

type ToastProps = {
  message: string | null;
  onDismiss: () => void;
  duration?: number;
};

export default function Toast({ message, onDismiss, duration = 4000 }: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(onDismiss, duration);
    return () => window.clearTimeout(timer);
  }, [message, onDismiss, duration]);

  if (!message) return null;

  return createPortal(
    <div className="site-toast" role="status" aria-live="polite">
      <div className="site-toast__panel">
        <div className="site-toast__icon" aria-hidden="true">
          <i className="fas fa-wallet" />
        </div>
        <div className="site-toast__content">
          <p className="site-toast__title">Wallet required</p>
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
