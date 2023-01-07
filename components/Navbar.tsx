import Image from 'next/image';
import Link from 'next/link';

import styles from './Navbar.module.css';
import SearchBar from './SearchBar';
import UserAvatar from './UserAvatar';
export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.icon}>
        <Link href='/'>
          <Image
            src="/navbar-icon.png"
            alt="user avatar"
            width="100"
            height="100"
          />
        </Link>
      </div>
      <div className={styles.content}>
        <SearchBar />
      <UserAvatar />
      </div>
    </div>
  );
}
