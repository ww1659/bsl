import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "@/redux/hooks";

const PublicRoute = () => {
  const session = useAppSelector((state) => state.auth.session);

  if (session) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
