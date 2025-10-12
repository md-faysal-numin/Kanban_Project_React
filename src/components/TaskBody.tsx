// import React from "react";
import { useNavigate } from "react-router-dom";
import type { TaskInfo } from "../types";
import Button from "./Button";
import { useBoard } from "../contexts/BoardProvider";

type TaskProps = TaskInfo & {
  taskId: string;
};
type TaskBodyProps = {
  task: TaskProps;
};

const TaskBody = ({ task }: TaskBodyProps) => {
  const navigate = useNavigate();
  const { deleteTask } = useBoard();
  function handleEditClick() {
    localStorage.setItem("Edit", task.taskId);
    setTimeout(() => {
      navigate("edit_task");
    }, 300);
  }

  let assignedUserList = task.assigned.split(",");

  // console.log("Taskbody");
  return (
    <div className="border-2 w-[95%] p-2 rounded-xl">
      <div className="task-detail">
        <h4 className="task-title font-bold">
          Title: <span className="task-explain">{task.title}</span>
        </h4>
        <p className="description">
          Description :<span className="task-explain">{task.description}</span>
        </p>
        <label>Assigned for : </label>
        <select className="border-1">
          {assignedUserList.map((username) => {
            return (
              <option value={username} key={username}>
                {username}
              </option>
            );
          })}
        </select>
        <p className="creator">
          Task Created By: <span className="creatorName">{task.creator}</span>
        </p>
      </div>
      <div className="task-btn flex gap-2">
        <Button className="text-xs" onClick={handleEditClick}>
          Edit
        </Button>
        <Button
          className="bg-red-500 text-xs"
          onClick={() => deleteTask(task.taskId)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TaskBody;
