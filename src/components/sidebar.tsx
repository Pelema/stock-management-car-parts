import { Sidebar } from "flowbite-react";
import { theme } from "./theme";
import { NavLink, useLocation } from "react-router-dom";
import { AccessGuard } from "./access_guard";
import { routes } from "../routes/routes";

export function SidebarComponent() {
  const location = useLocation();

  console.log(routes.flat())

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
