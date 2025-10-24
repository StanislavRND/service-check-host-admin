import { Header } from "../../../widgets/header/ui/Header";
import styles from "./MainLayout.module.scss";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      
      <div className={styles.contentWrapper}>
        <div className={styles.mainContent}>{children}</div>
        <div className={styles.stickyScrollContainer}>
          <div className={styles.scrollContent}></div>
        </div>
      </div>
    </div>
  );
};
