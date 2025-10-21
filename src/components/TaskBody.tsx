// import React from "react";
import { useNavigate } from "react-router-dom";
import type { TaskInfo } from "../types";
import { useBoard } from "../contexts/BoardProvider";
import { Button as Buttoncn } from "./ui/button";
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
    localStorage.setItem("Edit", String(task.taskId));
    setTimeout(() => {
      navigate("edit_task");
    }, 300);
  }

  let assignedUserList = task.assigned.split(",");

  // console.log("Taskbody");
  return (
    <div className="border-2 border-black w-[95%] p-2 rounded-xl">
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
        {/* <Button className="text-xs" onClick={handleEditClick}>
          Edit
        </Button> */}

        <Buttoncn
          className="text-xs p-3 cursor-pointer"
          onClick={handleEditClick}
          size="sm"
        >
          Edit
        </Buttoncn>

        <Buttoncn
          className="bg-red-500 cursor-pointer"
          size="sm"
          variant="destructive"
          onClick={() => deleteTask(task.taskId)}
        >
          Delete
        </Buttoncn>
      </div>
    </div>
  );
};

export default TaskBody;
