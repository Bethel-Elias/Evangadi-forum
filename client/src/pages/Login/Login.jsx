import React, { useRef } from "react";
import axios from "../../axiosconfig";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();

  const emailDom = useRef();
  const passwordDom = useRef();



  async function handleSubmit(e) {
    e.preventDefault();

    const emailValue = emailDom.current.value.trim();
    const passwordValue = passwordDom.current.value.trim();

    

    if (!emailValue || !passwordValue) {
      toast.error("Please provide all required info", { autoClose: 3000 });
      return;
    }


    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passwordValue,
      });


      //token
      localStorage.setItem("token", data.token);

        toast.success("Login successful!", { autoClose: 2000 });

      setTimeout(() => navigate("/"),2000);

      // console.log(data);
    } catch (error) {
      const msg = 
      "error?.response?.data?.msg" || "Something went wrong, please try again."
        toast.error(msg, { autoClose: 3000 });
        console.log(msg);
    }
  }

  return (
    <section>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <span>email </span>
          <input ref={emailDom} type="email" placeholder="email address" />
        
        </div>
        <br />
        <div>
          <span>password</span>
          <input ref={passwordDom} type="password" placeholder="password" />
         
        </div>
        <button type="submit">sign in</button>
      </form>
      <Link to={"/register"}>register</Link>
      <ToastContainer position="top-right"/>
    </section>
  );
}

export default Login;
