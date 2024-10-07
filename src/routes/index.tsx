import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootRoute } from "./root";
import { LoginPage } from "../pages";
import { RouteGuard } from "./route_guard";
import { routes } from "./routes";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/",
    element: <RootRoute />,
    children: [
      {
        path: "",
        element: <Navigate replace to="/dashboard" />,
      },
      ...routes
        .map((item) => {
          if (item.children && item.children.length > 0) {
            return item.children.map((child) => ({
              path: child.path,
              element: (
                <RouteGuard allowed_roles={child.allowed_roles}>
                  {<child.element />}
                </RouteGuard>
              ),
            }));
          }
          return {
            path: item.path,
            element: (
              <RouteGuard allowed_roles={item.allowed_roles}>
                {<item.element />}
              </RouteGuard>
            ),
          };
        })
        .flat(),
    ],
  },

  {
    path: "*",
    element: <p>404 Error - Nothing here...</p>,
  },
]);
