import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoutes = ({ allowedRoles }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>; // Optional: use spinner
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
