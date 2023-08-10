'use client';

import { useState, FC } from 'react';
import styles from './Plus.module.scss';
import { FaPlus } from 'react-icons/fa';
import PlusModal from './modal/PlusModal';

const Plus: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleShowModal = () => {
    setIsOpen(true);
  };

  const handleHideModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.plus}>
      <button type="button" onClick={handleShowModal} aria-label="Open Modal">
        <FaPlus size={20} />
      </button>

      {isOpen && <PlusModal onClose={handleHideModal} />}
    </div>
  );
};

export default Plus;
