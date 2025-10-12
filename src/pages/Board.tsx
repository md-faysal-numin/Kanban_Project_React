import React from "react";
import BoardContent from "./BoardContent";
import { BoardProvider } from "../contexts/BoardProvider";
const Board = () => {
  return (
    <BoardProvider>
      <BoardContent />
    </BoardProvider>
  );
};

export default Board;
