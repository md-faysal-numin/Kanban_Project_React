// import React from "react";
import { useNavigate } from "react-router-dom";
const useRedirectIfNotLoggedIn = () => {
  const navigate = useNavigate();

  if (!sessionStorage.getItem("isLoggedIn")) {
    setTimeout(() => {
      navigate("/register");
    }, 300);
  }
};

export default useRedirectIfNotLoggedIn;
