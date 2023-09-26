'use client';

import styles from './MenuList.module.scss';
import { useState, FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu } from '../../../_data/menu-data';
import SubMenuList from '../sub-menu/SubMenuList';

interface MenuListProps {
  items: Menu;
}

const MenuList: FC<MenuListProps> = ({ items }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const handleShowDropdown = () => {
    setIsDropdownOpen(true);
  };

  const handleHideDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleNavigate = (url: string) => {
    setIsDropdownOpen(false);
    if (url.startsWith('http')) {
      window.open(url, '_blank');
    } else {
      router.push(url);
    }
  };

  return (
    <li
      className={styles['menu-item']}
      onMouseEnter={handleShowDropdown}
      onMouseLeave={handleHideDropdown}
    >
      {items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={isDropdownOpen}
          >
            {items.label}
          </button>
          <SubMenuList
            items={items.submenu}
            dropdown={isDropdownOpen}
            onNavigate={handleNavigate}
          />
        </>
      ) : (
        <Link
          href={items.url}
          onClick={e => {
            e.preventDefault();
            handleNavigate(items.url);
          }}
        >
          {items.label}
        </Link>
      )}
    </li>
  );
};

export default MenuList;
