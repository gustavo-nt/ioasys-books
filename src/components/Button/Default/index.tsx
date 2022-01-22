import { ButtonHTMLAttributes, ReactElement } from 'react';
import styles from './styles.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  children: ReactElement;
}

export const Button = ({ children, disabled = false, ...rest }: ButtonProps) => {
  return (
    <button 
      className={styles.button}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}