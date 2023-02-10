import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import { Link, useNavigate } from "react-router-dom";
import icCardTshirt from "../../assets/shirt.png";
import icCardShorts from "../../assets/short.png";
import icCardJacket from "../../assets/jacket.png";
import icCardPants from "../../assets/pants.png";
import icCardShoes from "../../assets/shoes.png";
import Carousel from "../../component/Carousel/index";
import CardProduct from "../../component/module/cardProduct";
import Navs from "../../component/module/NavbarConditon";
import CategoryCard from "../../component/CategoryCard";
import "./App.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./test.css";

import { Pagination, Navigation } from "swiper";
import axios from "axios";
import { getProduct } from "../../redux/action/productAction";
import { useDispatch } from "react-redux";

const Home = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState();
  const dispatch = useDispatch();
  useEffect((setData) => {
    dispatch(getProduct(setData));
  }, []);

  const [sort, setSort] = useState("product_id");
  const [asc, setAsc] = useState("asc");
  const [page, setPage] = useState(1);
  useEffect(() => {
    getDataProduct(sort, asc, 5, page);
  }, [sort, asc, page]);
  const getDataProduct = (sort, asc, limit, page) => {
    axios
      .get(
        `https://balanjo-api.cyclic.app/product?sortby=${sort}&order=${asc}&limit=${limit}${
          page ? `&page=${page}` : ""
        }`
      )
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSorting = () => {
    if (sort === "product_id") {
      setSort("name");
    } else {
      setSort("product_id");
    }
    getDataProduct(sort, asc, 3, page);
  };

  const handleSortasc = () => {
    if (asc === "asc") {
      setAsc("desc");
    } else {
      setAsc("asc");
    }
    getDataProduct(sort, asc, 3, page);
  };

  const NextPage = () => {
    setPage(page + 1);
    getDataProduct(sort, asc, 3, page);
    console.log(page);
  };
  const PreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      console.log(page);
      getDataProduct(sort, asc, 3, page - 1);
    }
  };
  const [isDarkMode, setIsDarkMode] = useState(false);
  function toggleDarkMode() {
    setIsDarkMode(!isDarkMode);
  }
  return (
    <>
      <div className={`App ${isDarkMode ? "dark-mode" : "light-mode"}`}>
        <Navs />
        <header className="App-header">
          <div className="container">
            <div className="col-md-12 py-2 g-0">
              <div className=" form-switch">
                <input
                  className="form-check-input toggle-button"
                  style={{ width: "52px", height: "26px" }}
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  checked={isDarkMode}
                  onChange={toggleDarkMode}
                />
              </div>
              <div className="row">
                <div className={styles.carousel + " position-relative pt-2"}>
                  <Carousel />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 g-0">
                <div className={`d-flex flex-column ${styles.categorySwiper}`}>
                  <p className={styles.textTitlemain}> Category </p>
                  <p className={styles.textSubmain}>
                    What are you currently looking for
                  </p>
<CategoryCard/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 g-0">
                <div className={`d-flex flex-column  ${styles.newSide}`}>
                  <p className={styles.textTitlemain}> New </p>
                  <p className={styles.textSubmain}>
                    You’ve never seen it before!
                  </p>
                  <div className="dropdown mb-2">
                    <button
                      className={`btn btn-outline-danger dropdown-toggle ${styles.spanCostumsort}`}
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Sort
                    </button>
                    <ul className="dropdown-menu">
                      <li
                        className="dropdown-item"
                        href="#"
                        onClick={() => handleSortasc()}
                      >
                        Sortir by {asc}
                      </li>
                      <li
                        className="dropdown-item"
                        href="#"
                        onClick={() => handleSorting()}
                      >
                        Sortir by {sort}
                      </li>
                    </ul>
                  </div>
                  <div className="row row-cols-1 row-cols-md-5 gx-0 gy-4">
                    {/* {JSON.stringify(data)} */}
                    {data.length === 0 ? (
                      <h3> Data Not Found </h3>
                    ) : (
                      data.map((item) => (
                        <CardProduct
                          byId={`/v1/product/${item.product_id}`}
                          linkImage={item.image}
                          nameProduct={item.name}
                          priceProduct={item.price}
                          sellerProduct={item.seller}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <nav aria-label="Page navigation example ">
                <ul className="pagination d">
                  <li onClick={() => PreviousPage()} className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      {page}
                    </a>
                  </li>

                  <li
                    disabled={data <= 0}
                    onClick={() => NextPage()}
                    className="page-item"
                  >
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="row">
              <div className="col-md-12 g-0">
                <div className={`d-flex flex-column ${styles.popularSide}`}>
                  <p className={styles.textTitlemain}> Popular </p>
                  <p className={styles.textSubmain}>
                    Find clothes that are trending recently
                  </p>
                  <div className="row row-cols-1 row-cols-md-5 gx-0 gy-4">
                    {/* {JSON.stringify(data)} */}
                    {data.length === 0 ? (
                      <h3> Data sudah habis </h3>
                    ) : (
                      data.map((item) => (
                        <CardProduct
                          byId={`/v1/product/${item.product_id}`}
                          linkImage={item.image}
                          nameProduct={item.name}
                          priceProduct={item.price}
                          sellerProduct={item.seller}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Home;
