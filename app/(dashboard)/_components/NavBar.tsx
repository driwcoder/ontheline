import React from "react";
import MobileSiderBar from "./MobileSiderBar";

const NavBar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSiderBar />
    </div>
  );
};

export default NavBar;
