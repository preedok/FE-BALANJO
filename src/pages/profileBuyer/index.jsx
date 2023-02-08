/* eslint-disable array-callback-return */
import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./profilebuyer.module.css";
import user from "../../assets/user-icon.svg";
import location from "../../assets/location-icon.svg";
import order from "../../assets/order-icon.svg";
import Navbar from "../../component/module/NavbarConditon";
import axios from "axios";
import swal from "sweetalert";
import DataTable from "react-data-table-component";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ProfileBuyer = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState({});

  const data = JSON.parse(localStorage.getItem("buyer"));
  const id = data.buyer_id;

  const [dateBirth, setDateBirth] = useState("");
  useEffect(() => {
    axios
      .get(`https://balanjo-api.cyclic.app/buyer/${id}`)
      .then((res) => {
        console.log(res.data);
        setUsers(res.data.data);
        convertDateBirthday(res.data.data.birthdate);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const convertDateBirthday = (date) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();

    const tempDate = {
      year: year,
      month: `${month < 10 ? `0${month}` : month}`,
      day: `${day < 10 ? `0${day}` : day}`,
    };

    const formattedDate = `${tempDate.year}-${tempDate.month}-${tempDate.day}`;

    setDateBirth(formattedDate);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    formData.append("buyer_id", id);
    axios
      .put(`https://balanjo-api.cyclic.app/buyer/${id}`, formData)
      .then((res) => {
        swal({
          title: "Update Success",
          text: `Your account have been updated`,
          icon: "success",
        }).then(() => {
          navigate("/profile");
        });
      })
      .catch((err) => {
        alert("Update Failed");
      });
  };

  const hiddenFileInput = useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);
  };

  const [viewPage, setViewPage] = useState(0);
  const [address, setAddress] = useState([]);
  const [editAddress, setEditAddress] = useState({});

  useEffect(() => {
    axios
      .get(`https://balanjo-api.cyclic.app/address`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setAddress(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [addressForm, setAddressForm] = useState({
    label: "",
    recipient: "",
    phone: "",
    residence: "",
    postcode: "",
    city: "",
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (
      addressForm.label === "" ||
      addressForm.recipient === "" ||
      addressForm.phone === "" ||
      addressForm.residence === "" ||
      addressForm.postcode === "" ||
      addressForm.city === ""
    ) {
      alert("Please fill all the form");
    } else {
      const body = {
        label: addressForm.label,
        recipient: addressForm.recipient,
        phone: addressForm.phone,
        residence: addressForm.residence,
        postcode: addressForm.postcode,
        city: addressForm.city,
      };
      axios
        .post(`https://balanjo-api.cyclic.app/address`, body, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setAddressForm(res.data.data);
          swal({
            title: "Address Added",
            text: `New address have been added`,
            icon: "success",
          }).then(() => {
            navigate("/profile");
          });
        })
        .catch((err) => {
          console.log(err);
          swal({
            title: "Failed",
            text: `Make sure your address data is correct!`,
            icon: "warning",
          });
        });
    }
  };

  const deleteAddress = (address_id) => {
    swal({
      title: "Remove address?",
      text: `Are you sure want to remove this address?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (confirm) => {
      if (confirm) {
        axios
          .delete(`https://balanjo-api.cyclic.app/address/${address_id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            setAddressForm(res.data.data);
            swal({
              title: "Remove Success",
              text: `Address have been removed`,
              icon: "success",
            });
          })
          .catch(() => {
            swal({
              title: "Failed",
              text: `Failed removing address`,
              icon: "warning",
            });
          });
      }
    });
  };

  const prepareDataAddress = (address_id) => {
    axios
      .get(`https://balanjo-api.cyclic.app/address/${address_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setEditAddress(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateAddress = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://balanjo-api.cyclic.app/address/${editAddress.address_id}`,
        editAddress,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setAddressForm(res.data.data);
        swal({
          title: "Address updated",
          text: `Your address have been updated`,
          icon: "success",
        }).then(() => {
          navigate("/profile");
        });
      })
      .catch(() => {
        swal({
          title: "Update failed",
          text: `Make sure your address data is correct`,
          icon: "warning",
        });
      });
  };

  const cancelOrder = (val) => {
    swal({
      title: "Cancel order?",
      text: `Are you sure want to cancel this order?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (confirm) => {
      if (confirm) {
        axios
          .put(`https://balanjo-api.cyclic.app/order/cancel/${val}`)
          .then((res) => {
            swal({
              title: "Order Cancelled",
              text: `Order have been cancelled`,
              icon: "success",
            });
          });
      }
    });
  };

  const [posts, setPosts] = useState([]);
  const columns = [
    {
      name: "Image",
      selector: "image",
      sortable: true,
      cell: (row) => (
        <img
          src={row.image}
          alt={row.title}
          style={{
            width: "70px",
            marginBottom: "10px",
            marginTop: "10px",
            borderRadius: "15px",
          }}
        />
      ),
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Seller Name",
      selector: "seller_name",
      sortable: true,
    },
    {
      name: "Price",
      selector: "price",
      sortable: true,
    },

    {
      name: "Quantity",
      selector: "qty",
      sortable: true,
    },
    {
      name: "Total",
      selector: "total",
      sortable: true,
    },
    {
      name: "Status Bayar",
      selector: "status",
      sortable: true,
      cell: (row) => (
        <p
          src={row.status}
          alt={row.title}
          style={{
            marginBottom: "10px",
            marginTop: "10px",
            borderRadius: "15px",
          }}
        >
          {" "}
          {row.status === 0 ? (
            <div className={`p-1 ${styles.deleteProduct}`}>
              <span style={{ fontSize: "17px" }}>Belum</span>
            </div>
          ) : row.status === 1 ? (
            <div className={`p-1 ${styles.bgPaid}`}>
              <span style={{ fontSize: "17px" }}>Sudah</span>
            </div>
          ) : (
            <div className={`p-1 ${styles.deleteProduct}`}>
              <span style={{ fontSize: "17px" }}>Batal</span>
            </div>
          )}{" "}
        </p>
      ),
    },
    {
      name: "Cancel",
      selector: "cancel",
      sortable: true,
      cell: (row) => (
        <button
          onClick={() => cancelOrder(row.order_id)}
          alt={row.cancel}
          className="btn btn-outline-danger"
        >
          X
        </button>
      ),
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`https://balanjo-api.cyclic.app/order`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setPosts(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const generatePDF = () => {
    const docDefinition = {
      content: [
        {
          table: {
            headerRows: 1,
            body: [
              [
                {
                  text: "Image",
                  style: "tableHeader",
                },
                { text: "Name", style: "tableHeader" },
                { text: "Seller Name", style: "tableHeader" },
                { text: "Price", style: "tableHeader" },
                { text: "Quantity", style: "tableHeader" },
                { text: "Total", style: "tableHeader" },
                { text: "Status", style: "tableHeader" },
              ],
              ...posts.map((post) => [
                post.image,
                post.name,
                post.seller_name,
                post.price,
                post.qty,
                post.total,
                post.status,
              ]),
            ],
          },
        },
      ],
      styles: {
        tableHeader: {
          bold: true,
          fontSize: 15,
          color: "#000",
        },
      },
    };
    pdfMake.createPdf(docDefinition).download("data order product balanjo.pdf");
  };

  return (
    <>
      <Navbar />
      <div className={`container-fluid  ${styles.customContainer}`}>
        <div className="container">
          <div className="row">
            <div className={`col-md-2 bg-white  px-5`}>
              <div className="col-md-12 ">
                <div className="row">
                  <div className="col-md-3 mb-3">
                    <img
                      src={
                        users.avatar
                          ? users.avatar
                          : require("../../assets/dummy.jpg")
                      }
                      alt=""
                      width={65}
                      height={65}
                      className={`${styles.potos} rounded-circle`}
                      style={{ border: "2px solid red" }}
                    />
                  </div>
                  <span className={styles.nama}>{users.name}</span>
                </div>
                <div className={` col-md-12 mb-3 `}>
                  <small>
                    <img
                      src={user}
                      alt="usericon"
                      className={`rounded-circle ${styles.bgBlue} text-white p-2 mb-2 `}
                    ></img>
                    <span
                      className="ms-2 mb-3"
                      onClick={() => setViewPage(0)}
                      style={{ cursor: "pointer" }}
                    >
                      Account
                    </span>
                  </small>
                  <small>
                    <img
                      src={location}
                      alt="locationIcon"
                      className={`rounded-circle ${styles.bgOrange} text-white p-2 mb-2 ms-2`}
                    ></img>
                    <span
                      className="ms-2 "
                      onClick={() => setViewPage(1)}
                      style={{ cursor: "pointer" }}
                    >
                      Address
                    </span>
                  </small>
                  <small>
                    <img
                      src={order}
                      alt="orderIcon"
                      className={`rounded-circle ${styles.bgPink} text-white p-2 ms-1`}
                    ></img>
                    <span
                      className="ms-2"
                      onClick={() => setViewPage(2)}
                      style={{ cursor: "pointer" }}
                    >
                      Order
                    </span>
                  </small>
                </div>
              </div>
            </div>
            {viewPage === 0 ? (
              <div
                className={`col-md-8 bg-white p-5 rounded-5 ${styles.customMobileSection}`}
                id="account"
              >
                <form
                  onSubmit={(e) => {
                    handleUpdate(e);
                  }}
                >
                  <div className="col-md-12">
                    <h5>My Profile</h5>
                    <p className="text-muted">
                      Manage your profile information
                    </p>
                    <hr />
                  </div>
                  <div className="row">
                    <div className="col-md-9">
                      <div className="row my-4">
                        <div className="col-md-3">
                          <label htmlFor="username" className="text-muted">
                            Name
                          </label>
                        </div>
                        <div className="col-md-8">
                          <input
                            type="text"
                            name="name"
                            id="username"
                            className="form-control"
                            placeholder="Masukkan nama"
                            defaultValue={users.name}
                          />
                        </div>
                      </div>
                      <div className="row my-4">
                        <div className="col-md-3">
                          <label htmlFor="email" className="text-muted">
                            Email
                          </label>
                        </div>
                        <div className="col-md-8">
                          <input
                            type="text"
                            name="email"
                            id="email"
                            // disabled
                            className="form-control"
                            placeholder="Masukkan email"
                            defaultValue={users.email}
                          />
                        </div>
                      </div>
                      <div className="row my-4">
                        <div className="col-md-3">
                          <label htmlFor="phone" className="text-muted">
                            Phone
                          </label>
                        </div>
                        <div className="col-md-8">
                          <input
                            type="text"
                            name="phone"
                            id="phone"
                            className="form-control"
                            placeholder="Masukkan nomor telepon"
                            defaultValue={users.phone}
                          />
                        </div>
                      </div>

                      <div className="row my-4">
                        <div className="col-md-3">
                          <label htmlFor="gender" className="text-muted">
                            Gender
                          </label>
                        </div>
                        <div className="col-md-6 my-2">
                          <div className="d-flex flex-row">
                            {users.gender ? (
                              <>
                                <p className="mx-2 text-muted">
                                  <input
                                    type="radio"
                                    name="gender"
                                    value={1}
                                    defaultChecked={users?.gender === 1}
                                  />{" "}
                                  Pria
                                </p>
                                <p className="mx-2 text-muted">
                                  <input
                                    type="radio"
                                    name="gender"
                                    value={2}
                                    defaultChecked={users?.gender === 2}
                                  />{" "}
                                  Perempuan
                                </p>
                              </>
                            ) : (
                              <>
                                <p className="mx-2 text-muted">
                                  <input type="radio" name="gender" value={1} />{" "}
                                  Pria
                                </p>
                                <p className="mx-2 text-muted">
                                  <input type="radio" name="gender" value={2} />{" "}
                                  Perempuan
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row my-4">
                        <div className="col-md-3">
                          <label htmlFor="date" className="text-muted">
                            Date of Birth
                          </label>
                        </div>
                        <div className="col-md-8">
                          <input
                            type="date"
                            // type="text"
                            name="birthdate"
                            id="date"
                            className="form-control"
                            defaultValue={dateBirth}
                          />
                        </div>
                      </div>
                      <div className="row mt-4 mb-5">
                        <div className="col-md-3"></div>
                        <div className="col-md-8">
                          <button
                            type="submit"
                            className="btn btn-danger w-100 px-4 rounded-pill"
                          >
                            save
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 bg-white mt-3">
                      <div className="col-md-12 text-center border-start">
                        <img
                          src={
                            users.avatar
                              ? users.avatar
                              : require("../../assets/dummy.jpg")
                          }
                          alt={users.name}
                          width={120}
                          height={120}
                          className="rounded-circle"
                        />
                      </div>
                      <div className="col-md-12 text-center mt-3">
                        <button
                          type="button"
                          onClick={handleClick}
                          className="btn btn-outline-danger rounded-pill"
                        >
                          Select image
                        </button>

                        <input
                          type="file"
                          name="avatar"
                          id="avatar"
                          className="form-control"
                          onChange={(e) => handleChange(e)}
                          ref={hiddenFileInput}
                          style={{ display: "none" }}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            ) : viewPage === 1 ? (
              <div
                className={`col-md-8 bg-white p-5 rounded-5  rounded ${styles.customMobileSection}`}
                id="address"
              >
                <div className="col-md-12">
                  <h5 className="fw-bold">Choose another address</h5>
                  <p className="text-muted">Manage your shipping address</p>
                  <hr />
                </div>
                <div className="col-md-12 p-4">
                  <div className={`col-md-12 ${styles.customNewAdd}`}>
                    <button
                      className={`text-center text-muted p-4 ${styles.customAddBtn}`}
                      data-bs-toggle="modal"
                      data-bs-target="#myModal"
                    >
                      Add new address
                    </button>
                    <form onSubmit={(e) => onSubmitHandler(e)}>
                      <div className="modal p-3 " id="myModal">
                        <div className={`modal-dialog`}>
                          <div
                            className={`modal-content p-4 ${styles.customCollapse}`}
                          >
                            <div className={`modal-header`}>
                              <h4 className="modal-title">Add New Address</h4>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                              ></button>
                            </div>

                            <div className="modal-body">
                              <div className="col-md-12 my-2">
                                <label htmlFor="rumah" className="text-muted">
                                  Save address as (ex : home address, office
                                  address)
                                </label>
                              </div>
                              <div className="col-md-12 my-2">
                                <input
                                  type="text"
                                  name="label"
                                  id="rumah"
                                  className="p-2 form-control"
                                  placeholder="Rumah"
                                  onChange={(e) =>
                                    setAddressForm({
                                      ...addressForm,
                                      label: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="row my-2">
                                <div className="col-md-6 my-2">
                                  <div className="col-md-12">
                                    <label
                                      htmlFor="nama"
                                      className="text-muted"
                                    >
                                      Recipient's name
                                    </label>
                                  </div>
                                  <div className="col-md-12 mt-2">
                                    <input
                                      type="text"
                                      name="recipient"
                                      id="nama"
                                      className="p-2 form-control"
                                      placeholder="Masukkan nama"
                                      onChange={(e) =>
                                        setAddressForm({
                                          ...addressForm,
                                          recipient: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6 my-2">
                                  <div className="col-md-12">
                                    <label
                                      htmlFor="phone"
                                      className="text-muted"
                                    >
                                      Phone number
                                    </label>
                                  </div>
                                  <div className="col-md-12 mt-2">
                                    <input
                                      type="text"
                                      name="phone"
                                      id="phone"
                                      className="p-2 form-control"
                                      placeholder="Masukkan nomor telepon"
                                      onChange={(e) =>
                                        setAddressForm({
                                          ...addressForm,
                                          phone: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row my-2">
                                <div className="col-md-8 my-2">
                                  <div className="col-md-12">
                                    <label
                                      htmlFor="address"
                                      className="text-muted"
                                    >
                                      Address
                                    </label>
                                  </div>
                                  <div className="col-md-12 mt-2">
                                    <input
                                      type="text"
                                      name="residence"
                                      id="address"
                                      className="p-2 form-control"
                                      placeholder="Masukkan alamat"
                                      onChange={(e) =>
                                        setAddressForm({
                                          ...addressForm,
                                          residence: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-md-4 my-2">
                                  <div className="col-md-12">
                                    <label
                                      htmlFor="postalCode"
                                      className="text-muted"
                                    >
                                      Postal Code
                                    </label>
                                  </div>
                                  <div className="col-md-12 mt-2">
                                    <input
                                      type="text"
                                      name="postcode"
                                      id="postalCode"
                                      className="p-2 form-control"
                                      placeholder="Masukkan kode pos"
                                      onChange={(e) =>
                                        setAddressForm({
                                          ...addressForm,
                                          postcode: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row my-2">
                                <div className="col-md-6 my-2">
                                  <div className="col-md-12">
                                    <label
                                      htmlFor="city"
                                      className="text-muted"
                                    >
                                      City of Subdistrict
                                    </label>
                                  </div>
                                  <div className="col-md-12 mt-2">
                                    <input
                                      type="text"
                                      name="city"
                                      id="city"
                                      className="p-2 form-control"
                                      placeholder="Masukkan kota"
                                      onChange={(e) =>
                                        setAddressForm({
                                          ...addressForm,
                                          city: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="form-check">
                                <input
                                  id="gridCheck"
                                  type="checkbox"
                                  className={styles.accent}
                                />
                                <label
                                  className="form-check-label px-2 text-muted"
                                  htmlFor="gridCheck"
                                >
                                  Make it the primary address
                                </label>
                              </div>
                            </div>

                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-outline-danger text-muted w-25 rounded-pill"
                                data-bs-dismiss="modal"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="btn btn-danger w-25 rounded-pill"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  {address
                    ? address.map((item, index) => {
                        return (
                          <div className={`col-md-12 ${styles.customAdd}`}>
                            <div className="col-md-12 px-3 pt-4">
                              <h6>{item.label}</h6>
                            </div>
                            <div className="col-md-12 px-3 py-1">
                              <small className="">
                                {item.residence} - {item.city}
                              </small>
                            </div>
                            <div className="col-md-12 px-3 py-1 pb-4">
                              <button
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#myModal2"
                                // button none decor
                                style={{
                                  border: "none",
                                  background: "none",
                                  color: "red",
                                }}
                                onClick={() =>
                                  prepareDataAddress(item.address_id)
                                }
                              >
                                Change address
                              </button>
                            </div>
                            {editAddress ? (
                              <form onSubmit={(e) => updateAddress(e)}>
                                <div className="modal p-3 " id="myModal2">
                                  <div className={`modal-dialog`}>
                                    <div
                                      className={`modal-content p-4 ${styles.customCollapse}`}
                                    >
                                      <div className={`modal-header`}>
                                        <h4 className="modal-title">
                                          Update Address
                                        </h4>
                                        <button
                                          type="button"
                                          className="btn-close"
                                          data-bs-dismiss="modal"
                                        ></button>
                                      </div>

                                      <div className="modal-body">
                                        <div className="col-md-12 my-2">
                                          <label
                                            htmlFor="rumah"
                                            className="text-muted"
                                          >
                                            Save address as (ex : home address,
                                            office address)
                                          </label>
                                        </div>
                                        <div className="col-md-12 my-2">
                                          <input
                                            type="text"
                                            // name="label"
                                            id="rumah"
                                            className="p-2 form-control"
                                            placeholder="Rumah"
                                            onChange={(e) =>
                                              setEditAddress({
                                                ...editAddress,
                                                label: e.target.value,
                                              })
                                            }
                                            defaultValue={editAddress.label}
                                          />
                                        </div>
                                        <div className="row my-2">
                                          <div className="col-md-6 my-2">
                                            <div className="col-md-12">
                                              <label
                                                htmlFor="nama"
                                                className="text-muted"
                                              >
                                                Recipient's name
                                              </label>
                                            </div>
                                            <div className="col-md-12 mt-2">
                                              <input
                                                type="text"
                                                // name="recipient"
                                                id="nama"
                                                className="p-2 form-control"
                                                placeholder="Masukkan nama"
                                                defaultValue={
                                                  editAddress.recipient
                                                }
                                                onChange={(e) =>
                                                  setEditAddress({
                                                    ...editAddress,
                                                    recipient: e.target.value,
                                                  })
                                                }
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-6 my-2">
                                            <div className="col-md-12">
                                              <label
                                                htmlFor="phone"
                                                className="text-muted"
                                              >
                                                Phone number
                                              </label>
                                            </div>
                                            <div className="col-md-12 mt-2">
                                              <input
                                                type="text"
                                                // name="phone"
                                                id="phone"
                                                className="p-2 form-control"
                                                placeholder="Masukkan nomor telepon"
                                                defaultValue={editAddress.phone}
                                                onChange={(e) =>
                                                  setEditAddress({
                                                    ...editAddress,
                                                    phone: e.target.value,
                                                  })
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="row my-2">
                                          <div className="col-md-8 my-2">
                                            <div className="col-md-12">
                                              <label
                                                htmlFor="address"
                                                className="text-muted"
                                              >
                                                Address
                                              </label>
                                            </div>
                                            <div className="col-md-12 mt-2">
                                              <input
                                                type="text"
                                                // name="residence"
                                                id="address"
                                                className="p-2 form-control"
                                                placeholder="Masukkan alamat"
                                                defaultValue={
                                                  editAddress.residence
                                                }
                                                onChange={(e) =>
                                                  setEditAddress({
                                                    ...editAddress,
                                                    residence: e.target.value,
                                                  })
                                                }
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-4 my-2">
                                            <div className="col-md-12">
                                              <label
                                                htmlFor="postalCode"
                                                className="text-muted"
                                              >
                                                Postal Code
                                              </label>
                                            </div>
                                            <div className="col-md-12 mt-2">
                                              <input
                                                type="text"
                                                // name="postcode"
                                                id="postalCode"
                                                className="p-2 form-control"
                                                placeholder="Masukkan kode pos"
                                                defaultValue={
                                                  editAddress.postcode
                                                }
                                                onChange={(e) =>
                                                  setEditAddress({
                                                    ...editAddress,
                                                    postcode: e.target.value,
                                                  })
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="row my-2">
                                          <div className="col-md-6 my-2">
                                            <div className="col-md-12">
                                              <label
                                                htmlFor="city"
                                                className="text-muted"
                                              >
                                                City of Subdistrict
                                              </label>
                                            </div>
                                            <div className="col-md-12 mt-2">
                                              <input
                                                type="text"
                                                // name="city"
                                                id="city"
                                                className="p-2 form-control"
                                                placeholder="Masukkan kota"
                                                defaultValue={editAddress.city}
                                                onChange={(e) =>
                                                  setEditAddress({
                                                    ...editAddress,
                                                    city: e.target.value,
                                                  })
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="form-check">
                                          <input
                                            id="gridCheck"
                                            type="checkbox"
                                            className={styles.accent}
                                          />
                                          <label
                                            className="form-check-label px-2 text-muted"
                                            htmlFor="gridCheck"
                                          >
                                            Make it the primary address
                                          </label>
                                        </div>
                                      </div>

                                      <div className="modal-footer">
                                        <button
                                          type="button"
                                          className="btn btn-outline-danger text-muted w-25 rounded-pill"
                                          data-bs-dismiss="modal"
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          type="submit"
                                          className="btn btn-danger w-25 rounded-pill"
                                        >
                                          Save
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            ) : null}

                            <div className="col-md-12">
                              <button
                                type="button"
                                className={`btn btn-danger w-100 rounded ${styles.btn}`}
                                onClick={() => deleteAddress(item.address_id)}
                              >
                                Delete Address
                              </button>
                            </div>
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            ) : viewPage === 2 ? (
              <div
                className={`col-md-9 bg-white p-4 rounded-5 border rounded ${styles.customMobileSection}`}
              >
                <button
                  className=" ms-2 mb-3 btn btn-outline-primary "
                  onClick={generatePDF}
                >
                  Export PDF
                </button>

                <DataTable
                  columns={columns}
                  data={posts}
                  pagination={true}
                  paginationPerPage={3}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileBuyer;
