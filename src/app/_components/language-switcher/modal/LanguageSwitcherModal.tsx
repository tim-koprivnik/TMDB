'use client';

import { FC } from 'react';
import styles from './LanguageSwitcherModal.module.scss';
import Modal from '../../UI/modal/Modal';
import Select from '../../UI/select/Select';
import { Language } from '../../../_data/languages-data';

interface LanguageSwitcherModalProps {
  selectedLanguage: string;
  selectedFallbackLanguage: string;
  onLanguageChange: (newLanguage: Language) => void;
  onFallbackLanguageChange: (newFallbackLanguage: Language) => void;
  onClose: () => void;
  options: Language[];
}

const LanguageSwitcherModal: FC<LanguageSwitcherModalProps> = ({
  selectedLanguage,
  selectedFallbackLanguage,
  onLanguageChange,
  onFallbackLanguageChange,
  onClose,
  options,
}) => {
  const handleLanguageReset = () => {
    onLanguageChange(options[0]);
  };

  return (
    <Modal onClose={onClose} className={styles['language-switcher-modal']}>
      <h3>Language Preferences</h3>

      <div className={styles['form-control']}>
        <label htmlFor="default-language">Default Language</label>
        <button
          type="button"
          className={styles.reset}
          onClick={handleLanguageReset}
        >
          Reset
        </button>
        <Select
          key="Default language"
          id="default-language"
          value={selectedLanguage}
          onValueChange={onLanguageChange}
          options={options}
        />
      </div>

      <div className={styles['form-control']}>
        <label htmlFor="fallback-language">Fallback Language</label>
        <Select
          key="Fallback language"
          id="fallback-language"
          value={selectedFallbackLanguage}
          onValueChange={onFallbackLanguageChange}
          options={options}
        />
      </div>
    </Modal>
  );
};

export default LanguageSwitcherModal;
