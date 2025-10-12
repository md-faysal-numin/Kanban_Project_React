import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const Button = ({ children, className = "", onClick }: ButtonProps) => {
  return (
    <button
      className={twMerge(
        `font-semibold text-white bg-black outline-none cursor-pointer p-2 rounded-xl text-md ${className} `
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
