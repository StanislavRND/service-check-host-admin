import { forwardRef } from "react";
import styles from "./Textarea.module.scss";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  clearError?: () => void;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, clearError, ...props }, ref) => {
    return (
      <div className={styles.textareaWrapper}>
        {label && <label>{label}</label>}
        <textarea
          className={styles.textarea}
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

Textarea.displayName = "Textarea";
