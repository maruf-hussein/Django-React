import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { redirect } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("authToken"))
      : null
  );
  // console.log("authToken: ", authToken);
  const [user, setUser] = useState(() =>
    localStorage.getItem("authToken")
      ? jwtDecode(localStorage.getItem("authToken"))
      : null
  );
  const [loading, setLoading] = useState(true);

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });
    const data = await res.json();

    if (res.status === 200) {
      setAuthToken(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authToken", JSON.stringify(data));
      redirect("/");
    } else {
      alert("Somthing went wrong!");
    }
  };

  const logout = async () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
  };

  const updateToken = async () => {
    console.log("Update token called....");

    const res = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refresh: authToken.refresh,
      }),
    });
    const data = await res.json();

    if (res.status === 200) {
      setAuthToken(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authToken", JSON.stringify(data));
    } else {
      logout();
    }
  };

  const contextData = {
    user: user,
    logout: logout,
    loginUser: loginUser,
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (authToken) {
        updateToken();
      }
    }, 2000);
    // }, 60000 * 4);

    return () => clearInterval(id);
  }, [authToken, loading]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
