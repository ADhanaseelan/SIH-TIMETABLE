import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedProps {
  user: { username: string; role: string } | null;
  allowedRoles?: string[];
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedProps> = ({
  user,
  allowedRoles,
  children,
}) => {
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
