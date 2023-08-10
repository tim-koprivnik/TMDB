'use client';

import {
  RefObject,
  FC,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  FormEvent,
} from 'react';
import styles from './SearchForm.module.scss';
import { RootState } from '../../../_store/store';
import { FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useSelector } from 'react-redux';

interface SearchFormProps {
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFormSubmit: (e: FormEvent) => void;
  onInputClick: () => void;
  onClearInput: () => void;
  setShowTrending: Dispatch<SetStateAction<boolean>>;
  inputRef: RefObject<HTMLInputElement>;
  inputValue: string;
}

const SearchForm: FC<SearchFormProps> = ({
  onInputChange,
  onFormSubmit,
  onInputClick,
  onClearInput,
  setShowTrending,
  inputRef,
  inputValue,
}) => {
  const searchQuery = useSelector(
    (state: RootState) => state.search.searchQuery
  );

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowTrending(false);
    }, 200);
  };

  const handleInputFocus = () => {
    if (searchQuery !== '') {
      setShowTrending(true);
    }
  };

  return (
    <form className={styles['search-form']} onSubmit={onFormSubmit}>
      <FaSearch />
      <div className={styles['input-wrapper']}>
        <input
          type="text"
          placeholder="Search for a movie, tv show, person..."
          aria-label="Search for movies or TV shows"
          value={inputValue}
          onChange={onInputChange}
          onClick={onInputClick}
          ref={inputRef}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
        />
        {searchQuery && (
          <IoClose
            size={20}
            className={styles['close-icon']}
            onClick={onClearInput}
          />
        )}
      </div>
    </form>
  );
};

export default SearchForm;
