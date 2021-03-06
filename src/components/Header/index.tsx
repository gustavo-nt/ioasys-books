import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/auth';
import { useEffect, useState } from 'react';

import { Button } from '../Button/Default';
import { FiLogOut } from 'react-icons/fi';
import Logo from '../../../public/images/logo.svg';

import styles from './styles.module.scss';

interface HeaderProps {
  mode?: string;
  shouldMatchExactPage?: string;
}

export const Header = ({
  mode = 'light',
  shouldMatchExactPage = '/home',
}: HeaderProps) => {
  const router = useRouter();
  const { asPath } = useRouter();
  const { signOut, user } = useAuth();
  const [isActive, setIsActive] = useState(false);

  const handleSignOut = () => {
    signOut();
    router.push('/');
  };

  useEffect(() => {
    if (shouldMatchExactPage === asPath) {
      setIsActive(true);
    }
  }, [shouldMatchExactPage, asPath, isActive]);

  return (
    <header
      className={`
      ${styles.container} 
      ${mode === 'dark' ? styles.dark : ''}
    `}
    >
      <div className={styles.logo}>
        <Logo />
        <span>Books</span>
      </div>

      <h1>ioasys Books</h1>

      {user && isActive && (
        <div className={styles.welcomeUser}>
          <p>
            Bem vindo(a), <strong>{user.name}!</strong>
          </p>
          <Button onClick={handleSignOut}>
            <FiLogOut />
          </Button>
        </div>
      )}
    </header>
  );
};
