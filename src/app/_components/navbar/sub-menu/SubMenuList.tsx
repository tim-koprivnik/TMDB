'use client';

import { FC } from 'react';
import Link from 'next/link';
import styles from './SubMenuList.module.scss';
import { Submenu } from '../../../_data/menu-data';

interface SubMenuListProps {
  items: Submenu[];
  dropdown: boolean;
  onNavigate: (url: string) => void;
}

const SubMenuList: FC<SubMenuListProps> = ({ items, dropdown, onNavigate }) => {
  return (
    <ul className={`${styles.dropdown} ${dropdown ? styles.show : ''}`}>
      {items.map(item => (
        <li key={item.label} className={styles['menu-item']}>
          <Link
            href={item.url}
            onClick={e => {
              e.preventDefault();
              onNavigate(item.url);
            }}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SubMenuList;
