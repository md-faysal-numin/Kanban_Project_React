import type { Input, InputRefType } from "../types";

type TaskInputProps = Input & {
  inputRef: InputRefType;
};

const TaskInput = ({
  type,
  title,
  name,
  onChange,
  inputRef,
}: TaskInputProps) => {
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
        onChange={onChange}
        id={`${name}Input`}
        required
        className="border-solid border-1 "
      />
    </div>
  );
};

export default TaskInput;
