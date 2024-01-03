import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="flex gap-4">
      <Image
        src={"/atomic.png"}
        width={100}
        height={100}
        alt="logo da empresa japones"
        className="w-14 h-auto"
      />
      <p>Ensinos Atomicos</p>
    </div>
  );
};

export default Logo;
