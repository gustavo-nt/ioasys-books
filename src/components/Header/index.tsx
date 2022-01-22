import { Button } from '../Button/Default';
import { FiLogOut } from 'react-icons/fi';
import Logo from '../../../public/images/logo.svg';

import styles from './styles.module.scss';
import { useAuth } from '../../hooks/auth';

interface HeaderProps {
  mode?: string;
}

export const Header = ({ mode = 'light' }: HeaderProps) => {
  const { signOut, user } = useAuth();

  return (
    <header className={`
      ${styles.container} 
      ${mode === 'dark' ? styles.dark : ''}
    `}>
      <div className={styles.logo}>
        <Logo />
        <span>Books</span>
      </div>
      
      {user && (
        <div className={styles.welcomeUser}>
          <p>
            Bem vindo, <strong>{user.name}!</strong>
          </p>
          <Button onClick={signOut}>
            <FiLogOut />
          </Button>
        </div>
      )}
    </header>
  );
}