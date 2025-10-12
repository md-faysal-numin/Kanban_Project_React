// import React from "react";

// import type { ChangeEvent } from "react";
import type { Input, SpanRefType } from "../types";

type RegisterInputProps = Input & {
  spanRef?: SpanRefType;
};

const RegisterInput = ({
  type,
  title,
  name,
  onChange,
  spanRef,
}: RegisterInputProps) => {
  return (
    <div id={`${name}Container`} className="flex flex-col ">
      <label htmlFor={`${name}Input`}>
        <span className="text-red-500">*</span>
        {title}:
      </label>
      <input
        type={type}
        name={name}
        onChange={onChange}
        id={`${name}Input`}
        required
        className="border-solid border-1 "
      />
      <span ref={spanRef} id={`${name}Error`} className="text-red-700"></span>
    </div>
  );
};

export default RegisterInput;
