import { Navigate } from "react-router-dom";
import useAuth from "../hooks/auth";

interface IRouteGuardProps {
  children: JSX.Element;
  allowed_roles: string[];
}

export const RouteGuard: React.FC<IRouteGuardProps> = ({
  children,
  allowed_roles,
}) => {
  const { data: user, loading } = useAuth();
  console.log(allowed_roles, " --------------> my role", user);

  if (!loading && !allowed_roles.includes(user?.user_metadata?.role)) {
    return <Navigate replace to="/404" />;
  }

  return children;
};
