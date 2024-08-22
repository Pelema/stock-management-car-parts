"use client";
import { Navigate, Outlet } from "react-router-dom";
import { SidebarComponent } from "../components/sidebar";
import { NavbarComponent } from "../components";

export function RootRoute() {
  const user = localStorage.getItem("logged_in");
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="h-full flex flex-col">
      <NavbarComponent />
      <div className="flex grow">
        <SidebarComponent />
        <div className="grow p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
