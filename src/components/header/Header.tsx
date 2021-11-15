import React, { FC } from 'react';

import logo from '../../assets/logo.svg';
import styles from './Header.module.css';

const Header: FC = () => {
  return (
    <header className={styles.header} data-testid="app-header">
      <nav className={styles.navbar}>
        <a href="/">
          <img
            className={styles.logo}
            src={logo}
            alt="Company logo"
            data-testid="app-logo"
          />
        </a>
      </nav>
    </header>
  );
};

export default Header;
