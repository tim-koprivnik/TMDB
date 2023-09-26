'use client';

import styles from './SearchModal.module.scss';
import {
  useEffect,
  FC,
  RefObject,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  FormEvent,
} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Modal from '../../UI/modal/Modal';
import SearchForm from '../form/SearchForm';
import Trending from '../trending/Trending';

interface SearchModalProps {
  onClose: () => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFormSubmit: (e: FormEvent) => void;
  onInputClick: () => void;
  onClearInput: () => void;
  onItemClick: (query: string) => void;
  showTrending?: boolean;
  setShowTrending: Dispatch<SetStateAction<boolean>>;
  inputRef: RefObject<HTMLInputElement>;
  inputValue: string;
}

const SearchModal: FC<SearchModalProps> = ({
  onClose,
  onInputChange,
  onFormSubmit,
  onInputClick,
  onClearInput,
  onItemClick,
  showTrending = false,
  setShowTrending,
  inputRef,
  inputValue,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes('/search')) {
      setShowTrending(false);
    }
  }, [pathname, setShowTrending]);

  return (
    <Modal onClose={onClose} className={styles['search-modal']}>
      <div className={styles['search-modal-content']}>
        <SearchForm
          inputValue={inputValue}
          inputRef={inputRef}
          setShowTrending={setShowTrending}
          onInputChange={onInputChange}
          onFormSubmit={onFormSubmit}
          onInputClick={onInputClick}
          onClearInput={onClearInput}
        />
        {showTrending && (
          <Trending
            inputValue={inputValue}
            showTrending={showTrending}
            setShowTrending={setShowTrending}
            onItemClick={onItemClick}
          />
        )}
      </div>
    </Modal>
  );
};

export default SearchModal;
