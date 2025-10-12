import React from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center h-dvh">
      <h1 className="text-shadow-blue-500 text-2xl font-bold">Kanban Board</h1>
      <img src="kanban.jpg" alt="kanban" className="w-40 h-50" />
      <div className="flex gap-2">
        <Link to="/register">
          <Button>Register</Button>
        </Link>
        <Link to="/login">
          <Button>Log In</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
