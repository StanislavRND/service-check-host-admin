import { forwardRef } from "react";
import styles from "./Input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | boolean;
  clearError?: () => void;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, clearError, className, error, ...props }, ref) => {
    return (
      <>
        <div className={`${className || ""} ${styles.inputWrapper} `}>
          {label && <label>{label}</label>}{" "}
          <input
            ref={ref}
            {...props}
            onChange={(e) => {
              props.onChange?.(e);
              clearError?.();
            }}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </>
    );
  }
);

Input.displayName = "Input";
