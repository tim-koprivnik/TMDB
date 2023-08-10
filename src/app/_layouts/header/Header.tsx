'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Header.module.scss';
import Navbar from '../../_components/navbar/Navbar';
import LanguageSwitcher from '../../_components/language-switcher/LanguageSwitcher';
import Plus from '../../_components/plus/Plus';
import Login from '../../_components/login/Login';
import Join from '../../_components/join/Join';
import Search from '../../_components/search/Search';
import Logo from '../../_components/logo/Logo';

const Header: FC = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleJoinClick = () => {
    router.push('/join');
  };

  return (
    <header className={styles.header}>
      <div className={styles['header-wrap']}>
        <div className={styles['header-nav-wrap']}>
          <Logo />
          <Navbar />
        </div>
        <div className={styles['header-additional-wrap']}>
          <Plus />
          <LanguageSwitcher />
          <Login onClick={handleLoginClick} />
          <Join onClick={handleJoinClick} />
          <Search showIcon showTrending />
        </div>
      </div>
    </header>
  );
};

export default Header;
