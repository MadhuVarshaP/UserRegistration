import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3001/api/users/login", { email, password })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          window.alert("Login successful");
          navigate("/");
        } else {
          window.alert("Login failed");
        }
      })

      .catch((err) => console.log(err));
  };
  return (
    <form
      className="flex flex-col justify-center items-center my-[30px]"
      onSubmit={handleSubmit}
    >
      <p className="font-bold text-3xl py-[30px]">Login Form</p>
      <div className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="email">E-mail ID</label>
          <input
            type="email"
            name="email"
            id="email"
            className="border-black border-[1px] my-[5px] rounded-md p-[5px]"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="border-black border-[1px] my-[5px] rounded-md p-[5px]"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-[200px] bg-blue-500 text-white p-[10px] my-[30px] rounded-md hover:bg-blue-600"
      >
        Login Me
      </button>
      <Link to="/register" className="hover:underline">
        Not Registered Yet?
      </Link>
    </form>
  );
}

export default Login;
