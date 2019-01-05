import React from 'react';
import Logo from '../logo';
import styles from './header.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.section}>
        <Logo />
        <span className={styles.title}>
          Design System
          <span className={styles.end}> / Front-end</span>
        </span>
      </div>
    </header>
  );
}