import { forwardRef } from "react";
import styles from "./Input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | boolean;
  clearError?: () => void;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, clearError, className, ...props }, ref) => {
    return (
      <div className={`${className || ""} ${styles.inputWrapper} `}>
        {label && <label>{label}</label>}
        <input
          ref={ref}
          {...props}
          onChange={(e) => {
            props.onChange?.(e);
            clearError?.();
          }}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
