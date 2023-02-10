import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "./pants.png";
import image2 from "./shirt.png";
import image3 from "./shoes.png";
import image4 from "./short.png";
import style from "./style.module.css";
import Slider from "react-slick";

export default class Carousel extends Component {
  render() {
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      slidesToShow: 4,
      autoplay: true,
      speed: 5000,
      autoplaySpeed: 2000,
      cssEase: "linear",
      pauseOnHover: true,
    };
    return (
      <div>
        <Slider {...settings}>
          <div className={style.items + " d-flex"}>
            <div className={style.insideitem}>
              <img className={style.dd} src={image1} alt="" />
            </div>
      
          </div>
          <div className={style.items + "  d-flex"}>
            <div className={style.insideitem}>
              <img className={style.dd} src={image4} alt="" />
            </div>
          
          </div>
          <div className={style.items + "  d-flex"}>
            <div className={style.insideitem}>
              <img className={style.dd} src={image2} alt="" />
            </div>
         
          </div>
          <div className={style.items + "  d-flex"}>
            <div className={style.insideitem}>
              <img className={style.dd} src={image3} alt="" />
            </div>
          
          </div>
          <div className={style.items + "  d-flex"}>
            <div className={style.insideitem}>
              <img className={style.dd} src={image1} alt="" />
            </div>
          
          </div>
          <div className={style.items + "  d-flex"}>
            <div className={style.insideitem}>
              <img className={style.dd} src={image4} alt="" />
            </div>
          
          </div>
          
          <div className={style.items + "  d-flex"}>
            <div className={style.insideitem}>
              <img className={style.dd} src={image3} alt="" />
            </div>
          
          </div>
         
        </Slider>
      </div>
    );
  }
}
