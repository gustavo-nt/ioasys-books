import { ButtonHTMLAttributes, ReactElement } from "react";
import styles from "./styles.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  hover?: boolean;
  disabled?: boolean;
  children: ReactElement;
}

export const Button = ({
  hover = true,
  disabled = false,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      style={!hover ? { background: "#FFF" } : {}}
      className={styles.button}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};
