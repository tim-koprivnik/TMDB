'use client';

import { useState, FC } from 'react';
import { useRouter } from 'next/navigation';
import styles from './MenuList.module.scss';
import SubMenuList from '../sub-menu/SubMenuList';
import { Menu } from '../../../_data/menu-data';

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
          <a
            role="button"
            href="#"
            aria-haspopup="menu"
            aria-expanded={isDropdownOpen}
            onClick={e => {
              e.preventDefault();
            }}
          >
            {items.label}
          </a>
          <SubMenuList
            items={items.submenu}
            dropdown={isDropdownOpen}
            onNavigate={handleNavigate}
          />
        </>
      ) : (
        <a
          href={items.url}
          onClick={e => {
            e.preventDefault();
            handleNavigate(items.url);
          }}
        >
          {items.label}
        </a>
      )}
    </li>
  );
};

export default MenuList;
