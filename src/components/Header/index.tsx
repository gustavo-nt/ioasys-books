import { Button } from "../Button/Default";
import { FiLogOut } from "react-icons/fi";
import Logo from "../../../public/images/logo.svg";

import { useRouter } from "next/router";
import { useAuth } from "../../hooks/auth";

import styles from "./styles.module.scss";

interface HeaderProps {
  mode?: string;
}

export const Header = ({ mode = "light" }: HeaderProps) => {
  const router = useRouter();
  const { signOut, user } = useAuth();

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  return (
    <header
      className={`
      ${styles.container} 
      ${mode === "dark" ? styles.dark : ""}
    `}
    >
      <div className={styles.logo}>
        <Logo />
        <span>Books</span>
      </div>

      {user && (
        <div className={styles.welcomeUser}>
          <p>
            Bem vindo, <strong>{user.name}!</strong>
          </p>
          <Button onClick={handleSignOut}>
            <FiLogOut />
          </Button>
        </div>
      )}
    </header>
  );
};
