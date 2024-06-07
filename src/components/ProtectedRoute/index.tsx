import { Navigate } from "react-router-dom";

import { IChildrenProps } from "../../interfaces/children";

export default function ProtectedRoute({ children }: IChildrenProps) {
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}
