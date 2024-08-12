'use client';

import { FC, PropsWithChildren, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { clsx } from 'shared/lib';

export const MODAL_CONTAINER_ID = 'modal-container';

interface ModalProps extends PropsWithChildren {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

const Modal: FC<ModalProps> = ({ children, isOpen, className, onClose }) => {
  const container = document.getElementById(MODAL_CONTAINER_ID);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onClose) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden';
      return () => {
        document.documentElement.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  const content = (
    <div className="absolute inset-0 overflow-hidden tablet:fixed">
      <div
        className="absolute size-full bg-overlay"
        onClick={onClose}
      />
      <div
        className={clsx(
          'absolute bg-primary size-full overflow-auto tablet:h-auto tablet:w-auto tablet:max-h-[98dvh] tablet:max-w-[98dvw]',
          'tablet:rounded-md tablet:border-1 tablet:border-primary tablet:centered-absolute',
          className,
        )}
      >
        {children}
      </div>
    </div>
  );

  return isOpen && container && createPortal(content, container);
};

export default Modal;
