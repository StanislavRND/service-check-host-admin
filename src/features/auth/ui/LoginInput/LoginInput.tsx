import { useState } from "react";
import type { FieldError, FieldValues } from "react-hook-form";
import { EyeIcon } from "../../../../shared/ui/icons/eye-icon/EyeIcon";
import type { InputProps } from "../../types";
import styles from "./LoginInput.module.scss";

export const LoginInput = <T extends FieldValues>({
  placeholder,
  name,
  type = "text",
  register,
  label,
  defaultValue,
  showPassToggle,
  errors,
}: InputProps<T>) => {
  const [isPassVisible, setIsPassVisible] = useState(false);

  const togglePassVisibility = () => {
    setIsPassVisible((prev) => !prev);
  };

  const inputType = type === "password" && isPassVisible ? "text" : type;
  const error = errors[name] as FieldError | undefined;
  const errorMessage = error?.message;

  return (
    <div className={styles.inputWrapper}>
      <label>{label}</label>
      <div className={styles.blockInput}>
        <input
          className={`${styles.input} ${errorMessage ? styles.inputError : ""}`}
          type={inputType}
          placeholder={placeholder}
          defaultValue={defaultValue}
          {...register(name, {
            required: "Поле не может быть пустым",
          })}
        />

        {showPassToggle && type === "password" && (
          <EyeIcon
            className={styles.btn}
            isOpen={isPassVisible}
            onClick={togglePassVisibility}
          />
        )}
      </div>
      {errorMessage && <div className={styles.errorNull}>{errorMessage}</div>}
    </div>
  );
};
