import styles from './styles.module.scss';
import Logo from '../../../public/logo.svg';

interface HeaderProps {
  mode?: string;
}

export const Header = ({ mode = 'light'}: HeaderProps) => {
  return (
    <header className={`
      ${styles.container} 
      ${mode === 'dark' ? styles.dark : ''}
    `}>
      <Logo />
      <span>Books</span>
    </header>
  );
}