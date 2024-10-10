import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const ProtectedRoute: React.FC = () => {
  const session = useAppSelector((state) => state.auth.session);

  if (!session) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
