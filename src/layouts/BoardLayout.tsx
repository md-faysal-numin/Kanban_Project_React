// import React from "react";
import { Outlet } from "react-router-dom";

const BoardLayout = () => {
  return (
    <div className="bg-blue-100 h-dvh overflow-hidden">
      <h1 className="text-center font-bold text-3xl flex justify-center items-center gap-2">
        <img src="/public/kanban_logo.png" alt="Kanban logo" className="w-15" />
        Stop starting, Start finishing
      </h1>
      <Outlet />
    </div>
  );
};

export default BoardLayout;
