'use client';

import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Logo.module.scss';

const Logo: FC = () => (
  <Link href="/">
    <Image
      src="/assets/images/tmdb-logo.svg"
      alt="TMDB logo"
      width={160}
      height={20}
      className={styles.logo}
    />
    <Image
      src="/assets/images/tmdb-logo-mobile.jpg"
      alt="TMDB logo"
      width={100}
      height={60}
      className={styles['logo-mobile']}
    />
  </Link>
);

export default Logo;
