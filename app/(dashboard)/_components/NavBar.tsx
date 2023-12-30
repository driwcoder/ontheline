import React from "react";
import MobileSiderBar from "./MobileSiderBar";
import NavbarRoutes from "@/components/NavbarRoutes";

const NavBar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSiderBar />
      <NavbarRoutes />
    </div>
  );
};

export default NavBar;
