'use client';

import styles from './LanguageSwitcher.module.scss';
import { useState, FC } from 'react';
import languages, { Language } from '../../_data/languages-data';
import LanguageSwitcherModal from './modal/LanguageSwitcherModal';

const LanguageSwitcher: FC = () => {
  const [language, setLanguage] = useState<Language>(languages[0]);
  const [fallbackLanguage, setFallbackLanguage] = useState<Language>(
    languages[0]
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleShowModal = () => {
    setIsOpen(true);
  };

  const handleHideModal = () => {
    setIsOpen(false);
  };

  const handleLanguageChange = (newLanguage: Language) => {
    if (language.code !== newLanguage.code) {
      setLanguage(newLanguage);
    }
  };

  const handleFallbackLanguageChange = (newFallbackLanguage: Language) => {
    if (fallbackLanguage.code !== newFallbackLanguage.code) {
      setFallbackLanguage(newFallbackLanguage);
    }
  };

  return (
    <div className={styles['language-switcher']}>
      <button type="button" onClick={handleShowModal}>
        {language.code.toUpperCase()}
      </button>

      {isOpen && (
        <LanguageSwitcherModal
          selectedLanguage={language.code}
          selectedFallbackLanguage={fallbackLanguage.code}
          onClose={handleHideModal}
          onLanguageChange={handleLanguageChange}
          onFallbackLanguageChange={handleFallbackLanguageChange}
          options={languages}
        />
      )}
    </div>
  );
};

export default LanguageSwitcher;
