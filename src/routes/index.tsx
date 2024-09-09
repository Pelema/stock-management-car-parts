import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootRoute } from "./root";
import {
  LoginPage,
  DashboardPage,
  VATPage,
  CarModelPage,
  UsersPage,
  OrdersPage,
  StockPage,
  SupportPage,
  PaymentsPage,
  CustomersPage,
} from "../pages";
import { SuppliersPage } from "../pages/suppliers";

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
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "vat",
        element: <VATPage />,
      },
      {
        path: "car-model",
        element: <CarModelPage />,
      },
      {
        path: "suppliers",
        element: <SuppliersPage />,
      },
      {
        path: "customers",
        element: <CustomersPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
      {
        path: "stock",
        element: <StockPage />,
      },
      {
        path: "support",
        element: <SupportPage />,
      },
      {
        path: "payments",
        element: <PaymentsPage />,
      },
    ],
  },

  {
    path: "*",
    element: <p>404 Error - Nothing here...</p>,
  },
]);
