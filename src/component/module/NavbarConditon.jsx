import React, { Fragment } from "react";
import Navbar from "../module/navbar/index";
import NavbarLogin from "../module/navbarLogin/index";

const Navs = () => {
	const token = localStorage.getItem("token");
	return <Fragment>{!token ? <Navbar /> : <NavbarLogin />}</Fragment>;
};

export default Navs;
