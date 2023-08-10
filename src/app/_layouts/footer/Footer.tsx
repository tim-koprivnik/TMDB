'use client';

import { FC } from 'react';
import styles from './Footer.module.scss';

const Footer: FC = () => (
  <footer className={styles.footer}>
    <p>
      &copy;
      {new Date().getFullYear()}{' '}
      <a
        href="https://www.agiledrop.com/"
        target="_blank"
        rel="noreferrer noopener"
      >
        Agiledrop
      </a>{' '}
      (Tim Koprivnik). All rights reserved.
    </p>
  </footer>
);

export default Footer;
