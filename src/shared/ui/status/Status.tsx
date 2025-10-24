import styles from "./Status.module.scss";

interface StatusProps {
  isActive: boolean;
}

export const Status = ({ isActive = true }: StatusProps) => {
  return (
    <div
      className={`${styles.statusBadge} ${!isActive ? styles.inactive : ""}`}
    >
      <span className={styles.dot}></span>
      {isActive ? "Активно" : "Неактивно"}
    </div>
  );
};
