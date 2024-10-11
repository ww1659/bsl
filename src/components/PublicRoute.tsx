import { useAppSelector } from "@/redux/hooks";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const session = useAppSelector((state) => state.auth.session);

  if (session) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
