import { Sidebar } from "flowbite-react";
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
import { BiSupport } from "react-icons/bi";
import { theme } from "./theme";
import { NavLink, useLocation } from "react-router-dom";
import { AccessGuard } from "./access_guard";
import { Roles } from "../types";

export function SidebarComponent() {
  const location = useLocation();

  const routes = [
    {
      label: "Dashboard",
      path: "/dashboard",
      allowed_roles: [Roles.admin, Roles.sales, Roles.stock],
      icon: HiChartPie,
    },
    {
      label: "Markup",
      path: "/markup",
      allowed_roles: [Roles.admin, Roles.sales],
      icon: HiViewBoards,
    },
    {
      label: "Car Model",
      path: "/car-model",
      allowed_roles: [Roles.admin, Roles.sales, Roles.stock],
      icon: HiInbox,
    },
    {
      label: "Suppliers",
      path: "/suppliers",
      allowed_roles: [Roles.admin, Roles.sales, Roles.stock],
      icon: HiTruck,
    },
    {
      label: "Customers",
      path: "/customers",
      allowed_roles: [Roles.admin, Roles.sales, Roles.stock],
      icon: HiUsers,
    },
    {
      label: "Stock",
      path: "/stock",
      allowed_roles: [Roles.admin, Roles.sales, Roles.stock],
      icon: HiDatabase,
    },
    {
      label: "Orders",
      path: "/orders",
      allowed_roles: [Roles.admin, Roles.sales],
      icon: HiShoppingBag,
    },
    {
      label: "Invoices",
      path: "/invoices",
      allowed_roles: [Roles.admin, Roles.sales],
      icon: HiDocument,
    },
    {
      label: "Payments",
      path: "/payments",
      allowed_roles: [Roles.admin, Roles.sales],
      icon: HiCurrencyDollar,
    },
    {
      label: "Support",
      path: "/support",
      allowed_roles: [Roles.admin, Roles.sales, Roles.stock],
      icon: BiSupport,
    },
    {
      label: "Settings",
      path: "/settings",
      allowed_roles: [Roles.admin],
      icon: HiCog,
      children: [
        {
          label: "Users",
          path: "/users",
          allowed_roles: [Roles.admin],
          icon: HiUsers,
        },
      ],
    },
  ];

  return (
    <Sidebar theme={theme}>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {routes.map((item) => {
            return (
              <AccessGuard allowed_roles={item.allowed_roles}>
                {item.children ? (
                  <Sidebar.Collapse icon={item.icon} label={item.label}>
                    {item.children.map((child) => (
                      <AccessGuard allowed_roles={child.allowed_roles}>
                        <Sidebar.Item
                          as={NavLink}
                          to={child.path}
                          active={location.pathname === child.path}
                          // icon={child.icon}
                        >
                          {child.label}
                        </Sidebar.Item>
                      </AccessGuard>
                    ))}
                  </Sidebar.Collapse>
                ) : (
                  <Sidebar.Item
                    as={NavLink}
                    to={item.path}
                    active={location.pathname === item.path}
                    icon={item.icon}
                  >
                    {item.label}
                  </Sidebar.Item>
                )}
              </AccessGuard>
            );
          })}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
