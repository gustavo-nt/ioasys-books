import { forwardRef, ForwardRefRenderFunction, InputHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> 
  = ({ name, label, ...rest}, ref) => {
  return (
    <div className={styles.container}>
      { !!label && <label htmlFor={name}>{label}</label> }
      
      <input 
        title={name}
        name={name}
        id={name}
        ref={ref}
        {...rest}
      />
    </div>
  )
}

export const Input = forwardRef(InputBase);