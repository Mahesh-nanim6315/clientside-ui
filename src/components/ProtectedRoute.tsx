import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSessionCheck } from "../hooks/useSessionCheck";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

type ProtectedRouteProps = {
  allowedRoles: string[];
};

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const location = useLocation();
  useSessionCheck(); // handles session expiry and logout

  const user = useSelector((state: RootState) => state.user.user);

  if (!user) {
    // Not logged in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // user may have either a single `role` string or an array `roles`.
  const userHasRole = (() => {
    // @ts-ignore - state shape may vary between deployments
    if (!user) return false;
    // prefer single role
    if ((user as any).role && typeof (user as any).role === "string") {
      return allowedRoles.includes((user as any).role);
    }
    // support roles array
    if ((user as any).roles && Array.isArray((user as any).roles)) {
      return (user as any).roles.some((r: string) => allowedRoles.includes(r));
    }
    return false;
  })();

  if (!userHasRole) {
    // Logged in but not authorized
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
