'use client';

import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Logo.module.scss';
import logoDesktop from 'public/assets/images/tmdb-logo.svg';
import logoMobile from 'public/assets/images/tmdb-logo-mobile.jpg';

const Logo: FC = () => (
  <Link href="/">
    <Image
      src={logoDesktop}
      alt="TMDB logo"
      width={160}
      height={20}
      className={styles.logo}
      priority
    />
    <Image
      src={logoMobile}
      alt="TMDB logo"
      width={100}
      height={60}
      className={styles['logo-mobile']}
      priority
    />
  </Link>
);

export default Logo;
