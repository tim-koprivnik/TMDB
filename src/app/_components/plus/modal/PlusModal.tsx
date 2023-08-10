'use client';

import { FC } from 'react';
import Modal from '../../UI/modal/Modal';
import styles from './PlusModal.module.scss';

interface PlusModalProps {
  onClose: () => void;
}

const PlusModal: FC<PlusModalProps> = ({ onClose }) => (
  <Modal onClose={onClose} className={styles['plus-modal']}>
    <p>
      Can't find a movie or TV show? <br />
      Login to create it.
    </p>
  </Modal>
);

export default PlusModal;
