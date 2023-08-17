'use client';

import {
  useState,
  useMemo,
  useRef,
  FC,
  ChangeEvent,
  FormEvent,
  useEffect,
} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { IconContext } from 'react-icons';
import { FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery } from '../../_store/search/searchSlice';
import { RootState } from '../../_store/store';
import { debounce } from '../../_utils/helpers';
import SearchModal from './modal/SearchModal';
import styles from './Search.module.scss';

interface SearchProps {
  showIcon?: boolean;
  showTrending?: boolean;
  setSelectedCategory?: (category: string) => void;
}

const Search: FC<SearchProps> = ({
  showIcon = false,
  showTrending = false,
  setSelectedCategory,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTrendingItems, setShowTrendingItems] = useState(showTrending);
  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const searchIconColor = useMemo(() => ({ color: '#04A1CF' }), []);
  const closeIconColor = useMemo(() => ({ color: 'white' }), []);

  const handleShowModal = () => {
    setIsOpen(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleHideModal = () => {
    setIsOpen(false);
  };

  const debouncedUpdateUrl = useMemo(
    () =>
      debounce((search: string) => {
        router.replace(`/search?query=${encodeURIComponent(search)}`);
      }, 300),
    [router]
  );

  const debouncedSetInputValue = useMemo(
    () => debounce(setInputValue, 300),
    []
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setShowTrendingItems(value !== '');
    setInputValue(value);
    debouncedSetInputValue(value);

    if (pathname === '/search') {
      debouncedUpdateUrl(value);
    }
  };

  const handleInputClick = () => {
    setShowTrendingItems(true);
  };

  const handleClearInput = () => {
    setShowTrendingItems(false);
    dispatch(setSearchQuery(''));
    setInputValue('');
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSelectedCategory?.('');
    setShowTrendingItems(false);
    router.replace(`/search?query=${encodeURIComponent(inputValue)}`);
  };

  const handleTrendingItemClick = (query: string) => {
    setSelectedCategory?.('');
    setShowTrendingItems(false);
    dispatch(setSearchQuery(query));
    router.replace(`/search/?query=${encodeURIComponent(query)}`);
  };

  useEffect(
    () => () => {
      dispatch(setSearchQuery(''));
    },
    [dispatch]
  );

  useEffect(
    () => () => {
      setInputValue('');
    },
    [isOpen]
  );

  return (
    <div className={styles.search}>
      {showIcon ? (
        <button type="button" onClick={handleShowModal}>
          {!isOpen && (
            <IconContext.Provider value={searchIconColor}>
              <FaSearch size={20} />
            </IconContext.Provider>
          )}
          {isOpen && (
            <IconContext.Provider value={closeIconColor}>
              <IoClose size={30} />
            </IconContext.Provider>
          )}
        </button>
      ) : null}

      {(isOpen || !showIcon) && (
        <SearchModal
          onClose={handleHideModal}
          onInputChange={handleInputChange}
          onClearInput={handleClearInput}
          onFormSubmit={handleFormSubmit}
          onInputClick={handleInputClick}
          onItemClick={handleTrendingItemClick}
          showTrending={showTrendingItems}
          setShowTrending={setShowTrendingItems}
          inputRef={inputRef}
          inputValue={inputValue}
        />
      )}
    </div>
  );
};

export default Search;
