'use client';

import { FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

export const MODAL_CONTAINER_ID = 'modal-container';

interface ModalProps extends PropsWithChildren {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Modal: FC<ModalProps> = ({ children, isOpen, onClose }) => {
  // todo: fix document is not defined error
  const container = document.getElementById(MODAL_CONTAINER_ID);

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
