// import React from "react";

import type { Input } from "../types";

type LoginInputProps = Input;

const RegisterInput = ({ type, title, name, onChange }: LoginInputProps) => {
  return (
    <div id={`${name}Container`} className="flex flex-col ">
      <label htmlFor={`${name}Input`}>
        <span className="text-red-500">*</span>
        {title}:
      </label>
      <input
        type={type}
        name={name}
        id={`${name}Input`}
        onChange={onChange}
        required
        className="border-solid border-1 "
      />
    </div>
  );
};

export default RegisterInput;
