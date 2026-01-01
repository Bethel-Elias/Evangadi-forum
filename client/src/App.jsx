import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { useEffect, useState, createContext } from "react";
import axios from "./axiosconfig";

export const AppState = createContext();

function App() {
  //to access username globally
  const [user, setuser] = useState({});
  // checking user for all render
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  async function checkUser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setuser(data);
    } catch (error) {
      console.log(error.response);
      navigate("/login");
    }
  }

  useEffect(() => {
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppState.Provider value={{ user, setuser }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AppState.Provider>
  );
}

export default App;
