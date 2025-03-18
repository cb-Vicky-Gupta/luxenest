import React from "react";
import Right from "./Right";
import Middle from "./Middle";
import Left from "./Left";

const Header = () => {
  return (
    <div className="flex justify-between items-center px-6 h-16 border">
      <Right />
      <Middle />
      <Left />
    </div>
  );
};

export default Header;
