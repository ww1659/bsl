import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "../redux/hooks";

type ProtectedRouteProps = {
  redirectPath?: string;
};

const ProtectedRoute: React.FC = ({
  redirectPath = "/login",
}: ProtectedRouteProps) => {
  const session = useAppSelector((state) => state.auth.session);

  if (!session) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
