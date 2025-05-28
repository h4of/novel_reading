import { Navigate } from "react-router-dom";
import useRole from "../utils/useRole";
import LoadingComponent from "./LoadingComponent";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const role = useRole();

  if (role === null) return <LoadingComponent />;

  if (role !== allowedRoles ) {
    return <Navigate to="/not-found" replace />;
  }

  return children;
};

export default ProtectedRoute;