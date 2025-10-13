// import React from "react";

import { useBoard } from "../contexts/BoardProvider";

import TaskBody from "./TaskBody";

type TaskSectionProps = {
  title: string;
  tasksId: string[];
};

const TaskSection = ({ title, tasksId }: TaskSectionProps) => {
  // console.log("TaskSeciont");
  const { tasksObj } = useBoard();
  // const tasksObj: Task = localStorageUtil.get("Tasks");
  return (
    <div className="border-2 flex-1 h-full">
      <h3 className="text-center bg-gray-500 text-xl mb-1 text-white">
        {title}
      </h3>
      <div className="tasks-container">
        <div className="flex flex-col items-center">
          {tasksId.map((id) => {
            let task = { ...tasksObj[id], taskId: id };
            return <TaskBody key={id} task={task} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default TaskSection;
