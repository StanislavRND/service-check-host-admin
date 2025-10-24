import type { ReactNode } from "react";
import styles from "./AuthLayout.module.scss";

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <div className={styles.login}>{children}</div>;
};
