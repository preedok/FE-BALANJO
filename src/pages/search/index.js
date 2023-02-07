import React, { useEffect, useState } from "react";
import styles from "./search.module.css";
import icStar from "../../assets/icStar.svg";
import Navbar from "../../component/module/NavbarConditon";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

const Search = () => {
  // const navigate = useNavigate()

  // const [search, setSearch] = useState()

  // const handleSearch = (e) => {
  //   if(e.key === "Enter"){
  //     navigate(`/search?q=${search}`)
  //   }
  // }

  const [queryParam] = useSearchParams();
  const titleSearch = queryParam.get("q");
  const [data, setData] = useState([]);
  console.log(titleSearch);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/product?search=${titleSearch}`)
      .then((response) => {
        setData(response.data.data);
        console.log(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [titleSearch]);

  console.log(titleSearch);

  // const navigate = useNavigate()

  // const queryParams = new URLSearchParams(window.location.search);
  //   const q = queryParams.get("q");
  //   const [search, setSearch] = useState();

  //   const handleSearch = async (e) => {
  //     if (e.key === "Enter") {
  //       await navigate(`/search?q=${search}`);
  //       // setCurrentPage(1)
  //       // filterRecipe(search, currentPage);
  //     }
  //   };
  return (
    <>
      <Navbar />

      <section className={`${styles.main}`}>
        <div className="container">
          <div className="row">
            {/* <div className="col-md-12 py-5">
              <div className="d-flex flex-row">
                <p className={`me-3 ${styles.textInfocategory}`}>Home</p>
                <p className={`me-3 ${styles.textInfocategory}`}> &gt; </p>
                <p className={`me-3 ${styles.textInfocategory}`}>Category</p>
                <p className={`me-3 ${styles.textInfocategory}`}> &gt; </p>
                <p className={`me-3 ${styles.textInfocategory}`}>T-Shirt</p>
              </div>
            </div> */}
            {/* <p className={`mt-3 ${styles.textTitleCategory}`}> T-Shirt </p> */}
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
