'use client';

import styles from './Navbar.module.scss';
import { FC } from 'react';
import menuData, { Menu } from '../../_data/menu-data';
import MenuList from './menu/MenuList';

const Navbar: FC = () => (
  <nav>
    <ul className={styles.nav}>
      {menuData.map((item: Menu) => (
        <MenuList items={item} key={item.label} />
      ))}
    </ul>
  </nav>
);

export default Navbar;
