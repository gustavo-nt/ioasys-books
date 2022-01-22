import { ButtonHTMLAttributes } from 'react';
import { Loading } from '../../Loading';
import styles from './styles.module.scss';

interface ButtonLoginProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  isLoading: boolean;
}

export const ButtonLogin = ({ label, isLoading, ...rest }: ButtonLoginProps) => {
  return (
    <button 
      className={styles.container}
      disabled={isLoading}
      {...rest}
    >
      {isLoading  ? (
        <Loading />
      ) : (
        <span>{label}</span>
      )}
    </button>
  );
}