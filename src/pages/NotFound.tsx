// import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div>
      <h2>404 | Page Not Found</h2>
      <Button onClick={handleClick}>Go to Home Page</Button>
    </div>
  );
};

export default NotFound;
