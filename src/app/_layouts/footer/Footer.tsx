'use client';

import styles from './Footer.module.scss';
import { FC } from 'react';

const Footer: FC = () => (
  <footer className={styles.footer}>
    <p>
      &copy;
      {new Date().getFullYear()}{' '}
      <a
        href="https://tim-koprivnik.netlify.app/"
        target="_blank"
        rel="noreferrer noopener"
      >
        Tim Koprivnik
      </a>
      . All rights reserved.
    </p>
  </footer>
);

export default Footer;
