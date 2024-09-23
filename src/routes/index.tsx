import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootRoute } from "./root";
import {
  LoginPage,
  DashboardPage,
  MarkupPage,
  CarModelPage,
  UsersPage,
  OrdersPage,
  StockPage,
  SupportPage,
  PaymentsPage,
  CustomersPage,
  InvoicePage,
} from "../pages";
import { SuppliersPage } from "../pages/suppliers";
import { RouteGuard } from "./route_guard";
import { Roles } from "../types";

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
        element: (
          <RouteGuard allowed_roles={[Roles.admin, Roles.stock, Roles.sales]}>
            <DashboardPage />
          </RouteGuard>
        ),
      },
      {
        path: "markup",
        element: (
          <RouteGuard allowed_roles={[Roles.admin, Roles.sales]}>
            <MarkupPage />
          </RouteGuard>
        ),
      },
      {
        path: "car-model",
        element: (
          <RouteGuard allowed_roles={[Roles.admin, Roles.stock, Roles.sales]}>
            <CarModelPage />
          </RouteGuard>
        ),
      },
      {
        path: "suppliers",
        element: (
          <RouteGuard allowed_roles={[Roles.admin, Roles.stock, Roles.sales]}>
            <SuppliersPage />
          </RouteGuard>
        ),
      },
      {
        path: "customers",
        element: (
          <RouteGuard allowed_roles={[Roles.admin, Roles.stock, Roles.sales]}>
            <CustomersPage />
          </RouteGuard>
        ),
      },
      {
        path: "users",
        element: (
          <RouteGuard allowed_roles={[Roles.admin]}>
            <UsersPage />
          </RouteGuard>
        ),
      },
      {
        path: "orders",
        element: (
          <RouteGuard allowed_roles={[Roles.admin, Roles.sales]}>
            <OrdersPage />
          </RouteGuard>
        ),
      },
      {
        path: "invoices",
        element: (
          <RouteGuard allowed_roles={[Roles.admin, Roles.sales]}>
            <InvoicePage />
          </RouteGuard>
        ),
      },
      {
        path: "stock",
        element: (
          <RouteGuard allowed_roles={[Roles.admin, Roles.stock, Roles.sales]}>
            <StockPage />
          </RouteGuard>
        ),
      },
      {
        path: "support",
        element: (
          <RouteGuard allowed_roles={[Roles.admin, Roles.stock, Roles.sales]}>
            <SupportPage />
          </RouteGuard>
        ),
      },
      {
        path: "payments",
        element: (
          <RouteGuard allowed_roles={[Roles.admin, Roles.sales]}>
            <PaymentsPage />
          </RouteGuard>
        ),
      },
    ],
  },

  {
    path: "*",
    element: <p>404 Error - Nothing here...</p>,
  },
]);
