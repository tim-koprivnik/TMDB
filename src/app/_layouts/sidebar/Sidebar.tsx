'use client';

import { FC, ReactNode } from 'react';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  children: ReactNode;
  className?: string;
}

const Sidebar: FC<SidebarProps> = ({ children, className = '' }) => (
  <aside className={`${styles.sidebar} ${className}`}>{children}</aside>
);

export default Sidebar;
