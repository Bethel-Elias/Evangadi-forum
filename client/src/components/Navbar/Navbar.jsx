import React, {useEffect,useState}from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axiosconfig";
import "./navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));

  const logout = () => {
    localStorage.removeItem("token"); // ✅ remove token
    delete axios.defaults.headers.common["Authorization"]; // optional
    setToken(null); // update state so navbar re-renders
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    // Optional: detect token changes in other tabs
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <nav>
      <div>
        <img src="https://evanforum.com/assets/logo-D98Zk6nH.png" alt="logo" />
      </div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/how-it-works">How it Works</Link>

        {!token ? (
          <button onClick={() => navigate("/login")}>Sign In</button>
        ) : (
          <>
            <Link to="/ask">Ask Question</Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
