import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { HiOutlineUser, HiOutlineUserPlus } from 'react-icons/hi2';
import { AuthService } from '../services/auth.service';
import styles from './UserAvatar.module.css';

export default function UserAvatar() {
  const userAvarRef = useRef<any>(null);
  const [isLogged, setIslogged] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!userAvarRef?.current?.contains(e.target)) {
        close();
        document.removeEventListener('mousedown', handleClickOutside);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  function open() {
    setIslogged(AuthService.isLogged());
    setIsOpen(true);
  }

  function logout() {
    AuthService.logout();
    Router.push('/', undefined, { shallow: true });
    close();
  }
  function close() {
    setIsOpen(false);
  }
  return (
    <div ref={userAvarRef} className={styles['avatar-container']}>
      <div className={styles['image-container']} onClick={open}>
        <Image
          src="/avatar-default.svg"
          alt="user avatar"
          width="100"
          height="100"
        />
        <div className={styles['img-overlay']}></div>
      </div>
      <div
        className={`${styles['avatar-drop-down']} ${isOpen ? styles.open : ''}`}
      >
        {isLogged ? (
          <div onClick={logout}>Desconectar</div>
        ) : (
          <>
            <Link href="/login" onClick={close}>
              <div>
                <HiOutlineUser className={styles.icon} /> Conectar
              </div>
            </Link>
            <Link href="/register" onClick={close}>
              <div>
                <HiOutlineUserPlus className={styles.icon} /> Registrar
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
