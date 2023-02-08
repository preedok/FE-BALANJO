import axios from "axios";
import swal from "sweetalert2";

export const loginUser = (data, navigate, setLoading) => async (dispacth) => {
  try {
    const response = await axios.post(
      `https://balanjo-api.cyclic.app/buyer/login`,
      data
    );
    const token = response.data.data.token;
    localStorage.setItem("token", token);
    localStorage.setItem("buyer", JSON.stringify(response.data.data.buyer));
    localStorage.setItem(
      "email",
      JSON.stringify(response.data.data.buyer.email)
    );
    localStorage.setItem("name", JSON.stringify(response.data.data.buyer.name));
    dispacth({ type: "CUSTOMER_LOGIN_SUCCESS", payload: token });
    swal.fire({
      text: response.data.message,
      icon: "success",
    });

    navigate("/");
  } catch (error) {
    swal.fire({
      text: error.response.data.message,
      icon: "warning",
    });
    setLoading(false);
  }
};

export const loginSellers =
  (data, navigate, setLoading) => async (dispacth) => {
    try {
      const response = await axios.post(
        `https://balanjo-api.cyclic.app/seller/login`,
        data
      );
      const token = response.data.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("seller", JSON.stringify(response.data.data.seller));
      localStorage.setItem(
        "email",
        JSON.stringify(response.data.data.seller.email)
      );
      localStorage.setItem(
        "name",
        JSON.stringify(response.data.data.seller.name)
      );
      dispacth({ type: "SELLER_LOGIN_SUCCESS", payload: token });
      swal.fire({
        text: response.data.message,
        icon: "success",
      });

      navigate("/store");
    } catch (error) {
      swal.fire({
        text: error.response.data.message,
        icon: "warning",
      });
      setLoading(false);
    }
  };
