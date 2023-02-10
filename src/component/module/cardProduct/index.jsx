import React from "react";
import styles from "./cardproduct.module.css";
import icStar from "../../../assets/icStar.svg";
import { Link } from "react-router-dom";

const CardProduct = ({
  byId,
  linkImage,
  nameProduct,
  priceProduct,
  sellerProduct,
}) => {
  return (
    <>
      {/* {JSON.stringify(data)} */}
      <div className="col">
        <Link to={byId} className={styles.cstmLink}>
          <div  className="card h-100 mx-1">
            <img
              src={linkImage}
              className="card-img-top"
              alt="imgNew"
              style={{ height: "200px" }}
            />
            <div className="card-body " style={{ height: "130px" }}>
              <h5 className={styles.cardTitle}>{nameProduct}</h5>
              <p className={styles.textPricecard}>Rp. {priceProduct}</p>
              <p className={styles.textBrand}>{sellerProduct}</p>
              <div className="d-flex flex-row">
                <img src={icStar} alt="icStar" />
                <img src={icStar} alt="icStar" />
                <img src={icStar} alt="icStar" />
                <img src={icStar} alt="icStar" />
                <img src={icStar} alt="icStar" />
                <div className={`ms-2 ${styles.textStar}`}>(10)</div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default CardProduct;
