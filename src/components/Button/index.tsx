import { ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  isLoading: boolean;
}

export const Button = ({ label, isLoading, ...rest }: ButtonProps) => {
  return (
    <button 
      {...rest}
    >
      {label}
    </button>
  );
}