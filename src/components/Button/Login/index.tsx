import { ButtonHTMLAttributes } from "react";
import { LoadingLogin } from "../../Loading/Login";
import styles from "./styles.module.scss";

interface ButtonLoginProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  isLoading: boolean;
}

export const ButtonLogin = ({
  label,
  isLoading,
  ...rest
}: ButtonLoginProps) => {
  return (
    <button className={styles.container} disabled={isLoading} {...rest}>
      {isLoading ? <LoadingLogin /> : <span>{label}</span>}
    </button>
  );
};
