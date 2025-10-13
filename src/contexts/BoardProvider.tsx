import React, { createContext, useContext, useState } from "react";
import type { Task, User } from "../types";
import localStorageUtil from "../utility/localStorageUtil";

type BoardContextType = {
  tasksObj: Task;
  userObj: User;
  deleteTask: (taskId: string) => void;
  setTasksObj: React.Dispatch<React.SetStateAction<Task>>;
  setUserObj: React.Dispatch<React.SetStateAction<User>>;
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
  const [userObj, setUserObj] = useState<User>(
    localStorageUtil.get("User") || {}
  );
  // const [editTask, setEditTask] = useState(false);
  // const userObj: User = localStorageUtil.get("User")!;

  const deleteTask = (taskId: string) => {
    const deleteTaskUsers = tasksObj[taskId].assigned.split(",");

    for (let user of deleteTaskUsers) {
      userObj[user].task = userObj[user].task.filter(
        (id: string) => id !== taskId
      );
    }
    localStorageUtil.set("User", userObj);

    const newTasksObj: Task = Object.fromEntries(
      Object.entries(tasksObj).filter(([key]) => key !== taskId)
    );
    localStorageUtil.set("Tasks", newTasksObj);

    setTasksObj(newTasksObj);
    setUserObj(userObj);
    alert("Deleted Successfully");
  };

  return (
    <BoardContext.Provider
      value={{ userObj, tasksObj, setUserObj, setTasksObj, deleteTask }}
    >
      {children}
    </BoardContext.Provider>
  );
};
