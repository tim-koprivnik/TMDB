'use client';

import { forwardRef, useRef, FC, ReactNode } from 'react';
import styles from './Modal.module.scss';
import useOutsideClick from '../../../_hooks/useOutsideClick';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  className?: string;
}

const Modal: FC<ModalProps> = forwardRef<HTMLDivElement, ModalProps>(
  ({ children, onClose, className = '' }, ref) => {
    const defaultRef = useRef<HTMLDivElement>(null);
    const modalRef = ref || defaultRef;
    useOutsideClick(modalRef as React.RefObject<HTMLDivElement>, onClose);

    return (
      <div className={`${styles.modal} ${className}`} ref={modalRef}>
        <div className={styles['modal-content']}>{children}</div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';
export default Modal;
