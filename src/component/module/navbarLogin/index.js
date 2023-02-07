import React, { Fragment, useState, useEffect } from "react";
import logo from "../../../assets/image/blanja_icon.png";
import filter from "../../../assets/image/filter.png";
import notif from "../../../assets/image/notif.png";
import mail from "../../../assets/image/mail.png";
import users from "../../../assets/image/christian.png";
import style from "../../../assets/style/style.module.css";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const NavbarLogin = () => {
  const [color, setColor] = useState("black");
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState();

  useEffect(() => {
    const data = localStorage.getItem(`data`);
    const getName = localStorage.getItem("name");
    if (data) {
      console.log(data);
      setData(data);
      setIsActive(true);
      setName(getName);
    }
  }, []);
  console.log(name);
  const onLogout = (e) => {
    // e.prevenDefault();
    localStorage.clear();
    swal({
      title: "Logout Success",
      text: `Your account have been Logout`,
      icon: "success",
    });
    return navigate("/login");
  };
  const names = JSON.parse(localStorage.getItem("name"));
  const [search, setSearch] = useState();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      return navigate(`/search?q=${search}`);
    }
  };

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg  row ">
        <div className="container-fluid col-md-10 col-11">
          <Link to="/" className={`${style.links}`}>
            <div className="d-flex col-md-2 align-items-center">
              <img src={logo} alt="" className="me-2" />
              <h3 className={`fontBold text-danger my-auto`}>Balanjo</h3>
            </div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            ariacontrols="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className={`me-auto mb-2 mb-lg-0 mt-md-0 mt-2 col-md-6 col-12`}>
              <form className={`d-flex`} role="search">
                <input
                  className={`me-2 form-control col-md-10 border border-danger ${style.navSearch}`}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleSearch}
                />
                <button
                  type="button"
                  className="btn border border-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <img src={filter} alt="" />
                </button>
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                          Filter
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="my-3">
                          <p className="fontBold">Color</p>
                          <div className="d-flex flex-row">
                            <div
                              onClick={() => {
                                setColor("black");
                              }}
                            >
                              {color === "black" ? (
                                <div className={`me-2 ${style.colorActive}`}>
                                  <div
                                    className={`mx-auto ${style.blackActive}`}
                                  ></div>
                                </div>
                              ) : (
                                <div className={`me-2 ${style.black}`}></div>
                              )}
                            </div>
                            <div onClick={() => setColor("red")}>
                              {color === "red" ? (
                                <div className={`me-2 ${style.colorActive}`}>
                                  <div
                                    className={`mx-auto ${style.redActive}`}
                                  ></div>
                                </div>
                              ) : (
                                <div className={`me-2 ${style.red}`}></div>
                              )}
                            </div>
                            <div onClick={() => setColor("blue")}>
                              {color === "blue" ? (
                                <div className={`me-2 ${style.colorActive}`}>
                                  <div
                                    className={`mx-auto ${style.blueActive}`}
                                  ></div>
                                </div>
                              ) : (
                                <div className={`me-2 ${style.blue}`}></div>
                              )}
                            </div>
                            <div onClick={() => setColor("green")}>
                              {color === "green" ? (
                                <div className={`me-2 ${style.colorActive}`}>
                                  <div
                                    className={`mx-auto ${style.greenActive}`}
                                  ></div>
                                </div>
                              ) : (
                                <div className={`me-2 ${style.green}`}></div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="my-3">
                          <p className="fontBold">Size</p>
                          <div className="d-flex flex-row">
                            <div className="btn btn-light btn-outline-dark me-2">
                              XS
                            </div>
                            <div className="btn btn-light btn-outline-dark me-2">
                              S
                            </div>
                            <div className="btn btn-light btn-outline-dark me-2">
                              M
                            </div>
                            <div className="btn btn-light btn-outline-dark me-2">
                              L
                            </div>
                            <div className="btn btn-light btn-outline-dark me-2">
                              XL
                            </div>
                          </div>
                        </div>
                        <div className="my-3">
                          <p className="fontBold">Category</p>
                          <div className="d-flex flex-row">
                            <div className="btn btn-light btn-outline-dark me-2">
                              T-Shirt
                            </div>
                            <div className="btn btn-light btn-outline-dark me-2">
                              Short
                            </div>
                            <div className="btn btn-light btn-outline-dark me-2">
                              Jacket
                            </div>
                            <div className="btn btn-light btn-outline-dark me-2">
                              Pants
                            </div>
                            <div className="btn btn-light btn-outline-dark me-2">
                              Shoes
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" className="btn btn-primary">
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </ul>
            <div className={`row col-md-5 col-12 d-flex flex-row-reverse`}>
              <div className="col-md-6 col-12 mb-2 w-100 d-flex justify-content-end gap-2">
                <div className="d-flex justify-content-center align-items-center">
                  <Link to="/">
                    <img
                      style={{ marginTop: "13px", marginLeft: "20px" }}
                      src={notif}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    style={{ marginTop: "13px", marginLeft: "20px" }}
                    src={mail}
                    alt=""
                  />
                </div>
                <div className=" dropdown d-flex justify-content-center align-items-center">
                  <img
                    style={{
                      borderRadius: "50%",
                      width: "35px",
                      height: "35px",
                      marginTop: "13px",
                      marginLeft: "20px",
                      border: "2px solid red",
                    }}
                    src={users}
                    alt=""
                    type="button"
                    data-bs-toggle="dropdown"
                    onClick={() => navigate("/profile")}
                  />

                  <span
                    className="mt-2 ms-2"
                    style={{ fontWeight: "600", fontSize: "17px" }}
                  >
                    {names}
                  </span>
                </div>
                <div className="col-md-6 col-12 mt-2 ms-2">
                  <Link to="/register">
                    <button
                      type="submit"
                      onClick={onLogout}
                      className={`btn btn-danger btn-outline-light border border-danger rounded-5 col-12 ${style.dd}`}
                    >
                      Logout
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default NavbarLogin;
