import React, { useEffect, useState } from "react";
import styles from "./search.module.css";
import icStar from "../../assets/icStar.svg";
import Navbar from "../../component/module/NavbarConditon";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

const Search = () => {
  const [queryParam] = useSearchParams();
  const titleSearch = queryParam.get("q");
  const [data, setData] = useState([]);
  console.log(titleSearch);

  useEffect(() => {
    axios
      .get(`https://balanjo-api.cyclic.app/product?search=${titleSearch}`)
      .then((response) => {
        setData(response.data.data);
        console.log(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [titleSearch]);

  console.log(titleSearch);
  return (
    <>
      <Navbar />

      <section className={`${styles.main}`}>
        <div className="container">
          <div className="row">
            <h4>Search Product</h4>
            <div className="row row-cols-1 row-cols-md-5 gx-0 gy-4">
              {data === 0 ? (
                <h4> Data Not Found</h4>
              ) : (
                data.map((item, index) => (
                  <div key={index} className="col">
                    <Link
                      to={`/v1/product/${item.product_id}`}
                      className={styles.cstmLink}
                    >
                      <div className="card h-100 mx-1">
                        <img
                          src={item.image}
                          className="card-img-top"
                          alt="imgNew"
                          style={{ height: "250px" }}
                        />
                        <div className="card-body">
                          <h5 className={styles.cardTitle}>{item.name}</h5>
                          <p className={styles.textPricecard}>
                            Rp. {item.price}
                          </p>
                          <p className={styles.textBrand}>{item.seller_name}</p>
                          <div className="d-flex flex-row">
                            <img src={icStar} alt="icStar" />
                            <img src={icStar} alt="icStar" />
                            <img src={icStar} alt="icStar" />
                            <img src={icStar} alt="icStar" />
                            <img src={icStar} alt="icStar" />
                            <div className={`ms-2 ${styles.textStar}`}>
                              (10)
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
