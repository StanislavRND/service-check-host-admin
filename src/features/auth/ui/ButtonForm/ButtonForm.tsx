import { CircleIcon } from "../../../../shared/ui/icons/CircleIcon";
import styles from "./ButtonForm.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  tabIndex?: number;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

export const ButtonForm = ({
  children,
  disabled = false,
  isLoading = false,
  tabIndex,
  onClick,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || isLoading}
      tabIndex={tabIndex}
      onClick={onClick}
      className={`${styles.btn} ${className}`}
      {...props}
    >
      {isLoading ? (
        <CircleIcon
          className={styles.loader}
          width={24}
          height={24}
          color="#3b3b3b"
        />
      ) : (
        children
      )}
    </button>
  );
};
