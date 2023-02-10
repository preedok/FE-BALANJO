import React, { useEffect } from "react";
import styles from "./mybag.module.css";
import Navbar from "../../component/module/NavbarConditon";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import {LineWave} from "react-loader-spinner";

const Mybag = () => {
  const [bagState, setBagState] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  let sum = 0;

  for (let i = 0; i < bagState.length; i++) {
    if (bagState[i].status === 0) {
      sum += bagState[i].price * bagState[i].qty;
    }
  }

  let cart = 0;

  for (let i = 0; i < bagState.length; i++) {
    if (bagState[i].status === 0) {
      cart++;
    }
  }

  useEffect(() => {
    axios
      .get(`https://balanjo-api.cyclic.app/cart/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setBagState(response.data.data);
      })
      .catch((err) => {
        alert("Account not found");
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteItem = (id) => {
    // e.preventDefault();
    swal({
      title: "Remove Item",
      text: `Are you sure want to remove this item?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (confirm) => {
      if (confirm) {
        axios
          .delete(`https://balanjo-api.cyclic.app/cart/${id}`)
          .then(async () => {
            // const posts = bagState.filter((token) => token.id !== id);
            // setBagState({ data: posts });
            const result = await axios.get(
              `https://balanjo-api.cyclic.app/cart/`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setBagState(result.data.data);
            return navigate("/mybag");
          });
      }
    });
  };

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor:'red'
        }}
      >
        <LineWave
          height="145"
          width="140"
          color="white"
          ariaLabel="line-wave"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          firstLineColor=""
          middleLineColor=""
          lastLineColor=""
        />
      </div>
    );
  }

  
  return (
    <>
      <Navbar />
      <div className={`${styles["main"]}`}>
        <div className="container">
          <h1 className={styles["title"]}>My Bag</h1>
          <div className="row">
            <div className="col-sm-7 mb-4">
              <div className="mt-3">
                {bagState && cart > 0 ? (
                  bagState.map(
                    (item, index) =>
                      item.status === 0 && (
                        <div className={`mb-3 ${styles["card"]}`}>
                          <div className="card-body px-4 py-4">
                            <div className={styles["product"]}>
                              <div className="d-flex align-items-center">
                                <img
                                  className={styles["product-img"]}
                                  src={item.image}
                                  alt="suite"
                                  onClick={() =>
                                    navigate(`/v1/product/${item.product_id}`)
                                  }
                                />
                                <div className={styles["brand"]}>
                                  <h5>{item.name}</h5>
                                  <p>{item.seller_name}</p>
                                </div>
                              </div>
                              <div
                                className={`flex d-flex justify-content-center ${styles["count-product"]}`}
                              >
                                <button className={styles["circle"]}>-</button>
                                <p className={styles["sum"]}>{item.qty}</p>
                                <button className={styles["circle"]}>+</button>
                              </div>
                              <p className={styles["price"]}>Rp{item.price}</p>
                              <div className="float-item absolute">
                                <button
                                  type="button"
                                  onClick={() => deleteItem(item.cart_id)}
                                  className="btn btn-danger"
                                >
                                  delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                  )
                ) : (
                  <h3>You have nothing to buy at the moment!</h3>
                )}
              </div>
            </div>
            <div className="col-sm-5 mb-4 mt-3">
              <div className={styles["card"]}>
                <div className="card-body-right p-4">
                  <h3 className={styles["card-summary"]}>Shopping summary</h3>
                  <h5 className={styles["price"]}>
                    Total price
                    <span className="d-flex justify-content-end">Rp {sum}</span>
                  </h5>
                  <button
                    onClick={() => {
                      sum = 0
                        ? alert("Add something to cart first")
                        : navigate("/checkout");
                    }}
                    className={`${styles["buy"]}`}
                  >
                    Buy
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

export default Mybag;
