import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const accessToken = localStorage.getItem("accessToken");
  const location = useLocation();

  return accessToken ? (
    element
  ) : (
    <Navigate to="/signin" state={{ from: location }} />
  );
};

export default PrivateRoute;
