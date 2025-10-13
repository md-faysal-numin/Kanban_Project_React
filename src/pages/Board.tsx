import { useCallback } from "react";
import Button from "../components/Button";
import TaskSection from "../components/TaskSection";
import useRedirectIfNotLoggedIn from "../utility/useRedirectIfNotLoggedIn";
import { useNavigate } from "react-router-dom";
import localStorageUtil from "../utility/localStorageUtil";
import type { User } from "../types";
import { useBoard } from "../contexts/BoardProvider";

const Board = () => {
  const navigate = useNavigate();
  const { tasksObj } = useBoard();
  useRedirectIfNotLoggedIn();

  const handleLogoutClick = useCallback(() => {
    sessionStorage.removeItem("isLoggedIn");
    navigate("/login");
  }, []);

  const username = sessionStorage.getItem("isLoggedIn")!;
  const userObj: User = localStorageUtil.get("User");

  //   const tasksObj: Task = localStorageUtil.get("Tasks");

  const tasksId: string[] = [...userObj[username].task];

  const sections: Record<string, string[]> = {
    todoTasks: [],
    inProgressTasks: [],
    testingTasks: [],
    finishedTasks: [],
  };

  if (tasksObj) {
    for (let i = 0; i < tasksId.length; i++) {
      let section = tasksObj[tasksId[i]].section;
      sections[section].push(tasksId[i]);
    }
  }

  return (
    <>
      <div className="flex justify-around items-center  bg-cyan-900 min-h-15">
        <h1 className="font-bold text-3xl text-white">Kanban Board</h1>
        <h3 className="text-white text-2xl">Username: {username}</h3>
        <div className="flex gap-6">
          <Button onClick={() => navigate("add_task")}>Add Task</Button>
          <Button className="bg-red-500" onClick={handleLogoutClick}>
            Logout
          </Button>
          {/* <button className="logoutBtn btn flex-end">Logout</button> */}
        </div>
      </div>
      <div className="flex h-full justify-center ">
        <TaskSection title="Todo" tasksId={sections["todoTasks"]} />
        <TaskSection
          title="In Progress"
          tasksId={sections["inProgressTasks"]}
        />
        <TaskSection title="Testing" tasksId={sections["testingTasks"]} />
        <TaskSection title="Finished" tasksId={sections["finishedTasks"]} />
      </div>
    </>
  );
};

export default Board;
