import React, { useRef, useState, type ChangeEvent } from "react";
import Button from "../components/Button";
import TaskInput from "../components/TaskInput";
import { useNavigate } from "react-router-dom";
import localStorageUtil from "../utility/localStorageUtil";
import type { Task, User } from "../types";
import useRedirectIfNotLoggedIn from "../utility/useRedirectIfNotLoggedIn";

type FormDataType = {
  title: string;
  description: string;
  assigned: string[];
  section: string;
};

const AddTask = () => {
  const navigate = useNavigate();
  let username = sessionStorage.getItem("isLoggedIn")!;
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    description: "",
    assigned: [username],
    section: "todoTasks",
  });
  useRedirectIfNotLoggedIn();
  const titleEl = useRef<HTMLInputElement>(null!);
  const descriptionEl = useRef<HTMLInputElement>(null!);
  let userObj = localStorageUtil.get("User")!;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // console.log(formData);
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name } = e.target;
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setFormData({
      ...formData,
      [name]: name == "assigned" ? values.push(username) && values : values[0],
    });
  };

  function handleDashboardClick() {
    navigate("/board");
  }

  const handleSubmit = () => {
    let tasksObj: Task | null = localStorageUtil.get("Tasks");
    if (tasksObj === null) {
      let obj: Task = {};
      localStorageUtil.set("Tasks", obj);
    }
    tasksObj = localStorageUtil.get("Tasks");
    let id = Date.now();

    let userObj: User = localStorageUtil.get("User");
    formData.assigned.map((cur) => {
      userObj[cur].task.push(String(id));
    });
    localStorageUtil.set("User", userObj);

    console.log("Section: ", formData.section);
    if (tasksObj) {
      tasksObj[id] = {
        title: `${formData.title}`,
        description: `${formData.description}`,
        assigned: `${formData.assigned}`,
        section: `${formData.section}`,
        creator: `${username}`,
      };
      localStorage.setItem("Tasks", JSON.stringify(tasksObj));

      titleEl.current.value = "";
      descriptionEl.current.value = "";
      alert("Successfully added task");
    }
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
          <h3 className="font-bold text-2xl">Add the Task</h3>

          <TaskInput
            type="text"
            name="title"
            title="Title"
            onChange={(e) => handleChange(e)}
            inputRef={titleEl}
          />

          <TaskInput
            type="text"
            name="description"
            title="Description"
            onChange={(e) => handleChange(e)}
            inputRef={descriptionEl}
          />

          <div className="flex flex-col gap-2">
            <label htmlFor="assign-user">Assign Users :</label>
            <select
              id="assign-user"
              multiple
              className="bg-blue-300"
              name="assigned"
              onChange={(e) => handleSelectChange(e)}
            >
              {Object.keys(userObj)
                .filter((key) => key !== username)
                .map((key) => (
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
              defaultValue="todoTasks"
              onChange={(e) => handleSelectChange(e)}
            >
              <option value="todoTasks">ToDo</option>
              <option value="inProgressTasks">In Progress</option>
              <option value="testingTasks">Testing</option>
              <option value="finishedTasks">Finished</option>
            </select>
          </div>
          <Button className="bg-blue-500">Add Task</Button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
