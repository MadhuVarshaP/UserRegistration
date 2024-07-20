import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-black text-white flex justify-between items-center">
      <p className="p-[20px]">Register You</p>
      <div className="flex w-[450px] justify-around">
        <Link
          to="/register"
          className="hover:bg-white hover:text-black p-[20px] mt-[10px] hover:rounded-t-lg"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="hover:bg-white hover:text-black p-[20px] mt-[10px] hover:rounded-t-lg"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
