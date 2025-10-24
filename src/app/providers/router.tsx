import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Home } from "../../pages/Home/Home";
import { PATHS } from "./paths";

const router = createBrowserRouter([
  {
    path: PATHS.ROOT,
    element: <Navigate to={PATHS.HOME} replace />,
  },

  {
    path: PATHS.HOME,
    element: <Home />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
