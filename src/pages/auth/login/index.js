import React from "react";
import logo from "../../../assets/logo.svg";
import swal from "sweetalert";
import styles from "../auth.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [role, setRole] = useState("Buyer");
  const navigate = useNavigate();

  const [formBuyer, setFormBuyer] = useState({
    email: "",
    password: "",
  });

  const [formSeller, setFormSeller] = useState({
    email: "",
    password: "",
  });

  const loginBuyer = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:5000/buyer/login`, formBuyer)
      .then((response) => {
        console.log(response);
        if (response.data.status !== "success") {
          swal({
            title: "Login Success",
            text: `Your account have been updated`,
            icon: "success",
          })
           return navigate("/"); 
        } else {
          const token = response.data.data.token;

          localStorage.setItem("token", token);

          localStorage.setItem(
            "buyer",
            JSON.stringify(response.data.data.buyer)
          );

          localStorage.setItem(
            "email",
            JSON.stringify(response.data.data.buyer.email)
          );
          localStorage.setItem(
            "name",
            JSON.stringify(response.data.data.buyer.name)
          );
          swal({
            title: "Login Success",
            text: `Your account have been updated`,
            icon: "success",
          })
          return navigate('/')
          
        }
      })
      .catch(() => {
        swal({
          title: "Login Failed",
          text: `Make sure your data is correct!`,
          icon: "warning",
        });
      });
  };

  const loginSeller = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:5000/seller/login`, formSeller)
      .then((response) => {
        console.log(response);
        if (response.data.status !== "success") {
          swal({
            title: "Login Success",
            text: `Your account Success Login`,
            icon: "success",
          })
          return  navigate("/");
         

        } else {
          const token = response.data.data.token;

          localStorage.setItem("token", token);

          localStorage.setItem(
            "seller",
            JSON.stringify(response.data.data.seller)
          );

          localStorage.setItem(
            "email",
            JSON.stringify(response.data.data.seller.email)
          );
          localStorage.setItem(
            "name",
            JSON.stringify(response.data.data.seller.name)
          );
          swal({
            title: "Login Success",
            text: `Your account have been updated`,
            icon: "success",
          })
          
        }
        return navigate('/')
      })
      .catch(() => {
        swal({
          title: "Login Failed",
          text: `Make sure your data is correct!`,
          icon: "warning",
        });
      });
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
                  onChange={(e) =>
                    setFormBuyer({ ...formBuyer, email: e.target.value })
                  }
                  value={formBuyer.email}
                  placeholder="Email"
                />
              </div>
              <div className={`${styles["form-group"]}`}>
                <input
                  name="password"
                  type="password"
                  id="password"
                  onChange={(e) =>
                    setFormBuyer({ ...formBuyer, password: e.target.value })
                  }
                  value={formBuyer.password}
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
                  Don't have a Tikitoko account?{" "}
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
                  onChange={(e) =>
                    setFormSeller({ ...formSeller, email: e.target.value })
                  }
                  value={formSeller.email}
                  placeholder="Email"
                />
              </div>
              <div className={`${styles["form-group"]}`}>
                <input
                  name="password"
                  type="password"
                  id="password"
                  onChange={(e) =>
                    setFormSeller({ ...formSeller, password: e.target.value })
                  }
                  value={formSeller.password}
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
                  Don't have a Tikitoko account?{" "}
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
