'use client';

import { ReactNode, FC } from 'react';
import styles from './Card.module.scss';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: FC<CardProps> = ({ children, className = '' }) => (
  <div className={`${className} ${styles.card}`}>{children}</div>
);

export default Card;
