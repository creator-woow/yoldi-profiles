'use client';

import { FC, PropsWithChildren, useEffect } from 'react';
import { createPortal } from 'react-dom';

export const MODAL_CONTAINER_ID = 'modal-container';

interface ModalProps extends PropsWithChildren {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Modal: FC<ModalProps> = ({ children, isOpen, onClose }) => {
  // todo: fix document is not defined error
  const container = document.getElementById(MODAL_CONTAINER_ID);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onClose) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const content = (
    <div className="absolute size-full">
      <div
        className="absolute size-full bg-overlay"
        onClick={onClose}
      />
      {children}
    </div>
  );

  return isOpen && container && createPortal(content, container);
};
