"use client";
import { Navigate, Outlet } from "react-router-dom";
import { SidebarComponent } from "../components/sidebar";
import { NavbarComponent } from "../components";
import useAuth from "../hooks/auth";

export function RootRoute() {
  const { data: user, loading } = useAuth();
  if (!user && !loading) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="h-full flex flex-col">
      <NavbarComponent />
      <div className="flex grow overflow-y-hidden p-2">
        <SidebarComponent />
        <div className="grow ml-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
