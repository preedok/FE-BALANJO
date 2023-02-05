/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./profileSeller.module.css";
import pictureUser from "../../assets/user-icon.svg";
import iconHome from "../../assets/home-icon.svg";
import iconPensil from "../../assets/pencil-icon.svg";
import packageIcon from "../../assets/package-icon.svg";
import iconOrder from "../../assets/cart-icon-white.svg";
import iconEmpety from "../../assets/no-product.png";
import iconMyOrderEmpty from "../../assets/no-order.png";
import iconBell from "../../assets/bell-icon.svg";
import iconMail from "../../assets/mail-icon.svg";
import searchIcon from "../../assets/search-icon.svg";
import logo from "../../assets/logo.svg";
import swal from "sweetalert";
import Navbar from "../../component/module/NavbarConditon";
// import { getDetailSeller } from "../../redux/action/user.action";

const ProfileSeller = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  //get ID from parameter URL
  // const { id } = useParams();

  const [icondown, setIconDown] = useState(0);
  const [iconDownOrder, setIconDownOrder] = useState(0);
  const [iconDownStore, setIconDownStore] = useState(0);
  const [disableEdit, setDisableEdit] = useState(0);
  const [viewPage, setViwPage] = useState(0);
  const [profile, setProfile] = useState({});
  const [updateImage, setUpdateImage] = useState();
  const [category, setCategory] = useState([]);
  const [imageProduct, setImageProduct] = useState();
  const [query, setQuery] = useState("");
  const [queryOrder, setQueryOrder] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("product_id");
  const [sortOrder, setSortOrder] = useState("asc");

  // const user = useSelector((state) => state.user);

  useEffect(() => {
    // dispatch(getDetailSeller(id));
    getDataProfile();
    getDataCategory();
    getOwnProduct(query, sort, sortOrder, 3, page);
    getOwnOrder(queryOrder);
  }, [query, sort, sortOrder, page]);

  const [preview, setPreview] = useState();
  const getDataProfile = () => {
    const seller = JSON.parse(localStorage.getItem("seller"));
    const id = seller.seller_id;
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/seller/${id}`)
      .then((res) => {
        setProfile(res.data.data);
        if (res.data.data.avatar) {
          setPreview(res.data.data.avatar);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [updateProfile, setUpdateProfile] = useState({});

  const handleInput = (e) => {
    setUpdateProfile({
      ...updateProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    document.getElementById("addImageProfile").innerHTML = fileUploaded.name;
    setUpdateImage(fileUploaded);
    setPreview([URL.createObjectURL(event.target.files[0])]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const id = profile.seller_id;
    let inputForm = new FormData();
    if (updateProfile.name) {
      inputForm.append("name", updateProfile.name);
    }
    if (updateProfile.email) {
      inputForm.append("email", updateProfile.email);
    }
    if (updateProfile.phone) {
      inputForm.append("phone", updateProfile.phone);
    }
    if (updateProfile.description) {
      inputForm.append("description", updateProfile.description);
    }
    inputForm.append("avatar", updateImage);
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/seller/${id}`, inputForm)
      .then((res) => {
        console.log(res.data);
        swal({
          title: "Store Updated",
          text: `Your store have been updated`,
          icon: "success",
        });
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [insertProduct, setInsertProduct] = useState({
    cid: "",
    name: "",
    stock: "",
    price: "",
    condition: "",
    description: "",
  });

  const [previewImage, setPreviewImage] = useState();
  const handleChangeProduct = (event) => {
    const fileUploaded = event.target.files[0];
    document.getElementById("addImage").innerHTML = fileUploaded.name;
    setImageProduct(fileUploaded);
    setPreviewImage([URL.createObjectURL(event.target.files[0])]);
  };

  const onSubmitInsertProduct = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    let inputForm = new FormData();
    inputForm.append("cid", insertProduct.cid);
    inputForm.append("name", insertProduct.name);
    inputForm.append("stock", insertProduct.stock);
    inputForm.append("price", insertProduct.price);
    inputForm.append("condition", insertProduct.condition);
    inputForm.append("description", insertProduct.description);
    inputForm.append("image", imageProduct);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/product`, inputForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setInsertProduct(res.data.data);
        swal({
          title: "Product Added",
          text: `New product have been added`,
          icon: "success",
        });
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDataCategory = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/category`)
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [ownProduct, setOwnProduct] = useState([]);
  const getOwnProduct = (query, sort, sortOrder, limit, page) => {
    const token = localStorage.getItem("token");
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/product/myproduct?search=${query}&sortby=${sort}&order=${sortOrder}&limit=${limit}${
          page ? `&page=${page}` : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setOwnProduct(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const NextPage = () => {
    setPage(page + 1);
    getOwnProduct(query, sort, sortOrder, 3, page);
  };

  const PreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      getOwnProduct(query, sort, sortOrder, 3, page - 1);
    }
  };

  //SORTING
  const handleSorting = () => {
    if (sort === "product_id") {
      setSort("name");
    } else {
      setSort("product_id");
    }
    getOwnProduct(query, sort, sortOrder, 3, page);
  };

  // ASCENDING
  const handleSortingAsc = () => {
    if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder("asc");
    }
    getOwnProduct(query, sort, sortOrder, 3, page);
  };

  const deleteProduct = (product_id) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/product/${product_id}`)
      .then((res) => {
        console.log(res);
        alert("Delete Success");
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [detailProduct, setDetailProduct] = useState([]);
  const getDetailProduct = (product_id) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/product/${product_id}`)
      .then((res) => {
        console.log(res.data);
        setDetailProduct(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [productUpdate, setProductUpdate] = useState({});
  const handleInputProduct = (e) => {
    setProductUpdate({
      ...productUpdate,
      [e.target.name]: e.target.value,
    });
  };

  const onUpdateProduct = (e) => {
    e.preventDefault();
    const id = detailProduct.product_id;
    let inputForm = new FormData();
    if (productUpdate.name) {
      inputForm.append("name", productUpdate.name);
    }
    if (productUpdate.stock) {
      inputForm.append("stock", productUpdate.stock);
    }
    if (productUpdate.price) {
      inputForm.append("price", productUpdate.price);
    }
    if (productUpdate.description) {
      inputForm.append("description", productUpdate.description);
    }
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/product/${id}`, inputForm)
      .then((res) => {
        console.log(res.data);
        swal({
          title: "Product Updated",
          text: `Your product have been updated`,
          icon: "success",
        });
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [ownOrder, setOwnOrder] = useState([]);
  const getOwnOrder = (queryOrder) => {
    const token = localStorage.getItem("token");
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/order/myorder?search=${queryOrder}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setOwnOrder(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Logout Handling
  const [isLogout, setIsLogout] = useState(false);

  const handleLogout = () => {
    swal({
      title: "Logging Out",
      text: `Are you sure want to leave?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (confirm) => {
      if (confirm) {
        localStorage.removeItem("token");
        localStorage.removeItem("buyer");
        localStorage.removeItem("persist:data");
        setIsLogout(true);
      }
    });
  };

  const updateOrder = (val) => {
    swal({
      title: "Confirm payment?",
      icon: "info",
      buttons: true,
      dangerMode: true,
    }).then(async (confirm) => {
      if (confirm) {
        axios
          .put(`${process.env.REACT_APP_BACKEND_URL}/order/pay/${val}`)
          .then((res) => {
            swal({
              title: "Payment confirmed",
              icon: "success",
            });
          });
      }
    });
  };

  useEffect(() => {
    if (isLogout) {
      swal({
        title: "Logged Out",
        text: `You have been logged out`,
        icon: "success",
      });
      navigate("/login");
    }
  }, [isLogout, navigate]);

  return (
    <section>
    <div className="container-fluid-custom ">
    <Navbar />
    </div>
    <div className={styles.containerFluidCustom}>
      <div className="row">
        <div style={{marginTop:'-60px'}} className={`col-md-3  ${styles.containerSatu}`}>
          <div className={styles.containerProfileSideLeft}>
            <div className="row">
              <div className="col-auto ">
                <div className={`${styles.bgImgLeft}`}>
                  <img
                    className={styles.imgLeft}
                    src={profile.avatar}
                    alt=""
                  />
                </div>
              </div>
              <div className="col-auto">
                <div>
                  <h5 className="mt-3">{profile.name}</h5>
                </div>
                {/* <div className={styles.buttonEditProfile}>
                  <button onClick={(e) => setDisableEdit(1)}>
                    <img src={iconPensil} alt="" /> Ubah profile
                  </button>
                </div> */}
              </div>
            </div>
            <div className="mt-2">
              <div>
                {iconDownStore === 0 ? (
                  <button
                    type="button"
                    className={styles.btnStore}
                    data-bs-toggle="collapse"
                    data-bs-target="#select-store"
                    onClick={(e) => setIconDownStore(1)}
                  >
                    <div className="row">
                      <div className="col">
                        <div className={styles.bgHome}>
                          <img
                            className={styles.iconHome}
                            src={iconHome}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="col">
                        <h6 className="mt-2">Store</h6>
                      </div>
                      <div className="col">
                        <i className="fa fa-sort-up mt-3" />
                      </div>
                    </div>
                  </button>
                ) : (
                  <button
                    type="button"
                    className={styles.btnStore}
                    data-bs-toggle="collapse"
                    data-bs-target="#select-store"
                    onClick={(e) => setIconDownStore(0)}
                  >
                    <div className="row">
                      <div className="col">
                        <div className={styles.bgHome}>
                          <img
                            className={styles.iconHome}
                            src={iconHome}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="col">
                        <h6 className="mt-2">Store</h6>
                      </div>
                      <div className="col">
                        <i className="fa fa-sort-down mt-2" />
                      </div>
                    </div>
                  </button>
                )}

                <div
                  id="select-store"
                  className={`collapse show ${styles.collapseStore}`}
                >
                  <button
                    className={styles.btnStore}
                    onClick={(e) => setViwPage(0)}
                  >
                    Store Profile
                  </button>
                </div>
              </div>
              <div className="mt-3">
                {iconDownOrder === 0 ? (
                  <button
                    type="button"
                    className={styles.btnStore}
                    data-bs-toggle="collapse"
                    data-bs-target="#select-product"
                    onClick={(e) => setIconDownOrder(1)}
                  >
                    <div className="row">
                      <div className="col">
                        <div className={styles.bgProduct}>
                          <img
                            className={styles.iconHome}
                            src={packageIcon}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="col">
                        <h6 className="mt-2">Product</h6>
                      </div>
                      <div className="col">
                        <i className="fa fa-sort-up mt-3" />
                      </div>
                    </div>
                  </button>
                ) : (
                  <button
                    type="button"
                    className={styles.btnStore}
                    data-bs-toggle="collapse"
                    data-bs-target="#select-product"
                    onClick={(e) => setIconDownOrder(0)}
                  >
                    <div className="row">
                      <div className="col">
                        <div className={styles.bgProduct}>
                          <img
                            className={styles.iconHome}
                            src={packageIcon}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="col">
                        <h6 className="mt-2">Product</h6>
                      </div>
                      <div className="col">
                        <i className="fa fa-sort-down mt-2" />
                      </div>
                    </div>
                  </button>
                )}
                <div
                  id="select-product"
                  className={`collapse ${styles.collapseStore}`}
                >
                  <div className="mb-2">
                    <button
                      className={styles.btnStore}
                      onClick={(e) => setViwPage(1)}
                    >
                      My Product
                    </button>
                  </div>
                  <div>
                    <button
                      className={styles.btnStore}
                      onClick={(e) => setViwPage(2)}
                    >
                      Selling Product
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                {icondown === 0 ? (
                  <button
                    type="button"
                    className={styles.btnStore}
                    data-bs-toggle="collapse"
                    data-bs-target="#select-order"
                    onClick={(e) => setIconDown(1)}
                  >
                    <div className="row">
                      <div className="col">
                        <div className={styles.bgOrder}>
                          <img
                            className={styles.iconHome}
                            src={iconOrder}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="col">
                        <h6 className="mt-2">Order</h6>
                      </div>
                      <div className="col">
                        <i className="fa fa-sort-up mt-3" />
                      </div>
                    </div>
                  </button>
                ) : (
                  <button
                    type="button"
                    className={styles.btnStore}
                    data-bs-toggle="collapse"
                    data-bs-target="#select-order"
                    onClick={(e) => setIconDown(0)}
                  >
                    <div className="row">
                      <div className="col">
                        <div className={styles.bgOrder}>
                          <img
                            className={styles.iconHome}
                            src={iconOrder}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="col">
                        <h6 className="mt-2">Order</h6>
                      </div>

                      <div className="col">
                        <i className="fa fa-sort-down mt-2" />
                      </div>
                    </div>
                  </button>
                )}
                <div
                  id="select-order"
                  className={`collapse ${styles.collapseStore}`}
                >
                  <div className="mb-2">
                    <button
                      className={styles.btnStore}
                      onClick={(e) => setViwPage(3)}
                    >
                      My Order
                    </button>
                  </div>
                  <div className="mb-2">
                    <button
                      className={styles.btnStore}
                      onClick={(e) => setViwPage(5)}
                    >
                      Get Paid
                    </button>
                  </div>
                  <div className="mb-2">
                    <button
                      className={styles.btnStore}
                      onClick={(e) => setViwPage(6)}
                    >
                      Not Yet Paid
                    </button>
                  </div>
                  <div>
                    <button
                      className={styles.btnStore}
                      onClick={(e) => setViwPage(4)}
                    >
                      Order Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{marginTop:'-70px'}} className={`col-md-9 ${styles.containerDua}`}>
          <div className={styles.containerProfileSideRight}>
            {viewPage === 0 ? (
              <div className={styles.containerCardStoreProfile}>
                <div className={styles.containerTitle}>
                  <div>
                    <h5>My profile store</h5>
                  </div>
                  <div>
                    <p className="text-secondary">
                      Manage your profile information
                    </p>
                  </div>
                  <hr />
                </div>
                {disableEdit === 0 ? (
                  <div className={styles.containerMain}>
                    <div className="row">
                      <div
                        className={`col-md-8  ${styles.containerStoreProduct}`}
                      >
                        <form>
                          <div className="group-input mb-3">
                            <div className="row">
                              <div className="col-md-3">
                                <label className="text-secondary">
                                  Store Name
                                </label>
                              </div>
                              <div className="col">
                                <input
                                  className={styles.inputStoreProfile}
                                  type="text"
                                  defaultValue={profile.name}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                          <div className="group-input mb-3">
                            <div className="row">
                              <div className="col-md-3">
                                <label className="text-secondary">
                                  Email
                                </label>
                              </div>
                              <div className="col">
                                <input
                                  className={styles.inputStoreProfile}
                                  type="email"
                                  defaultValue={profile.email}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                          <div className="group-input mb-3">
                            <div className="row">
                              <div className="col-md-3">
                                <label className="text-secondary">
                                  Phone Number
                                </label>
                              </div>
                              <div className="col">
                                <input
                                  className={styles.inputStoreProfile}
                                  type="phone"
                                  defaultValue={profile.phone}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                          <div className="group-input">
                            <div className="row">
                              <div className="col-md-3">
                                <label className="text-secondary">
                                  Store Description
                                </label>
                              </div>
                              <div className="col">
                                <textarea
                                  className={
                                    styles.textareaDescriptionProfile
                                  }
                                  type="text"
                                  defaultValue={profile.description}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-4 mt-3">
                              <button
                                disabled
                                className={styles.buttonSaveProfile}
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="col-md-4 text-center">
                        <div className={styles.containePictureUser}>
                          <img
                            className={styles.img}
                            src={profile.avatar}
                            alt=""
                          />
                        </div>
                        <div className="mt-3">
                          <input
                            id="addImageProfile"
                            className={styles.inputPhoto}
                            type="file"
                            disabled
                          />
                          <label
                            style={{ cursor: "pointer" }}
                            htmlFor="addImageProfile"
                            className={styles.buttonUploadPhoto}
                          >
                            Select Image
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.containerMain}>
                    <div className="row">
                      <div
                        className={`col-md-8  ${styles.containerStoreProduct}`}
                      >
                        <form>
                          <div className="group-input mb-3">
                            <div className="row">
                              <div className="col-md-3">
                                <label className="text-secondary">
                                  Store Name
                                </label>
                              </div>
                              <div className="col">
                                <input
                                  className={styles.inputStoreProfile}
                                  type="text"
                                  name="name"
                                  placeholder={
                                    profile.name ? profile.name : ""
                                  }
                                  onChange={handleInput}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="group-input mb-3">
                            <div className="row">
                              <div className="col-md-3">
                                <label className="text-secondary">
                                  Email
                                </label>
                              </div>
                              <div className="col">
                                <input
                                  className={styles.inputStoreProfile}
                                  type="email"
                                  name="email"
                                  placeholder={profile.email}
                                  onChange={handleInput}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="group-input mb-3">
                            <div className="row">
                              <div className="col-md-3">
                                <label className="text-secondary">
                                  Phone Number
                                </label>
                              </div>
                              <div className="col">
                                <input
                                  className={styles.inputStoreProfile}
                                  type="phone"
                                  name="phone"
                                  placeholder={profile.phone}
                                  onChange={handleInput}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="group-input">
                            <div className="row">
                              <div className="col-md-3">
                                <label className="text-secondary">
                                  Store Description
                                </label>
                              </div>
                              <div className="col">
                                <textarea
                                  className={
                                    styles.textareaDescriptionProfile
                                  }
                                  type="text"
                                  name="description"
                                  placeholder={profile.description}
                                  onChange={handleInput}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-4 mt-3">
                              <button
                                onClick={onSubmit}
                                className={styles.buttonSaveProfile}
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="col-md-4 text-center">
                        <div className={styles.containePictureUser}>
                          <img
                            className={styles.img}
                            src={preview ? preview : profile.avatar}
                            alt="avatar"
                          />
                        </div>
                        <div className="mt-3">
                          <input
                            id="addImageProfile"
                            className={styles.inputPhoto}
                            src={preview ? preview : profile.avatar}
                            type="file"
                            onChange={handleChange}
                          />
                          <label
                            style={{ cursor: "pointer" }}
                            htmlFor="addImageProfile"
                            className={styles.buttonUploadPhoto}
                          >
                            Select Image
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : viewPage === 1 ? (
              <div className={styles.containerCardMyProduct}>
                <div className={styles.containerTitleMyProduct}>
                  <div>
                    <h5>My Product</h5>
                  </div>
                  <div>
                    <button
                      className={styles.btnStore}
                      style={{
                        borderBottom: "2px solid red",
                        color: "red",
                      }}
                    >
                      All items
                    </button>
                  </div>
                  <hr />
                </div>
                <div className={styles.containerMainMyProduct}>
                  <div className="row">
                    <div className="col mt-1">
                      <div className={`row ${styles.containerSearch}`}>
                        <div
                          className="col-auto"
                          style={{ paddingTop: "12px" }}
                        >
                          <img src={searchIcon} alt="" />
                        </div>
                        <div className="col-auto">
                          <input
                            className={styles.searchMyProduct}
                            type="text"
                            placeholder="Search"
                            onChange={(e) => setQuery(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col mt-2" style={{ textAlign: "right" }}>
                      <div className="btn-group">
                        <button
                          type="button"
                          className={styles.buttonFilter}
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <span>
                            <i className="fa fa-caret-down" /> Filter
                          </span>
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <a
                              className="dropdown-item"
                              onClick={() => handleSorting()}
                            >
                              Filter Berdasarkan {sort.toUpperCase()}
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              onClick={() => handleSortingAsc()}
                            >
                              Filter Berdasarkan {sortOrder.toUpperCase()}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    {/* <div className={styles.TitleAllItem}>
                      <div>
                        <div className="row">
                          <div className="col" style={{ textAlign: "left" }}>
                            <span className="text-secondary">
                              Product name <i class="fa fa-sort"></i>
                            </span>
                          </div>
                          <div className="col" style={{ textAlign: "right" }}>
                            <div className="row">
                              <div className="col">
                                <span className="text-secondary">
                                  Price <i class="fa fa-sort"></i>
                                </span>
                              </div>
                              <div className="col-auto">
                                <span className="text-secondary">
                                  Stock <i class="fa fa-sort"></i>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    <div className={styles.containerMainAllItem}>
                      {ownProduct === "" ? (
                        <div className="mt-4 text-center">
                          <img src={iconEmpety} alt="" />
                        </div>
                      ) : (
                        <table className="mt-4 table table-hover table-responsive">
                          <thead>
                            <tr>
                              <th scope="col">No</th>
                              <th>Name Product</th>
                              <th>Stock</th>
                              <th>Price</th>
                              <th>Condition</th>
                              <th>Description</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          {ownProduct.map((data, index) => (
                            <tbody>
                              <tr>
                                <td>{index + 1}</td>
                                <td>{data.name}</td>
                                <td>{data.stock}</td>
                                <td>Rp. {data.price}</td>
                                <td>
                                  {data.condition === 0 ? "Baru" : "Bekas"}
                                </td>
                                <td>{data.description}</td>
                                <td>
                                  <div className="row">
                                    <div className="col-auto">
                                      <button
                                        className={styles.updateProduct}
                                        data-bs-toggle="modal"
                                        data-bs-target="#staticBackdrop"
                                        onClick={(e) =>
                                          getDetailProduct(data.product_id, e)
                                        }
                                      >
                                        <i className="fa fa-pencil" />
                                      </button>
                                    </div>
                                    <div className="col-auto">
                                      <button
                                        onClick={(e) =>
                                          deleteProduct(data.product_id, e)
                                        }
                                        className={styles.deleteProduct}
                                      >
                                        <i class="fa fa-trash"></i>
                                      </button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          ))}
                        </table>
                      )}
                      {/* MODAL UPDATE */}
                      <div>
                        <div
                          className="modal fade"
                          id="staticBackdrop"
                          data-bs-backdrop="static"
                          data-bs-keyboard="false"
                          tabIndex={-1}
                          aria-labelledby="staticBackdropLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h1
                                  className="modal-title fs-5"
                                  id="staticBackdropLabel"
                                >
                                  Update Product
                                </h1>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                />
                              </div>
                              <div className="modal-body">
                                <form >
                                  <div className="form-group">
                                    <label className="text-secondary">
                                      Name Product
                                    </label>
                                    <div>
                                      <input
                                        className={styles.inputUpdateProduct}
                                        type="text"
                                        defaultValue={detailProduct.name}
                                        name="name"
                                        onChange={handleInputProduct}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-group mt-3">
                                    <label className="text-secondary">
                                      Stock
                                    </label>
                                    <div>
                                      <div
                                        className={`${styles.containerStockUpdate}`}
                                      >
                                        <div className="row">
                                          <div className="col-auto">
                                            <input
                                              className={
                                                styles.inputStockUpdate
                                              }
                                              type="text"
                                              defaultValue={
                                                detailProduct.stock
                                              }
                                              name="stock"
                                              onChange={handleInputProduct}
                                            />
                                          </div>
                                          <div
                                            className="col-auto"
                                            style={{
                                              textAlign: "right",
                                              paddingTop: "10px",
                                            }}
                                          >
                                            <span className="text-secondary">
                                              buah
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="form-group mt-3">
                                    <label className="text-secondary">
                                      Price
                                    </label>
                                    <div>
                                      <input
                                        className={styles.inputUpdateProduct}
                                        type="text"
                                        defaultValue={detailProduct.price}
                                        name="price"
                                        onChange={handleInputProduct}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-group mt-3">
                                    <label className="text-secondary">
                                      Description
                                    </label>
                                    <div>
                                      <input
                                        className={styles.inputUpdateProduct}
                                        type="text"
                                        defaultValue={
                                          detailProduct.description
                                        }
                                        name="description"
                                        onChange={handleInputProduct}
                                      />
                                    </div>
                                  </div>
                                </form>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button
                                  className="btn btn-primary"
                                  onClick={onUpdateProduct}
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* END MODAL UPDATE */}
                    <div className="d-flex justify-content-center mt-3">
                      <ul className="pagination">
                        <li className="page-item">
                          <button
                            className="btn btn-warning-custom page-link"
                            disabled={page === 1}
                            onClick={() => PreviousPage()}
                          >
                            <i class="fa fa-backward"></i>
                          </button>
                        </li>
                        <li style={{ marginLeft: 3 }}>
                          <button className="btn btn-warning-custom page-link">
                            {page}
                          </button>
                        </li>
                        <li style={{ marginLeft: 3 }} className="page-item">
                          <button
                            className="btn btn-warning-custom page-link"
                            disabled={ownProduct === 0}
                            onClick={() => NextPage()}
                          >
                            <i class="fa fa-forward"></i>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : viewPage === 2 ? (
              <div>
                <div className={styles.containerSellingProduct}>
                  <div className={styles.containerCardInventory}>
                    <div>
                      <h5>Category</h5>
                    </div>
                    <hr />
                    <div>
                      <form>
                        <div className="form-group">
                          <label className="text-secondary">
                            Type category
                          </label>
                          <div>
                            <select
                              className={styles.selectCategory}
                              onChange={(e) =>
                                setInsertProduct({
                                  ...insertProduct,
                                  cid: e.target.value,
                                })
                              }
                            >
                              <option className="text-secondary" value="">
                                --Choice Category--
                              </option>
                              {category.map((data) => (
                                <option value={data.category_id}>
                                  {data.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 ${styles.containerSellingProduct}`}>
                  <div className={styles.containerCardInventory}>
                    <div>
                      <h5>Inventory</h5>
                    </div>
                    <hr />
                    <div>
                      <form>
                        <div className="form-group">
                          <label className="text-secondary">
                            Name of goods
                          </label>
                          <div>
                            <input
                              className={styles.inputInventory}
                              type="text"
                              onChange={(e) => {
                                setInsertProduct({
                                  ...insertProduct,
                                  name: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className={styles.containerItemDetails}>
                  <div className={styles.TitleItemDetails}>
                    <div>
                      <h5>Item Details</h5>
                    </div>
                    <hr />
                  </div>
                  <div className={`${styles.containerMainItemDetails}`}>
                    <form>
                      <div className="form-group">
                        <label className="text-secondary">Unit Price</label>
                        <div>
                          <input
                            className={styles.inputInventory}
                            type="text"
                            onChange={(e) => {
                              setInsertProduct({
                                ...insertProduct,
                                price: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-group mt-3">
                        <label className="text-secondary">Stock</label>
                        <div>
                          <div className={`${styles.containerStock}`}>
                            <div className="row">
                              <div className="col-auto">
                                <input
                                  className={styles.inputStock}
                                  type="text"
                                  onChange={(e) => {
                                    setInsertProduct({
                                      ...insertProduct,
                                      stock: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                              <div
                                className="col-auto"
                                style={{
                                  textAlign: "right",
                                  paddingTop: "10px",
                                }}
                              >
                                <span className="text-secondary">buah</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="mt-4 form-group">
                          <label
                            style={{ color: "#696f79" }}
                            className="form-label"
                          >
                            Condition
                          </label>
                          <div className="row">
                            <div className="col-md-2">
                              <div>
                                <div className="row text-center">
                                  <div className="col-auto">
                                    <input
                                      className={styles.radioStock}
                                      type="radio"
                                      value="0"
                                      onChange={(e) => {
                                        setInsertProduct({
                                          ...insertProduct,
                                          condition: e.target.value,
                                        });
                                      }}
                                    />
                                  </div>
                                  <div className="col-auto">
                                    <span className="text-secondary">
                                      Baru
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-2">
                              <div>
                                <div className="row text-center">
                                  <div className="col-auto">
                                    <input
                                      className={styles.radioStock}
                                      type="radio"
                                      value="1"
                                      onChange={(e) => {
                                        setInsertProduct({
                                          ...insertProduct,
                                          condition: e.target.value,
                                        });
                                      }}
                                    />
                                  </div>
                                  <div className="col-auto">
                                    <span className="text-secondary">
                                      Bekas
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className={styles.containerPhotOfGoods}>
                  <div className={styles.TitlePhotoOfGoods}>
                    <div>
                      <h5>Photo Of Goods</h5>
                    </div>
                    <hr />
                  </div>
                  <div className={styles.containerMainPhotoOfGoods}>
                    <div>
                      <div>
                        <label className={styles.bgPreviewPhoto}>
                          <img
                            className={styles.cardPreviewPhoto}
                            src={previewImage ? previewImage : packageIcon}
                            alt=""
                          />
                        </label>
                        <input
                          id="addImage"
                          className={styles.inputPhoto}
                          type="file"
                          src={previewImage ? previewImage : packageIcon}
                          onChange={handleChangeProduct}
                        />
                      </div>
                      <div className="mt-3">
                        <span className="text-secondary">Foto Utama</span>
                      </div>
                      <hr />
                    </div>
                    <div className="text-center">
                      <label
                        style={{ cursor: "pointer" }}
                        htmlFor="addImage"
                        className={styles.buttonUploadPhoto}
                      >
                        Upload Photo
                      </label>
                    </div>
                  </div>
                </div>
                <div className={styles.containerDescription}>
                  <div className={styles.TitleDescription}>
                    <div>
                      <h5>Description</h5>
                    </div>
                    <hr />
                  </div>
                  <div className={styles.containerMainDescription}>
                    <textarea
                      className={styles.descriptionTextarea}
                      type="text"
                      placeholder="Description"
                      onChange={(e) => {
                        setInsertProduct({
                          ...insertProduct,
                          description: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="mt-5" style={{ textAlign: "right" }}>
                  <button
                    onClick={onSubmitInsertProduct}
                    className={styles.buttonJual}
                  >
                    Jual
                  </button>
                </div>
              </div>
            ) : viewPage === 3 ? (
              <div className={styles.containerCardMyOrder}>
                <div className={styles.TitleMyOrder}>
                  <div>
                    <h5>My Order</h5>
                  </div>
                  <div>
                    <div className="row">
                      <div className="col-auto">
                        <button
                          className={styles.btnStore}
                          style={{
                            borderBottom: "2px solid red",
                            color: "red",
                            width: "100%",
                          }}
                          onClick={(e) => setViwPage(3)}
                        >
                          All items
                        </button>
                      </div>
                      <div className="col-auto">
                        <button
                          className={styles.btnStore}
                          style={{
                            color: "grey",
                            width: "100%",
                          }}
                          onClick={(e) => setViwPage(5)}
                        >
                          Get Paid
                        </button>
                      </div>
                      <div className="col-auto">
                        <button
                          className={styles.btnStore}
                          style={{
                            color: "grey",
                            width: "100%",
                          }}
                          onClick={(e) => setViwPage(6)}
                        >
                          Not Yet Paid
                        </button>
                      </div>
                      <div className="col-auto">
                        <button
                          className={styles.btnStore}
                          style={{
                            color: "grey",
                            width: "100%",
                          }}
                          onClick={(e) => setViwPage(4)}
                        >
                          Order Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
                <div className={styles.containerMainMyOrder}>
                  <div className="mt-1">
                    <div className={`row ${styles.containerSearch}`}>
                      <div
                        className="col-auto"
                        style={{ paddingTop: "12px" }}
                      >
                        <img src={searchIcon} alt="" />
                      </div>
                      <div className="col-auto">
                        <input
                          className={styles.searchMyProduct}
                          type="text"
                          placeholder="Search"
                          onChange={(e) => setQueryOrder(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-3">
                    {ownOrder === "" ? (
                      <img src={iconMyOrderEmpty} alt="" />
                    ) : (
                      <table className="table table-hover table-responsive">
                        <thead>
                          <tr>
                            <th scope="col">No</th>
                            <th>Name Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                            <th>Buyer</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        {ownOrder.map((data, index) => (
                          <tbody>
                            <tr>
                              <td>{index + 1}</td>
                              <td>{data.name}</td>
                              <td>{data.qty}</td>
                              <td>Rp. {data.price}</td>
                              <td>Rp. {data.total}</td>
                              <td>{data.buyer_name}</td>
                              <td>
                                {data.status === 0 ? (
                                  <div
                                    className={`p-1 ${styles.deleteProduct}`}
                                  >
                                    <span>Belum bayar</span>
                                  </div>
                                ) : data.status === 1 ? (
                                  <div className={`p-1 ${styles.bgPaid}`}>
                                    <span>Sudah bayar</span>
                                  </div>
                                ) : (
                                  <div
                                    className={`p-1 ${styles.deleteProduct}`}
                                  >
                                    <span>Dibatalkan</span>
                                  </div>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        ))}
                      </table>
                    )}
                  </div>
                </div>
              </div>
            ) : viewPage === 4 ? (
              <div className={styles.containerCardOrderCancel}>
                <div className={styles.TitleOrderCancel}>
                  <div>
                    <h5>My Order</h5>
                  </div>
                  <div>
                    <div className="row">
                      <div className="col-auto">
                        <button
                          className={styles.btnStore}
                          style={{
                            color: "grey",
                            width: "100%",
                          }}
                          onClick={(e) => setViwPage(3)}
                        >
                          All items
                        </button>
                      </div>
                      <div className="col-auto">
                        <button
                          className={styles.btnStore}
                          style={{
                            color: "grey",
                            width: "100%",
                          }}
                          onClick={(e) => setViwPage(5)}
                        >
                          Get Paid
                        </button>
                      </div>
                      <div className="col-auto">
                        <button
                          className={styles.btnStore}
                          style={{
                            color: "grey",
                            width: "100%",
                          }}
                          onClick={(e) => setViwPage(6)}
                        >
                          Not Yet Paid
                        </button>
                      </div>
                      <div className="col-auto">
                        <button
                          className={styles.btnStore}
                          style={{
                            borderBottom: "2px solid red",
                            color: "red",
                            width: "100%",
                          }}
                          onClick={(e) => setViwPage(4)}
                        >
                          Order Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
                <div className={styles.containerMainMyOrder}>
                  <div className="mt-1">
                    <div className={`row ${styles.containerSearch}`}>
                      <div
                        className="col-auto"
                        style={{ paddingTop: "12px" }}
                      >
                        <img src={searchIcon} alt="" />
                      </div>
                      <div className="col-auto">
                        <input
                          className={styles.searchMyProduct}
                          type="text"
                          placeholder="Search"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-3">
                    {ownOrder === "" ? (
                      <img src={iconMyOrderEmpty} alt="" />
                    ) : (
                      <table className="table table-hover table-responsive">
                        <thead>
                          <tr>
                            <th scope="col">No</th>
                            <th>Name Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                            <th>Buyer</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        {ownOrder.map((data, index) => (
                          <tbody>
                            {data.status === 2 ? (
                              <tr>
                                <td>{index + 1}</td>
                                <td>{data.name}</td>
                                <td>{data.qty}</td>
                                <td>Rp. {data.price}</td>
                                <td>Rp. {data.total}</td>
                                <td>{data.buyer_name}</td>
                                <td>
                                  <div
                                    className={`p-1 ${styles.deleteProduct}`}
                                  >
                                    <span>Dibatalkan</span>
                                  </div>
                                </td>
                              </tr>
                            ) : (
                              ""
                            )}
                          </tbody>
                        ))}
                      </table>
                    )}
                  </div>
                </div>
              </div>
            ) : viewPage === 5 ? (
              <div className={styles.containerCardOrderCancel}>
                <div className={styles.TitleOrderCancel}>
                  <div>
                    <h5>My Order</h5>
                  </div>
                  <div>
                    <div className="row">
                      <div className="col-auto">
                        <button
                          className={styles.btnStore}
                          style={{
                            color: "grey",
                            width: "100%",
                          }}
                          onClick={(e) => setViwPage(3)}
                        >
                          All items
                        </button>
                      </div>
                      <div className="col-auto">
                        <button
                          className={styles.btnStore}
                          style={{
                            borderBottom: "2px solid red",
                            color: "red",
                            width: "100%",
                          }}
                          onClick={(e) => setViwPage(5)}
                        >
                          Get Paid
                        </button>
                      </div>
                      <div className="col-auto">
                        <button
                          className={styles.btnStore}
                          style={{
                            color: "grey",
                            width: "100%",
                          }}
                          onClick={(e) => setViwPage(6)}
                        >
                          Not Yet Paid
                        </button>
                      </div>
                      <div className="col-auto">
                        <button
                          className={styles.btnStore}
                          style={{
                            color: "grey",
                            width: "100%",
                          }}
                          onClick={(e) => setViwPage(4)}
                        >
                          Order Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
                <div className={styles.containerMainMyOrder}>
                  <div className="mt-1">
                    <div className={`row ${styles.containerSearch}`}>
                      <div
                        className="col-auto"
                        style={{ paddingTop: "12px" }}
                      >
                        <img src={searchIcon} alt="" />
                      </div>
                      <div className="col-auto">
                        <input
                          className={styles.searchMyProduct}
                          type="text"
                          placeholder="Search"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-3">
                    {ownOrder === "" ? (
                      <img src={iconMyOrderEmpty} alt="" />
                    ) : (
                      <table className="table table-hover table-responsive">
                        <thead>
                          <tr>
                            <th scope="col">No</th>
                            <th>Name Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                            <th>Buyer</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        {ownOrder.map((data, index) =>
                          data.status === 1 ? (
                            <tbody>
                              <tr>
                                <td>{index + 1}</td>
                                <td>{data.name}</td>
                                <td>{data.qty}</td>
                                <td>Rp. {data.price}</td>
                                <td>Rp. {data.total}</td>
                                <td>{data.buyer_name}</td>
                                <td>
                                  {data.status === 1 ? (
                                    <div className={`p-1 ${styles.bgPaid}`}>
                                      <span>Sudah bayar</span>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          ) : (
                            ""
                          )
                        )}
                      </table>
                    )}
                  </div>
                </div>
              </div>
            ) : viewPage === 6 ? (
              <div className={styles.containerCardOrderCancel}>
                <div className={styles.TitleOrderCancel}>
                  <div>
                    <h5>My Order</h5>
                  </div>
                  <div>
                    <div className="row">
                      <div className="col-auto">
                        <button
                          className={styles.btnStore}
                          style={{
                            color: "grey",
                            width: "100%",
                          }}
                          onClick={(e) => setViwPage(3)}
                        >
                          All items
                        </button>
                      </div>
                      <div className="col-auto">
                        <button
                          className={styles.btnStore}
                          style={{
                            color: "grey",
                            width: "100%",
                          }}
                          onClick={(e) => setViwPage(5)}
                        >
                          Get Paid
                        </button>
                      </div>
                      <div className="col-auto">
                        <button
                          className={styles.btnStore}
                          style={{
                            borderBottom: "2px solid red",
                            color: "red",
                            width: "100%",
                          }}
                          onClick={(e) => setViwPage(6)}
                        >
                          Not Yet Paid
                        </button>
                      </div>
                      <div className="col-auto">
                        <button
                          className={styles.btnStore}
                          style={{
                            color: "grey",
                            width: "100%",
                          }}
                          onClick={(e) => setViwPage(4)}
                        >
                          Order Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
                <div className={styles.containerMainMyOrder}>
                  <div className="mt-1">
                    <div className={`row ${styles.containerSearch}`}>
                      <div
                        className="col-auto"
                        style={{ paddingTop: "12px" }}
                      >
                        <img src={searchIcon} alt="" />
                      </div>
                      <div className="col-auto">
                        <input
                          className={styles.searchMyProduct}
                          type="text"
                          placeholder="Search"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-3">
                    {ownOrder === "" ? (
                      <img src={iconMyOrderEmpty} alt="" />
                    ) : (
                      <table className="table table-hover table-responsive">
                        <thead>
                          <tr>
                            <th scope="col">No</th>
                            <th>Name Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                            <th>Buyer</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        {ownOrder.map((data, index) =>
                          data.status === 0 ? (
                            <tbody>
                              <tr>
                                <td>{index + 1}</td>
                                <td>{data.name}</td>
                                <td>{data.qty}</td>
                                <td>Rp. {data.price}</td>
                                <td>Rp. {data.total}</td>
                                <td>{data.buyer_name}</td>
                                <td>
                                  {data.status === 0 ? (
                                    <button
                                      className={`p-1 ${styles.deleteProduct}`}
                                      onClick={() =>
                                        updateOrder(data.order_id)
                                      }
                                    >
                                      <span>Konfirmasi</span>
                                    </button>
                                  ) : (
                                    ""
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          ) : (
                            ""
                          )
                        )}
                      </table>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default ProfileSeller;
