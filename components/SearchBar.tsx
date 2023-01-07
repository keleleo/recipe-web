import { useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import styles from './SearchBar.module.css';

export default function SearchBar() {
  return (
    <div className={styles['search-bar']}>
      <input
        type="text"
        placeholder="Pesquisar..."
        className={styles['search-input']}
      />
      <button className={styles['search-button']}>
        <FiSearch className={styles.icon} />
      </button>
    </div>
  );
}
