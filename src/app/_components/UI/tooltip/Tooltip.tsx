'use client';

import styles from './Tooltip.module.scss';
import { FC, ReactNode } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
}

const Tooltip: FC<TooltipProps> = ({ content, children }) => (
  <div className={styles.tooltip}>
    <div className={styles['tooltip-icon-wrapper']}>{children}</div>
    <div className={styles['tooltip-content']}>{content}</div>
  </div>
);

export default Tooltip;
