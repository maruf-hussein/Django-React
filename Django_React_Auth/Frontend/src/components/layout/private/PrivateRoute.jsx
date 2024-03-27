/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../../../toolkit/auth/slice";
import { updateStoreFromLocalStorage } from "../../../toolkit/auth/actions";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const authenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    // Function to check localStorage and update Redux state
    dispatch(updateStoreFromLocalStorage());
  }, [window.location.href]);

  useEffect(() => {
    // This effect runs whenever the location (URL) changes
    console.log("URL changed:", location);
    console.log("PrivateRoute :: isAuthenticated :: ", authenticated);

    // Perform actions based on the new URL, such as fetching data
  }, [location, authenticated]);

  return authenticated ? children : <Navigate to={"/signin"} />;
};

export default PrivateRoute;
