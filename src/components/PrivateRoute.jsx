import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, roles: allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole"); 


  if (!token || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
