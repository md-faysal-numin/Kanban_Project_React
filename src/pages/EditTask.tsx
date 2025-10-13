import React, { useEffect, useRef } from "react";
import Button from "../components/Button";
import EditTaskInput from "../components/EditTaskInput";
import { useNavigate } from "react-router-dom";
import useRedirectIfNotLoggedIn from "../utility/useRedirectIfNotLoggedIn";
import localStorageUtil from "../utility/localStorageUtil";
import type { Task, User } from "../types";
import { useBoard } from "../contexts/BoardProvider";

const EditTask = () => {
  const navigate = useNavigate();
  const { setTasksObj } = useBoard();
  const titleEl = useRef<HTMLInputElement>(null!);
  const descriptionEl = useRef<HTMLInputElement>(null!);
  const assignedUsersEl = useRef<HTMLSelectElement>(null!);
  const sectionEl = useRef<HTMLSelectElement>(null!);
  useRedirectIfNotLoggedIn();
  function handleDashboardClick() {
    localStorage.removeItem("Edit");
    navigate("/board");
  }

  let editId: string = localStorageUtil.get("Edit")!;
  let taskObj: Task = localStorageUtil.get("Tasks");
  let userObj: User = localStorageUtil.get("User");
  let editTaskObj = taskObj[editId];

  const assignedUserList = taskObj[editId].assigned.split(",");

  let username = sessionStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (username !== editTaskObj.creator) {
      titleEl.current.disabled = true;
      descriptionEl.current.disabled = true;
      assignedUsersEl.current.disabled = true;
    }
  }, [username, editTaskObj.creator]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let parsedTasks: Task = localStorageUtil.get("Tasks");

    parsedTasks[editId].section = sectionEl.current.value;
    parsedTasks[editId].title = titleEl.current.value;
    parsedTasks[editId].description = descriptionEl.current.value;

    let oldAssignedUsers = parsedTasks[editId].assigned.split(",");
    for (let user of oldAssignedUsers) {
      const newTask = userObj[user].task.filter(
        (cur: string) => cur !== String(editId)
      );
      // console.log(user, newTask);
      userObj[user].task = newTask;
    }

    const selectedUsers = Array.from(
      assignedUsersEl.current.selectedOptions,
      (opt) => opt.value
    );
    // console.log(selectedUsers);
    for (let val of selectedUsers) {
      userObj[val].task.push(String(editId));
    }

    parsedTasks[editId].assigned = selectedUsers.join(",");

    localStorageUtil.set("User", userObj);
    localStorageUtil.set("Tasks", parsedTasks);

    setTasksObj(parsedTasks);
    alert("Successfully Edited Task");
    navigate("/board");
  };

  return (
    <div className="flex flex-col  items-center  gap-5 h-full ">
      <Button className="bg-violet-500" onClick={handleDashboardClick}>
        Go to DashBoard
      </Button>
      <div className="border-2 rounded-2xl h-1/2 w-1/2">
        <form
          className="flex flex-col gap-3 justify-center items-center"
          onSubmit={handleSubmit}
        >
          <h3 className="font-bold text-2xl">Edit the Task</h3>
          <EditTaskInput
            type="text"
            name="title"
            title="Title"
            value={editTaskObj.title}
            inputRef={titleEl}
          />

          <EditTaskInput
            type="text"
            name="description"
            title="Description"
            value={editTaskObj.description}
            inputRef={descriptionEl}
          />

          <div className="flex flex-col gap-2">
            <label htmlFor="assign-user">Assign Users :</label>
            <select
              id="assign-user"
              multiple
              required
              className="bg-blue-300"
              name="assigned"
              ref={assignedUsersEl}
              defaultValue={assignedUserList}
              // onChange={(e) => handleSelectChange(e)}
            >
              {Object.keys(userObj).map((key) => (
                <option value={key} key={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="section">Select Section</label>
            <select
              name="section"
              id="section"
              // onChange={(e) => handleSelectChange(e)}\
              ref={sectionEl}
              defaultValue={editTaskObj.section}
            >
              <option value="todoTasks">ToDo</option>
              <option value="inProgressTasks">In Progress</option>
              <option value="testingTasks">Testing</option>
              <option value="finishedTasks">Finished</option>
            </select>
          </div>
          <Button className="bg-blue-500">Edit Task</Button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
