import React, { useState, useEffect } from "react";
import Webcam from "webcam-react";
import axios from "axios";

const App = () => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageProduct, setImageProduct] = useState();
  const [insertProduct, setInsertProduct] = useState({
    cid: "",
    image: "",
  })

  const handleCapture = (dataUri) => {
    setImage(dataUri);
  };

  const handleAddProduct = (e) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token not found");
      return;
    }

    e.preventDefault();

    let inputForm = new FormData();
    inputForm.append("cid", insertProduct.cid);
    inputForm.append("image", imageProduct);

    setIsLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/product/`, inputForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setInsertProduct(res.data.data);
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Webcam onCapture={handleCapture} />
      <button onClick={handleAddProduct}>Add Product</button>
      {error && <div>Error: {error}</div>}
      {isLoading && <div>Loading...</div>}
    </div>
  );
};

export default App;
