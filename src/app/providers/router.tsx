import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Agent } from "./../../pages/Agent/Agent";
import { PATHS } from "./paths";

const router = createBrowserRouter([
  {
    path: PATHS.ROOT,
    element: <Navigate to={PATHS.AGENT} replace />,
  },

  {
    path: PATHS.AGENT,
    element: <Agent />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
