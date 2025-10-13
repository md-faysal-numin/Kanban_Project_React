import type { Input, InputRefType } from "../types";

type EditTaskInputProps = {
  type: string;
  title: string;
  name: string;
  value: string;
  inputRef: InputRefType;
};

const TaskInput = ({
  type,
  title,
  name,
  value,
  inputRef,
}: EditTaskInputProps) => {
  return (
    <div id={`${name}Container`} className="flex flex-col ">
      <label htmlFor={`${name}Input`}>
        <span className="text-red-500">*</span>
        {title}:
      </label>
      <input
        type={type}
        name={name}
        ref={inputRef}
        defaultValue={value}
        id={`${name}Input`}
        required
        className="border-solid border-1 "
      />
    </div>
  );
};

export default TaskInput;
