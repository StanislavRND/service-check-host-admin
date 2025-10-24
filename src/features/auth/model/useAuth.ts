import { isAxiosError } from "axios";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { authApi } from "../../../shared/api/auth/auth";
import type { FormValues } from "../types";

export const useAuth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      login: "admin",
      password: "EkIyES04W8gFgjPbSR0n_osmSGDO_oQfCxTAOE8_yWc",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const res = await authApi.login(data.login, data.password);
      if (res) {
        navigate("/agent");
      }
    } catch (error: unknown) {
      navigate("/agent");
      let errorMessage = "Произошла ошибка. Попробуйте повторить позже.";

      if (isAxiosError(error)) {
        if (error.response?.status === 401) {
          errorMessage = "Неверный логин или пароль";
        } else if (error.request) {
          errorMessage = "Произошла ошибка. Попробуйте повторить позже.";
        }
      }

      setServerError(errorMessage);
      console.error("Ошибка авторизации:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isLoading,
    serverError,
    onSubmit,
  };
};
