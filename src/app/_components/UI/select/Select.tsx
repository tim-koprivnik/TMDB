'use client';

import styles from './Select.module.scss';
import {
  useState,
  useRef,
  useEffect,
  FC,
  ChangeEvent,
  KeyboardEvent,
} from 'react';
import useOutsideClick from '../../../_hooks/useOutsideClick';
import { FaSearch } from 'react-icons/fa';

interface SelectOption {
  code: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  id?: string;
  onValueChange: (option: SelectOption) => void;
  value?: string;
  onHandleReset?: () => void;
  showInput?: boolean;
  className?: string;
}

const Select: FC<SelectProps> = ({
  options = [],
  id = '',
  onValueChange,
  value = '',
  onHandleReset,
  showInput = true,
  className = '',
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption>(
    options[0]
  );
  const [filterValue, setFilterValue] = useState('');
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number | null>(
    null
  );

  const selectRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(filterValue)
  );

  const handleFilterInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value.toLowerCase());
  };

  const handleFilterKeyDown = (e: KeyboardEvent) => {
    if (e.shiftKey && e.key === 'Tab') {
      setShowOptions(false);
      setFilterValue('');
    } else if (e.key === 'Enter' && filteredOptions.length > 0) {
      setSelectedOption(filteredOptions[0]);
      setShowOptions(false);
      setFilterValue('');
    }
  };

  const handleOptionClick = (option: SelectOption) => {
    setSelectedOption(option);
    setShowOptions(false);
    onValueChange(option);
    onHandleReset?.();
    setFilterValue('');
    setFocusedOptionIndex(null);
  };

  const handleSearchboxClick = () => {
    setShowOptions(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleOptionKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (!e.shiftKey && focusedOptionIndex === filteredOptions.length - 1) {
        setShowOptions(false);
        setFilterValue('');
      } else if (e.shiftKey && focusedOptionIndex === 0) {
        setShowOptions(false);
        setFilterValue('');
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.shiftKey && e.key === 'Tab') {
      setShowOptions(false);
      setFilterValue('');
    }
  };

  useOutsideClick(selectRef, () => {
    setShowOptions(false);
    setFilterValue('');
  });

  useEffect(() => {
    if (value) {
      const option = options.find(o => o.code === value);
      if (option) {
        setSelectedOption(option);
      }
    }
  }, [value, options]);

  return (
    <div
      className={`${styles.select} ${className}`}
      ref={selectRef}
      onKeyDown={handleKeyDown}
      role="presentation"
    >
      <div
        role="combobox"
        aria-haspopup="true"
        aria-controls="option-list"
        aria-expanded={showOptions}
        className={`${styles.control} ${
          showOptions ? `${styles.isFocused}` : ''
        }`}
        onClick={handleSearchboxClick}
        onKeyDown={handleSearchboxClick}
        tabIndex={0}
        aria-label="Select option"
      >
        <div className={styles.value}>
          {selectedOption ? selectedOption.label : 'Select...'}
        </div>
        <div
          className={`${styles.indicator} ${
            showOptions ? `${styles.isExpanded}` : ''
          }`}
        >
          <span className={styles.arrow} />
        </div>
      </div>

      {showOptions && (
        <div className={styles.options} id="option-list">
          {showInput && (
            <>
              <input
                id={id}
                type="text"
                className={styles.input}
                placeholder=""
                value={filterValue}
                onChange={handleFilterInput}
                onKeyDown={handleFilterKeyDown}
                ref={inputRef}
                aria-label="Search for option"
              />
              <FaSearch size={12} className={styles['search-icon']} />
            </>
          )}

          <ul className={styles.list}>
            {filteredOptions.map((option, index) => (
              <li key={option.code} className={styles.option}>
                <button
                  type="button"
                  className={`${
                    selectedOption === option ? `${styles.isSelected}` : ''
                  }`}
                  onClick={() => handleOptionClick(option)}
                  onFocus={() => setFocusedOptionIndex(index)}
                  onKeyDown={handleOptionKeyDown}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;
