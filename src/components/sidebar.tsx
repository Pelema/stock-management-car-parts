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
} from "react-icons/hi";
import { BiSupport } from "react-icons/bi";
import { theme } from "./theme";
import { NavLink, useLocation } from "react-router-dom";

export function SidebarComponent() {
  const location = useLocation();

  return (
    <Sidebar theme={theme}>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            as={NavLink}
            to="/dashboard"
            active={location.pathname === "/dashboard"}
            icon={HiChartPie}
          >
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item
            as={NavLink}
            to="/vat"
            active={location.pathname === "/vat"}
            icon={HiViewBoards}
          >
            VAT
          </Sidebar.Item>
          <Sidebar.Item
            as={NavLink}
            to="/car-model"
            active={location.pathname === "/car-model"}
            icon={HiInbox}
          >
            Car Model
          </Sidebar.Item>

          <Sidebar.Item
            as={NavLink}
            to="/suppliers"
            active={location.pathname === "/suppliers"}
            icon={HiTruck}
          >
            Suppliers
          </Sidebar.Item>
          <Sidebar.Item
            as={NavLink}
            to="/customers"
            active={location.pathname === "/customers"}
            icon={HiUsers}
          >
            Customers
          </Sidebar.Item>
          <Sidebar.Item
            as={NavLink}
            to="/customers"
            active={location.pathname === "/customers"}
            icon={HiUsers}
          >
            Users
          </Sidebar.Item>
          <Sidebar.Item
            as={NavLink}
            to="/stock"
            active={location.pathname === "/stock"}
            icon={HiDatabase}
          >
            Stock
          </Sidebar.Item>
          <Sidebar.Item
            as={NavLink}
            to="/orders"
            active={location.pathname === "/orders"}
            icon={HiShoppingBag}
          >
            Orders
          </Sidebar.Item>
          <Sidebar.Item
            as={NavLink}
            to="/payments"
            active={location.pathname === "/payments"}
            icon={HiCurrencyDollar}
          >
            Payments
          </Sidebar.Item>
          <Sidebar.Item
            as={NavLink}
            to="/support"
            active={location.pathname === "/support"}
            icon={BiSupport}
          >
            Support
          </Sidebar.Item>

          <Sidebar.Collapse icon={HiCog} label="Settings">
            <Sidebar.Item href="#">Products</Sidebar.Item>
            <Sidebar.Item href="#">Sales</Sidebar.Item>
            <Sidebar.Item href="#">Refunds</Sidebar.Item>
            <Sidebar.Item href="#">Shipping</Sidebar.Item>
          </Sidebar.Collapse>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
