import React, { useEffect, useState } from "react";
import styles from "./productDetail.module.css";
import Navbar from "../../component/module/NavbarConditon";

import icStar from "../../assets/icStar.svg";
import icMinus from "../../assets/minus-icon.svg";
import icPlus from "../../assets/plus-icon.svg";
import icBigstar from "../../assets/Star.svg";

import CardProduct from "../../component/module/cardProduct";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./coba.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

const ProductDetail = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [data, setData] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://balanjo-api.cyclic.app/product/${id}`)
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.error(error);
        // router.push('/login')
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`https://balanjo-api.cyclic.app/product`)
      .then((response) => {
        console.log(response.data.data);
        setRecommend(response.data.data);
      })
      .catch((error) => {
        console.error(error);
        // router.push('/login')
      });
  }, []);

  const [qty, setQty] = useState(1);

  const handleIncrement = () => {
    setQty(qty + 1);
  };

  const handleDecrement = () => {
    setQty(qty - 1);
  };

  const handlePostBag = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const form = {
      pid: id,
      qty: qty,
    };

    axios
      .post(`https://balanjo-api.cyclic.app/cart`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        // setImage("");
        swal({
          title: "Success",
          text: `Item added to mybag!`,
          icon: "success",
        });
        return navigate("/mybag");
      })
      .catch((err) => {
        console.log(err);
        alert("Failed");
      });
  };

  return (
    <>
      <Navbar />
      <section className={` ${styles.main}`} style={{ marginTop: "-70px" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 py-5">
              <div className={`d-flex flex-row ${styles.sideInfocategory}`}>
                <p className={`me-3 ${styles.textInfocategory}`}>Home</p>
                <p className={`me-3 ${styles.textInfocategory}`}> &gt; </p>
                <p className={`me-3 ${styles.textInfocategory}`}>Category</p>
                <p className={`me-3 ${styles.textInfocategory}`}> &gt; </p>
                <p className={`me-3 ${styles.textInfocategory}`}>T-Shirt</p>
              </div>
            </div>
          </div>

          <div className={`row ${styles.pageOne}`}>
            <div className={`col-md-4 ${styles.leftsideImage}`}>
              <Swiper
                style={{
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
              >
                <SwiperSlide>
                  <img src={data.image} alt="gambar" />
                </SwiperSlide>
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={data.image} //ini 4 harusnya
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
              ></Swiper>
            </div>
            <div className={`col-md-8 ${styles.rightsideInformation}`}>
              <p className={styles.textTitleproduct}>{data.name}</p>
              <p className={styles.textBrandproduct}>{data.seller_name}</p>
              <div className="d-flex flex-row">
                <img src={icStar} alt="icStar" />
                <img src={icStar} alt="icStar" />
                <img src={icStar} alt="icStar" />
                <img src={icStar} alt="icStar" />
                <img src={icStar} alt="icStar" />
                <div className={`ms-2 ${styles.textStar}`}>(10)</div>
              </div>
              <p className={`mt-4 ${styles.textPrice}`}>Price</p>
              <p className={styles.textPricetag}>Rp {data.price}</p>
              <p className={`mt-5 ${styles.textColor}`}>Color</p>
              <div className="d-flex flex-row">
                <button className={`me-3 ${styles.colorBlack}`}> </button>
                <button className={`me-3 ${styles.colorRed}`}> </button>
                <button className={`me-3 ${styles.colorBlue}`}> </button>
                <button className={`me-3 ${styles.colorGreen}`}> </button>
              </div>
              <p className={`mt-5 ${styles.quantity} `}>
                Jumlah (Sisa : {data.stock})
              </p>
              <div className="d-flex flex-row">
                <button
                  onClick={() => handleDecrement()}
                  className={styles.icMinus}
                  disabled={qty <= 1}
                >
                  <img src={icMinus} alt="icMinus" />
                </button>
                <div className={`mx-3 mt-1 ${styles.textCount}`}>{qty}</div>
                <button
                  onClick={() => handleIncrement()}
                  className={styles.icPlus}
                  disabled={qty >= data.stock}
                >
                  <img src={icPlus} alt="icPlus" />
                </button>
              </div>
              <div className="d-flex flex-row mt-3">
                <button className={`py-2 ${styles.btnbuyNow}`}>Chat</button>

                <Link to={`/mybag`}>
                  <button
                    className={`mx-3 py-2 ${styles.btnbuyNow}`}
                    onClick={(e) => handlePostBag(e)}
                  >
                    Add Bag
                  </button>
                </Link>
                {/* <Link to="#">
                  <button className={`py-2 ${styles.btnbuyNow}`}>
                    Buy Now
                  </button>
                </Link> */}
              </div>
            </div>
          </div>

          <div
            className={`row py-5 ${styles.pageTwo}`}
            style={{ marginTop: "-80px" }}
          >
            <p className={styles.textTitlepagetwo}>Informasi Produk</p>
            <p className={`${styles.textSubtitle}`}>Condition</p>
            <p className={styles.textNew}>New</p>
            <p className={` ${styles.textSubtitle}`}>Description</p>
            <p className={`pe-5 ${styles.textDescription}`}>
              {data.description}
            </p>
            <p className={`mt-5 ${styles.textTitlepagetwo}`}>Product Review</p>
            <div className="d-flex flex-row">
              <div className="d-flex flex-column">
                <div className="d-flex flex-row">
                  <p className={styles.textBigratingleft}> 5.0 </p>
                  <p className={styles.textRatingleft}> /10 </p>
                </div>
                <div className="d-flex flex-row">
                  <img src={icBigstar} alt="icbigStar" />
                  <img src={icBigstar} alt="icbigStar" />
                  <img src={icBigstar} alt="icbigStar" />
                  <img src={icBigstar} alt="icbigStar" />
                  <img src={icBigstar} alt="icbigStar" />
                </div>
              </div>
              <div className="d-flex flex-column ms-5">
                <div className="d-flex flex-row">
                  <img src={icStar} alt="icStar" style={{ height: "20px" }} />
                  <p className={styles.textRating}>5</p>
                  <div className={`mx-3 mt-2 ${styles.linered}`}></div>
                  <p className={styles.textRating}>4</p>
                </div>
                <div className="d-flex flex-row">
                  <img src={icStar} alt="icStar" style={{ height: "20px" }} />
                  <p className={styles.textRating}>4</p>
                  <div className={`mx-3 mt-2 ${styles.linewhite}`}></div>
                  <p className={styles.textRating}>0</p>
                </div>
                <div className="d-flex flex-row">
                  <img src={icStar} alt="icStar" style={{ height: "20px" }} />
                  <p className={styles.textRating}>3</p>
                  <div className={`mx-3 mt-2 ${styles.linewhite}`}></div>
                  <p className={styles.textRating}>0</p>
                </div>
                <div className="d-flex flex-row">
                  <img src={icStar} alt="icStar" style={{ height: "20px" }} />
                  <p className={styles.textRating}>2</p>
                  <div className={`mx-3 mt-2 ${styles.linewhite}`}></div>
                  <p className={styles.textRating}>0</p>
                </div>
                <div className="d-flex flex-row">
                  <img src={icStar} alt="icStar" style={{ height: "20px" }} />
                  <p className={styles.textRating}>1</p>
                  <div className={`mx-3 mt-2 ${styles.linewhite}`}></div>
                  <p className={styles.textRatingbtm}>0</p>
                </div>
              </div>
            </div>
          </div>
          <hr />

          <div className={`row ${styles.pageThree}`}>
            <p className={styles.Titlepagethree}>You can also like this</p>
            <p className={styles.Subtitlepagethree}>
              You’ve never seen it before!
            </p>
            <div className="row row-cols-1 row-cols-md-5 gx-0 gy-4">
              {recommend &&
                recommend.map((item) => (
                  <CardProduct
                    byId={`/v1/product/${item.product_id}`}
                    linkImage={item.image}
                    nameProduct={item.name}
                    priceProduct={item.price}
                    sellerProduct={item.seller}
                  />
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
