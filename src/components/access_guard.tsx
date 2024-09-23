import useAuth from "../hooks/auth";

interface IAccessGuardProps {
  children: JSX.Element;
  allowed_roles: string[];
}

export const AccessGuard: React.FC<IAccessGuardProps> = ({
  children,
  allowed_roles,
}) => {
  const { data: user, loading } = useAuth();
  console.log(allowed_roles, " --------------> my role", user);

  if (!loading && allowed_roles.includes(user?.user_metadata?.role)) {
    return children;
  }
};
