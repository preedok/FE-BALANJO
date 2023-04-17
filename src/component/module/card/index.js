import React from "react";
import styles from "./card.module.css";

const Card = ({ title, storetitle, image, price, qty }) => {
  const currencyFormat = (num) => {
    return (
      "Rp. " +
      Number(num)
        .toFixed(0)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    );
  };
  return (
    <>
      <div className="mt-3 ">
        <div className={styles["card"]}>
          <div className="card-body px-4 py-4">
            <div className={styles["product"]}>
              <div className="d-flex align-items-center">
                <img
                  className={styles["product-img"]}
                  src={image}
                  alt="suite"
                />
                <div className={styles["brand"]}>
                  <h5>
                    {title} x {qty}
                  </h5>
                  <p>{storetitle}</p>
                </div>
              </div>
              <p className={styles["price"]}>{currencyFormat(price)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
