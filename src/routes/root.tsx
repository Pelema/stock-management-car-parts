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
      <div className="flex grow">
        <SidebarComponent />
        <div className="grow p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
