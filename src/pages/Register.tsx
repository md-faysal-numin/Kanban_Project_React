// import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import RegisterInput from "../components/RegisterInput";
import type { Email, User } from "../types";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import localStorageUtil from "../utility/localStorageUtil";
import useRedirectIfLoggedIn from "../utility/useRedirectIfLoggedIn";

function validateUsername(username: string): boolean {
  const regex = /^(?![0-9]+$)[a-zA-Z0-9 ]{2,}$/;

  return regex.test(username);
}

function validateEmail(email: string): boolean {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
}

function validatePassword(password: string): boolean {
  const regex =
    /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{6,32}$/;
  return regex.test(password);
}
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useRedirectIfLoggedIn();
  const usernameError = useRef<HTMLSpanElement>(null!);
  const emailError = useRef<HTMLSpanElement>(null!);

  const isValid = useRef(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name == "username") {
      if (!validateUsername(value)) {
        usernameError.current.textContent = "Enter valid username";
        isValid.current = false;
      } else {
        usernameError.current.textContent = "";
        isValid.current = true;
      }
    }
    if (name == "email") {
      if (!validateEmail(value)) {
        emailError.current.textContent = "Enter valid email address";
        isValid.current = false;
      } else {
        emailError.current.textContent = "";
        isValid.current = true;
      }
    }
    if (name == "password") {
      if (!validatePassword(value)) {
        isValid.current = false;
      } else isValid.current = true;
    }

    if (name === "email" || name === "username") {
      let key = name === "email" ? "Email" : "User";
      let obj = localStorageUtil.get(key);
      if (obj && obj[value]) {
        (name === "email"
          ? emailError
          : usernameError
        ).current.textContent = `${name} already exists`;
        isValid.current = false;
      } else isValid.current = true;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid) {
      alert("You have entered invalid input");
      return;
    }
    let username = formData.username;
    let email = formData.email;
    let password = formData.password;

    /////////

    let userObj: User = localStorageUtil.get("User");
    let emailObj: Email = localStorageUtil.get("Email");
    if (userObj) {
      userObj[username] = {
        email: `${email}`,
        password: `${password}`,
        task: [],
      };
      emailObj[email] = `${username}`;
      localStorageUtil.set("User", userObj);
      localStorageUtil.set("Email", emailObj);
    } else {
      userObj = {
        [username]: {
          email: `${email}`,
          password: `${password}`,
          task: [],
        },
      };
      emailObj = {
        [email]: `${username}`,
      };

      localStorageUtil.set("User", userObj);
      localStorageUtil.set("Email", emailObj);
    }

    /////////
    setTimeout(() => {
      navigate("/login");
    }, 500);
    alert("Registration Successful");
  };

  return (
    <div className="flex flex-col justify-center  border-2 items-center h-dvh">
      <form className="flex flex-col gap-4 w-96" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold">Register Form</h1>

        <RegisterInput
          onChange={handleChange}
          type="text"
          name="username"
          title="Username"
          spanRef={usernameError}
        />
        <RegisterInput
          onChange={handleChange}
          type="email"
          name="email"
          title="Email"
          spanRef={emailError}
        />
        <RegisterInput
          onChange={handleChange}
          type="password"
          name="password"
          title="Password"
        />

        <Button>Register</Button>
        <p>
          Already have a account?{" "}
          <Link
            className="decoration-solid underline text-blue-400"
            to="/login"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
