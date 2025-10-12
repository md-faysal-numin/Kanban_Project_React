import React, { createContext, useContext, useState } from "react";
import type { Task, User } from "../types";
import localStorageUtil from "../utility/localStorageUtil";

type BoardContextType = {
  tasksObj: Task;
  deleteTask: (taskId: string) => void;
};

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) throw new Error("useBoard must be used within a BoardProvider");
  return context;
};
type BoardProviderProps = {
  children: React.ReactNode;
};

export const BoardProvider = ({ children }: BoardProviderProps) => {
  const [tasksObj, setTasksObj] = useState<Task>(
    localStorageUtil.get("Tasks") || {}
  );
  const userObj: User = localStorageUtil.get("User")!;

  const deleteTask = (taskId: string) => {
    const deleteTaskUsers = tasksObj[taskId].assigned.split(",");

    for (let user of deleteTaskUsers) {
      userObj[user].task = userObj[user].task.filter(
        (id: string) => id !== taskId
      );
    }
    localStorage.setItem("User", JSON.stringify(userObj));

    const newTasksObj: Task = Object.fromEntries(
      Object.entries(tasksObj).filter(([key]) => key !== taskId)
    );
    localStorage.setItem("Tasks", JSON.stringify(newTasksObj));

    setTasksObj(newTasksObj);
    alert("Deleted Successfully");
  };

  return (
    <BoardContext.Provider value={{ deleteTask, tasksObj }}>
      {children}
    </BoardContext.Provider>
  );
};
