import dynamic from 'next/dynamic';

export const ModalProvider = dynamic(() => import('./Modal'), {
  ssr: false,
});
