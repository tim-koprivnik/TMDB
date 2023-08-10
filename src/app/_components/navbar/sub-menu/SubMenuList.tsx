'use client';

import { FC } from 'react';
import styles from './SubMenuList.module.scss';
import { Submenu } from '../../../_data/menu-data';

interface SubMenuListProps {
  items: Submenu[];
  dropdown: boolean;
  onNavigate: (url: string) => void;
}

const SubMenuList: FC<SubMenuListProps> = ({ items, dropdown, onNavigate }) => {
  const handleNavigate = (url: string) => {
    onNavigate(url);
  };

  return (
    <ul className={`${styles.dropdown} ${dropdown ? styles.show : ''}`}>
      {items.map(item => (
        <li key={item.label} className={styles['menu-item']}>
          <button type="button" onClick={() => handleNavigate(item.url)}>
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SubMenuList;