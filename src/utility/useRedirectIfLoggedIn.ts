// import React from "react";
import { useNavigate } from "react-router-dom";
const useRedirectIfLoggedIn = () => {
  const navigate = useNavigate();

  if (sessionStorage.getItem("isLoggedIn")) {
    setTimeout(() => {
      navigate("/board");
    }, 300);
  }
};

export default useRedirectIfLoggedIn;
