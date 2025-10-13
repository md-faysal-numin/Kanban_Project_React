// import React from "react";
import { useNavigate } from "react-router-dom";
const useRedirectIfNotLoggedIn = () => {
  const navigate = useNavigate();

  if (!sessionStorage.getItem("isLoggedIn")) {
    setTimeout(() => {
      navigate("/login");
    }, 300);
  }
};

export default useRedirectIfNotLoggedIn;
