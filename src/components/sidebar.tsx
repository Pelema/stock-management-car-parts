import { Sidebar } from "flowbite-react";
import {
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiUsers,
  HiViewBoards,
  HiCog,
  HiTruck,
  HiInformationCircle,
  HiDatabase,
  HiCurrencyDollar,
} from "react-icons/hi";
import { theme } from "./theme";
import { NavLink } from "react-router-dom";

export function SidebarComponent() {
  return (
    <Sidebar theme={theme}>
      {/* <Sidebar.Logo href="#" img="/favicon.svg" imgAlt="Flowbite logo">
        Flowbite
      </Sidebar.Logo> */}
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item as={NavLink} to="/dashboard" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item as={NavLink} to="/vat" icon={HiViewBoards}>
            VAT
          </Sidebar.Item>
          <Sidebar.Item as={NavLink} to="/car-model" icon={HiInbox}>
            Car Model
          </Sidebar.Item>

          <Sidebar.Item as={NavLink} to="/suppliers" icon={HiTruck}>
            Suppliers
          </Sidebar.Item>
          <Sidebar.Item as={NavLink} to="/users" icon={HiUsers}>
            Users
          </Sidebar.Item>
          <Sidebar.Item as={NavLink} to="/stock" icon={HiDatabase}>
            Stock
          </Sidebar.Item>
          <Sidebar.Item as={NavLink} to="/orders" icon={HiShoppingBag}>
            Orders
          </Sidebar.Item>
          <Sidebar.Item as={NavLink} to="/payments" icon={HiCurrencyDollar}>
            Payments
          </Sidebar.Item>
          <Sidebar.Item as={NavLink} to="/support" icon={HiInformationCircle}>
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
