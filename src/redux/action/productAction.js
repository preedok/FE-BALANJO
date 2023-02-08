import axios from "axios";
import swal from "sweetalert2";

// Read ( GET )
export const getProduct = (setData) => async (dispatch) => {
  try {
    axios.get(`https://balanjo-api.cyclic.app/product`).then((response) => {
      console.log(response.data);
      setData(response.data.data);
    });
    dispatch({ type: "GET_ALL_PRODUCT", payload: "success" });
  } catch (error) {
    swal.fire({
      text: error.response.data.message,
      icon: "warning",
    });
  }
};

// Create
export const createProduct =
  (insertProduct, imageProduct) => async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      let inputForm = new FormData();
      inputForm.append("name", insertProduct.name);
      inputForm.append("stock", insertProduct.stock);
      inputForm.append("price", insertProduct.price);
      inputForm.append("condition", insertProduct.condition);
      inputForm.append("description", insertProduct.description);
      inputForm.append("image", imageProduct);
      axios
        .post(`https://balanjo-api.cyclic.app/product`, inputForm, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          swal.fire({
            title: "Product Added",
            text: `New product have been added`,
            icon: "success",
          });
        });
      dispatch({ type: "CREATE_PRODUCT", payload: "success" });
    } catch (err) {
      swal.fire({
        text: err.response.data.message,
        icon: "warning",
      });
    }
  };

// Update
export const updateProduct = (detailProduct, image) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("product_id", detailProduct.product_id);
    formData.append("name", detailProduct.name);
    formData.append("stock", detailProduct.stock);
    formData.append("price", detailProduct.price);
    formData.append("condition", detailProduct.condition);
    formData.append("description", detailProduct.description);
    formData.append("image", image, image.name);

    const res = await axios
      .put(
        `https://balanjo-api.cyclic.app/product/${detailProduct.product_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        swal.fire({
          title: "Product Update",
          text: `Update Product Success`,
          icon: "success",
        });
      });

    dispatch({
      type: "UPDATE_PRODUCT",
      payload: res.data,
    });
  } catch (error) {
    swal.fire({
      text: "error",
      icon: "error",
    });
  }
};

// Delete
export const deleteProducts = (product_id) => async (dispatch) => {
  try {
    axios
      .delete(`https://balanjo-api.cyclic.app/product/${product_id}`)
      .then((res) => {
        console.log(res);
        swal.fire({
          title: "Product Delete",
          text: `Delete Product Success`,
          icon: "success",
        });
      });
    dispatch({ type: "DELETE_PRODUCT", payload: "success" });
  } catch (error) {
    swal.fire({
      text: "success delete product",
      icon: "warning",
    });
  }
};
