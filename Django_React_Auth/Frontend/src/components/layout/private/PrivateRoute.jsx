/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = false;

  return isAuthenticated ? (
    { children }
  ) : (
    <Navigate to={"/not-authenticated--⁕"} />
  );
};

export default PrivateRoute;
