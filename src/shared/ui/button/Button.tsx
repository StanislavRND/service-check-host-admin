import { CircleIcon } from "../icons/CircleIcon";
import styles from "./Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
  tabIndex?: number;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  title?: string;
}

export const Button = ({
  children,
  disabled = false,
  isLoading = false,
  tabIndex,
  onClick,
  type,
  className,
  title,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || isLoading}
      tabIndex={tabIndex}
      onClick={onClick}
      type={type}
      title={title}
      className={`${styles.btn} ${className}`}
      {...props}
    >
      {isLoading ? (
        <CircleIcon
          className={styles.loader}
          width={32}
          height={32}
          color="white"
        />
      ) : (
        children
      )}
    </button>
  );
};
