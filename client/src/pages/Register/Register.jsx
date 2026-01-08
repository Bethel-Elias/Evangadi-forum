import React, { useRef, useState } from "react";
import axios from "../../axiosconfig";
import { useNavigate, Link } from "react-router-dom";
import style from "./register.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  //to give alert for missing info on input
  const [errormsg, setErrormsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  //alert if they already have account
  const [errorMsg, setErrorMsg] = useState("");

  //hide and show passwordicon on input tag
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    //to give alert for missing info on input
    setErrormsg("");
    setSuccessMsg("");

    const usernameValue = usernameDom.current.value;
    const firstnameValue = firstnameDom.current.value;
    const lastnameValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    if (
      !usernameValue ||
      !firstnameValue ||
      !lastnameValue ||
      !emailValue ||
      !passwordValue
    ) {
      setErrormsg("Please fill out all fields!");
      setSuccessMsg("");
      return;
    }
    try {
      await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstnameValue,
        lastname: lastnameValue,
        email: emailValue,
        password: passwordValue,
      });

      setSuccessMsg("Registered successfully please login!");
      setErrorMsg("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      const msg = error?.response?.data?.msg || "Something went wrong";
      setErrorMsg(msg);
      setSuccessMsg("");
      console.log(msg);

      //alert if they already have account
      if (
        msg.toLowerCase().includes("exist") ||
        msg.toLowerCase().includes("registered")
      ) {
        setErrorMsg("⚠️ You already have an account. Please login.");
      } else {
        setErrorMsg("❌ Registration failed. Try again.");
      }
    }
  }

  return (
    <div className={style.register_page}>
      <div className={style.register_container}>
        <div className={style.register_form}>
          {/* alert if they already have account */}
          {errorMsg && <div className={style.error_msg}>{errorMsg}</div>}

          <h2>Join The Network</h2>
          <div className={style.login_link}>
            Already have an account? <Link to="/login">Login</Link>
          </div>
          {/* left side */}
          <form action="" onSubmit={handleSubmit} className={style.form_group}>

            {/* alert message on form */}
            {errormsg && <div className={style.Error_msg}>{errormsg}</div>}
            {successMsg && (<div className={style.success_msg}>{successMsg}</div>)}

            <input ref={usernameDom} type="text" placeholder="username" />
            <div>
              <input ref={firstnameDom} type="text" placeholder="first name" />
              <input ref={lastnameDom} type="text" placeholder="last name" />
            </div>
            <input ref={emailDom} type="email" placeholder="email address" />
            <div style={{ position: "relative", width: "450" }}>
              <input
                ref={passwordDom}
                type={showPassword ? "text" : "password"}
                placeholder="password"
                style={{ width: "100%", paddingRight: "12px" }}
              />
              <span
                onClick={togglePassword}
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            <p className={style.terms}>
              I agree to the <Link to="privacy policy">privacy policy</Link> and{" "}
              <Link to="terms of service.">terms of service.</Link>
            </p>
            <button className={style.register_btn} type="submit">
              Agree and Join
            </button>
          </form>
        </div>
      </div>

      {/* Right-side*/}
      <div className={style.register_info}>
        <span className={style.about}>About</span>
        <h1>Evangadi Networks</h1>
        <p>
          Evangadi Student Forum is a space where students can ask questions,
          share answers, and support each other throughout their learning
          journey.
        </p>
        <p>
          The forum also gives students hands-on experience building a real-
          world full-stack app using technologies like React, Node.js, and
          MySQL.
        </p>

        <Link to="/how-it-works">
          <button className={style.how_btn}>How it works</button>
        </Link>
      </div>
    </div>
  );
}

export default Register;
