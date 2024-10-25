import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/auth";
import { theme } from "./theme";

export function NavbarComponent() {
  const navigate = useNavigate();
  const { data, signOut } = useAuth();

  return (
    <Navbar theme={theme}>
      <Navbar.Brand href="/admin">
        <img
          src="/logo.webp"
          className="mr-3 h-6 sm:h-9 rounded-lg"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Aficasia
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              placeholderInitials={data?.email?.slice(0, 2).toLocaleUpperCase()}
              rounded
              bordered
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-base capitalize">{data?.user_metadata?.fullname}</span>
            <span className="block truncate text-xs">
              {data?.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            onClick={async () => {
              await signOut();
              navigate("/login", { replace: true });
            }}
          >
            Sign out
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      {/* <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse> */}
    </Navbar>
  );
}
