import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Login from "../pages/auth/login";
import Data from "../pages/dataTable/tables";
import Register from "../pages/auth/register";
import Forgot from "../pages/auth/forgot";
import Reset from "../pages/auth/reset";
import Home from "../pages/home";
import Search from "../pages/search";
import SearchCategory from "../pages/searchCategory";
import ProductDetail from "../pages/productDetail";
import Mybag from "../pages/mybag";
import Checkout from "../pages/checkout";

import ProfileBuyer from "../pages/profileBuyer";
import ProfileSeller from "../pages/profileSeller";

// Scroll to Top when switching page
const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children;
};

// Private routing
const Auth = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    swal({
      title: "Denied!",
      text: `Access Denied, Please Login!`,
      icon: "error",
    });
    return <Navigate to="/login" replace />;
  }
  return children;
};

const Router = () => {
 
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          {/* Auth Routes  */}
          <Route path="/login" element={<Login  />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/data" element={<Data />} />
     

          {/* Main Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/search/" element={<Search />} />
          <Route
            path="/v1/category/:id"
            element={
              <Auth>
                <SearchCategory />
              </Auth>
            }
          />
          <Route path="/v1/product/:id" element={<ProductDetail />} />
          <Route
            path="/mybag"
            element={
              <Auth>
                <Mybag />
              </Auth>
            }
          />
          <Route
            path="/checkout"
            element={
              <Auth>
                <Checkout />
              </Auth>
            }
          />
  

          {/* Profile Routes */}
          <Route
            path="/profile"
            element={
              <Auth>
                
                <ProfileBuyer />
              </Auth>
            }
          />
          <Route
            path="/store"
            element={
              <Auth>
                <ProfileSeller />
              </Auth>
            }
          />
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default Router;
