/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <Link to="/">Home</Link>
      <span>|</span>

      {user ? (
        <p
          style={{ cursor: "pointer" }}
          onClick={logout}
        >
          Logout
        </p>
      ) : (
        <Link to="/login">Login</Link>
      )}

      {user && <p>Hello {user.username}</p>}
    </div>
  );
};

export default Header;
