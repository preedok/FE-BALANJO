import React from 'react';
import style from './style.module.css';
import jacket from './img/jacket.png';
import pants from './img/pants.png';
import short from './img/short.png';
import shoes from './img/shoes.png';
import tshirt from './img/tshirt.png';

const CategoryCard = () => {
  return (
    <>
      <div className={`${style.card} ms-3`} style={{ backgroundColor: '#CC0B04' }}>
        <img alt="category" src={tshirt} />
        <p>T-Shirt</p>
      </div>
      <div className={style.card} style={{ backgroundColor: '#1C3391' }}>
        <img alt="category" src={short} />
        <p>Short</p>
      </div>
      <div className={style.card} style={{ backgroundColor: '#F67B02' }}>
        <img alt="category" src={jacket} />
        <p>Jacket</p>
      </div>
      <div className={style.card} style={{ backgroundColor: '#E31F51' }}>
        <img alt="category" src={pants} />
        <p>Pants</p>
      </div>
      <div className={style.card} style={{ backgroundColor: '#57CD9E' }}>
        <img alt="category" src={shoes} />
        <p>Shoes</p>
      </div>
    </>
  );
};

export default CategoryCard;
