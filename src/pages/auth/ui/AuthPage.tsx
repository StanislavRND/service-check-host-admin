import { LoginForm } from "../../../features/auth/ui/LoginForm/LoginForm";
import { AuthLayout } from "../../../widgets/authLayout";

export const AuthPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};
