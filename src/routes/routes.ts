import { Roles } from "../types";
// import { BiSupport } from "react-icons/bi";
import {
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiUsers,
  HiViewBoards,
  HiCog,
  HiTruck,
  HiDatabase,
  HiCurrencyDollar,
  HiDocument,
} from "react-icons/hi";

import { IconType } from "react-icons";

import {
  CarModelPage,
  CustomersPage,
  DashboardPage,
  InvoicePage,
  MarkupPage,
  OrdersPage,
  PaymentsPage,
  StockPage,
  // SupportPage,
  UsersPage,
} from "../pages";
import { SuppliersPage } from "../pages/suppliers";

type IRoute = {
  label: string;
  path: string;
  allowed_roles: string[];
  icon: IconType;
  element: () => JSX.Element;
  children?: IRoute[];
};

export const routes = <IRoute[]>[
  {
    label: "Dashboard",
    path: "/dashboard",
    allowed_roles: [Roles.admin, Roles.sales, Roles.stock],
    icon: HiChartPie,
    element: DashboardPage,
  },
  {
    label: "Markup",
    path: "/markup",
    allowed_roles: [Roles.admin, Roles.sales],
    icon: HiViewBoards,
    element: MarkupPage,
  },
  {
    label: "Car Model",
    path: "/car-model",
    allowed_roles: [Roles.admin, Roles.sales, Roles.stock],
    icon: HiInbox,
    element: CarModelPage,
  },
  {
    label: "Suppliers",
    path: "/suppliers",
    allowed_roles: [Roles.admin, Roles.sales, Roles.stock],
    icon: HiTruck,
    element: SuppliersPage,
  },
  {
    label: "Customers",
    path: "/customers",
    allowed_roles: [Roles.admin, Roles.sales, Roles.stock],
    icon: HiUsers,
    element: CustomersPage,
  },
  {
    label: "Stock",
    path: "/stock",
    allowed_roles: [Roles.admin, Roles.sales, Roles.stock],
    icon: HiDatabase,
    element: StockPage,
  },
  {
    label: "Orders",
    path: "/orders",
    allowed_roles: [Roles.admin, Roles.sales],
    icon: HiShoppingBag,
    element: OrdersPage,
  },
  {
    label: "Invoices",
    path: "/invoices",
    allowed_roles: [Roles.admin, Roles.sales],
    icon: HiDocument,
    element: InvoicePage,
  },
  {
    label: "Payments",
    path: "/payments",
    allowed_roles: [Roles.admin, Roles.sales],
    icon: HiCurrencyDollar,
    element: PaymentsPage,
  },
  // {
  //   label: "Support",
  //   path: "/support",
  //   allowed_roles: [Roles.admin, Roles.sales, Roles.stock],
  //   icon: BiSupport,
  //   element: SupportPage,
  // },
  {
    label: "Settings",
    path: "/settings",
    allowed_roles: [Roles.admin],
    icon: HiCog,
    element: UsersPage,
    children: [
      {
        label: "Users",
        path: "/users",
        allowed_roles: [Roles.admin],
        icon: HiUsers,
        element: UsersPage,
      },
    ],
  },
];
