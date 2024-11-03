import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCookie } from "util/authCookie";

const PrivateRoute = ({ element }) => {
  const accessToken = getCookie('jup-jup-atk');
  const location = useLocation();

  return accessToken ? (
    element
  ) : (
    <Navigate to="/signin" state={{ from: location }} />
  );
};

export default PrivateRoute;
