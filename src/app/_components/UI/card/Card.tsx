'use client';

import styles from './Card.module.scss';
import { ReactNode, FC } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: FC<CardProps> = ({ children, className = '' }) => (
  <div className={`${className} ${styles.card}`}>{children}</div>
);

export default Card;
