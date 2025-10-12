import { useState, type ChangeEvent, type FormEvent } from "react";
import Button from "../components/Button";
import LoginInput from "../components/LoginInput";
import { Link, useNavigate } from "react-router-dom";
import localStorageUtil from "../utility/localStorageUtil";
import useRedirectIfLoggedIn from "../utility/useRedirectIfLoggedIn";
const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useRedirectIfLoggedIn();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let emailObj = localStorageUtil.get("Email");
    if (emailObj) {
      let userObj = localStorageUtil.get("User")!;
      let email = formData.email;
      let password = formData.password;
      if (emailObj[email]) {
        let savedPass = userObj[emailObj[email]].password;
        if (savedPass === password) {
          sessionStorage.setItem("isLoggedIn", emailObj[email]);
          setTimeout(() => {
            navigate("/board");
          }, 500);
          alert("Logged In Successful");
        } else {
          alert("You have entered wrong password");
          return;
        }
      } else {
        alert("You are not registred");
        return;
      }
    } else {
      alert("You are not registred");
      return;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col justify-center  border-2 items-center min-h-dvh">
      <form className="flex flex-col gap-4 w-96" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold">Login Form</h1>

        <LoginInput
          type="email"
          name="email"
          title="Email"
          onChange={handleChange}
        ></LoginInput>

        <LoginInput
          type="password"
          name="password"
          title="Password"
          onChange={handleChange}
        ></LoginInput>
        <Button>Login</Button>
        <p>
          Don't have a account?{" "}
          <Link to="/register" className="underline">
            Register Now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
