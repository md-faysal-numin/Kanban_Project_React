// import React from "react";
import { Outlet } from "react-router-dom";
import { BoardProvider } from "../contexts/BoardProvider";

const BoardLayout = () => {
  return (
    <div className="bg-blue-100 h-dvh overflow-hidden">
      <h1 className="text-center font-bold text-3xl flex justify-center items-center gap-2">
        <img src="/kanban_logo.png" alt="Kanban logo" className="w-15" />
        Stop starting, Start finishing
      </h1>
      <BoardProvider>
        <Outlet />
      </BoardProvider>
    </div>
  );
};

export default BoardLayout;
