import React from "react";
import logo from "../../../assets/logo.svg";
import styles from "../auth.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser, loginSellers } from "../../../redux/action/userAction";

const Login = () => {
  const [role, setRole] = useState("Buyer");
  const navigate = useNavigate();
  const dispacth = useDispatch();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const loginBuyer = (e) => {
    e.preventDefault();
    setLoading(true);
    dispacth(loginUser(form, navigate, loading));
  };

  const loginSeller = (e) => {
    e.preventDefault();
    setLoading(true);
    dispacth(loginSellers(form, navigate, loading));
  };

  return (
    <>
      <section className={`${styles["auth-section"]}`}>
        <div className="justify-content-center flex d-flex">
          <div className="flex d-flex justify-items-between">
            <img src={logo} alt="" />
            <h1 className={`${styles["logo-tikitoko"]}`}>Balanjo</h1>
          </div>
        </div>
        <p className="flex d-flex justify-content-center fw-bold mt-2">
          Please login with your account
        </p>
        <div className="mt-5 justify-content-center align-items-center flex d-flex">
          {role === "Buyer" ? (
            <>
              <button
                onClick={() => setRole("Buyer")}
                className={`${styles.active} ${styles["btn-customer"]}`}
              >
                Customer
              </button>
              <button
                onClick={() => setRole("Seller")}
                className={`${styles["btn-seller"]}`}
              >
                Seller
              </button>
            </>
          ) : role === "Seller" ? (
            <>
              <button
                onClick={() => setRole("Buyer")}
                className={`${styles["btn-customer"]}`}
              >
                Customer
              </button>
              <button
                onClick={() => setRole("Seller")}
                className={`${styles.active} ${styles["btn-seller"]}`}
              >
                Seller
              </button>
            </>
          ) : (
            ""
          )}
        </div>
        {role === "Buyer" ? (
          <form onSubmit={loginBuyer}>
            <div className="mt-5">
              <div className={`mb-3 ${styles["form-group"]}`}>
                <input
                  name="email"
                  type="email"
                  id="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
              <div className={`${styles["form-group"]}`}>
                <input
                  name="password"
                  type="password"
                  id="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </div>
              <div className="mt-3 justify-content-center align-items-center flex d-flex">
                <button className={`${styles["form-button"]}`}>
                  Forgot Password?
                </button>
              </div>
              <div className="mt-3 justify-content-center align-items-center flex d-flex">
                <button className={`${styles["form-login"]}`}>LOGIN</button>
              </div>
              <div className="mt-3 justify-content-center align-items-center flex d-flex">
                <p>
                  Don't have a Balanjo account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className={`${styles["button-register-now"]}`}
                  >
                    Register
                  </button>
                </p>
              </div>
            </div>
          </form>
        ) : role === "Seller" ? (
          <form onSubmit={loginSeller}>
            <div className="mt-5">
              <div className={`mb-3 ${styles["form-group"]}`}>
                <input
                  name="email"
                  type="email"
                  id="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
              <div className={`${styles["form-group"]}`}>
                <input
                  name="password"
                  type="password"
                  id="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </div>
              <div className="mt-3 justify-content-center align-items-center flex d-flex">
                <button className={`${styles["form-button"]}`}>
                  Forgot Password?
                </button>
              </div>
              <div className="mt-3 justify-content-center align-items-center flex d-flex">
                <button className={`${styles["form-login"]}`}>LOGIN</button>
              </div>
              <div className="mt-3 justify-content-center align-items-center flex d-flex">
                <p>
                  Don't have a Balanjo account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className={`${styles["button-register-now"]}`}
                  >
                    Register
                  </button>
                </p>
              </div>
            </div>
          </form>
        ) : (
          ""
        )}
      </section>
    </>
  );
};

export default Login;
