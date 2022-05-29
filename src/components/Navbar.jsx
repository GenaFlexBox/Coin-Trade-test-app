import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";

const Navbar = () => {
  return (
    <header className="bg-gray-800 text-white  flex w-full p-3">
      <div className="max-w-[1140px] w-[100%] m-auto px-4 justify-between flex items-center">
        <div className="flex items-center ">
          <img src={logo} width={50} height={50} alt="logo" />
          <Link to={"/"}>
            <p className="md:text-3xl text-xl  ml-3">CoinTrade</p>
          </Link>
        </div>
        <div className="">
          <Link to={"/portfolio"}>
            <p className="md:text-lg text-3xs ml-3">Портфель</p>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
