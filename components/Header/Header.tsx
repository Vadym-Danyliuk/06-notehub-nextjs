import Link from 'next/link';
import css from './Header.module.css';

import React from 'react';

const Header = () => {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        Note-Hub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Домашня</Link>
          </li>
          <li>
            <Link href="/notes">Нотатки</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
