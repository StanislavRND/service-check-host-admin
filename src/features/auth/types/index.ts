import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

export interface InputProps<T extends FieldValues> {
  label: string;
  placeholder: string;
  name: Path<T>;
  type?: string;
  register: UseFormRegister<T>;
  defaultValue?: string;
  showPassToggle?: boolean;
  errors: FieldErrors<T>;
  tabindex: number;
}

export type FormValues = {
  login: string;
  password: string;
};
