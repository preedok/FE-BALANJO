/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import styles from "./checkout.module.css";
import Card from "../../component/module/card";
import Navbar from "../../component/module/navbarLogin";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const [checkoutState, setCheckoutState] = useState([]);
  const token = localStorage.getItem("token");
  const [address, setAddress] = useState([]);

  let sum = 0;

  if (checkoutState.data) {
    for (let i = 0; i < checkoutState.data.length; i++) {
      if (checkoutState.data[i].status === 0) {
        sum += checkoutState.data[i].price * checkoutState.data[i].qty;
      }
    }
  }

  let cart = 0;

  if (checkoutState.data) {
    for (let i = 0; i < checkoutState.data.length; i++) {
      if (checkoutState.data[i].status === 0) {
        cart++;
      }
    }
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/cart/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response.data)
        setCheckoutState(response.data);
      })
      .catch((err) => {
        alert("Order not found");
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/address/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response.data)
        setAddress(response.data);
      })
      .catch((err) => {
        alert("Account not found");
        console.log(err);
      });
  }, []);

  const payment = async () => {
    try {
      for (let i = 0; i < checkoutState.data.length; i++) {
        let data = {
          cid: checkoutState.data[i].cart_id,
          total: checkoutState.data[i].price * checkoutState.data[i].qty,
          payment: 0,
        };

        // console.log(data)
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/order/`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        swal({
          title: "Item Ordered",
          text: `Item ordered, please check your profile`,
          icon: "success",
        }).then(() => navigate("/mybag"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles["main"]}>
        <div className="container">
          <h1 className={styles["title"]}>Checkout</h1>
          <p className={styles["sub-title"]}>Shipping Adress</p>
          <div className="row">
            <div className="col-sm-7 mb-4">
              {address.data
                ? address.data.map((item, index) => (
                    <>
                      <div className={`mb-3 ${styles["card"]}`}>
                        <div className="card-body px-4 py-3">
                          <div className="flex align-items-center">
                            <p className={styles["buyer-name"]}>
                              {item.recipient}
                            </p>
                            <p className={styles["buyer-adress"]}>
                              {item.residence} {item.city} {item.postcode}
                            </p>
                            <button className={styles["btn-choose"]}>
                              Choose another address
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  ))
                : ""}
              {checkoutState.data && cart > 0 ? (
                checkoutState.data.map(
                  (item, index) =>
                    item.status === 0 && (
                      <Card
                        title={item.name}
                        storetitle={item.seller_name}
                        image={item.image}
                        price={item.price * item.qty}
                        qty={item.qty}
                      />
                    )
                )
              ) : (
                <h3>You have nothing to buy at the moment</h3>
              )}
            </div>
            <div className="col-sm-5 mb-4">
              <div className={styles["card"]}>
                <div className="card-body-right p-4">
                  <h3 className={styles["card-summary"]}>Shopping summary</h3>
                  <h5 className={styles["order"]}>
                    Order
                    <span className="d-flex justify-content-end">Rp {sum}</span>
                  </h5>
                  <h5 className={styles["delivery"]}>
                    Delivery
                    <span className="d-flex justify-content-end">Rp 10000</span>
                  </h5>
                  <hr />
                  <h3 className={styles["card-summary-bottom"]}>
                    Shopping summary
                    <span className="d-flex justify-content-end">
                      Rp {sum + 10000}
                    </span>
                  </h3>
                  <button
                    type="button"
                    onClick={payment}
                    className={`${styles["buy"]}`}
                  >
                    Make Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
