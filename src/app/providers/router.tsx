import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Agent } from "../../pages/agent/ui/Agent";
import { MainLayout } from "../layouts/ui/MainLayout";
import { AuthPage } from "./../../pages/auth/ui/AuthPage";
import { PATHS } from "./paths";

const router = createBrowserRouter([
  {
    path: PATHS.ROOT,
    element: <Navigate to={PATHS.AGENT} replace />,
  },

  {
    path: PATHS.AGENT,
    element: (
      <MainLayout>
        <Agent />
      </MainLayout>
    ),
  },
  {
    path: PATHS.LOGIN,
    element: <AuthPage />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
