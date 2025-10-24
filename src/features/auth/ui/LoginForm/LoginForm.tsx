import logoSvg from "../../../../shared/assets/images/logo-dark.svg";

import { useAuth } from "../../model/useAuth";
import { ButtonForm } from "../ButtonForm/ButtonForm";
import { LoginInput } from "../LoginInput/LoginInput";
import styles from "./LoginForm.module.scss";

export const LoginForm = () => {
  const { register, handleSubmit, errors, isLoading, serverError, onSubmit } =
    useAuth();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <img className={styles.logo} src={logoSvg} alt="logo" />

      <div className={styles.inputs}>
        <LoginInput
          label="Логин"
          placeholder="Введите логин"
          name="login"
          register={register}
          errors={errors}
          tabindex={1}
        />
        <LoginInput
          label="Пароль"
          type="password"
          placeholder="Введите пароль"
          name="password"
          errors={errors}
          register={register}
          showPassToggle={true}
          tabindex={2}
        />
      </div>

      {serverError && <div className={styles.serverError}>{serverError}</div>}

      <ButtonForm isLoading={isLoading} tabIndex={3}>
        Войти
      </ButtonForm>
    </form>
  );
};
