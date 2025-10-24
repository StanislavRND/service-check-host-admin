import { useEffect, useRef, useState } from "react";
import styles from "./Select.module.scss";

interface SelectOption<T = string | number | boolean | undefined> {
  value: T;
  label: string;
}

interface SelectProps<T = string | number | boolean | undefined> {
  options: SelectOption<T>[];
  value?: T;
  onChange: (value: T) => void;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Select = <T extends string | number | boolean | undefined>({
  options,
  value,
  onChange,
  placeholder = "Выберите вариант",
  error = false,
  disabled = false,
  className,
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => {
    if (typeof option.value === "boolean" && typeof value === "boolean") {
      return option.value === value;
    }
    return option.value === value;
  });

  const toggleSelect = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (optionValue: T) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={selectRef}
      className={`${styles.customSelect} ${className || ""}`}
    >
      <div
        className={`${styles.selectHeader} ${isOpen ? styles.open : ""} ${
          error ? styles.error : ""
        }`}
        onClick={toggleSelect}
      >
        <span className={styles.selectedValue}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`${styles.arrow} ${isOpen ? styles.rotated : ""}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>

      {isOpen && (
        <div className={styles.selectOptions}>
          {options.map((option) => (
            <div
              key={option.label}
              className={`${styles.option} ${
                value === option.value ? styles.selected : ""
              }`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
