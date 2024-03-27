/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { Navigate, redirect } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  // const isAuthenticated = false;
  console.log("isAuthenticated: ", user);

  return user ? children : <Navigate to={"/login"} />;
};

export default PrivateRoute;
