import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../../shared/api/auth/auth";
import logoSvg from "../../../shared/assets/images/logo-dark.svg";
import { Menu } from "../../../shared/ui/menu/ui/Menu";
import styles from "./Header.module.scss";

export const Header = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const res = await authApi.logout();
      if (res) navigate("/login");
    } catch (error) {
      console.log("Не удалось выполнить выход из аккаунта", error);
      alert("Не удалось выйти из аккаунта");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logoSvg} alt="logo" />
      </div>

      <div
        className={`${styles.burger} ${isMenuOpen ? styles.open : ""}`}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <span />
        <span />
        <span />
      </div>

      <nav
        className={`${styles.nav} ${isMenuOpen ? styles.active : ""}`}
        onClick={() => setIsMenuOpen(false)}
      >
        <Menu />
        <button
          disabled={isLoading}
          onClick={handleLogout}
          className={`${styles.btn} ${styles.mobileBtn}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v10" />
            <path d="M18.4 6.6a9 9 0 1 1-12.77.04" />
          </svg>
          <span>Выход</span>
        </button>
      </nav>

      <button
        disabled={isLoading}
        onClick={handleLogout}
        className={`${styles.btn} ${styles.desktopBtn}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v10" />
          <path d="M18.4 6.6a9 9 0 1 1-12.77.04" />
        </svg>
        <span>Выход</span>
      </button>
    </header>
  );
};
