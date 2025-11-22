"use client";

import Nav from "./Nav";
import { menu } from "@/lib/menu";

const Header = () => {
  return (
    <div className="flex w-full h-16 items-center z-10 bg-dark-slate text-white sticky top-0">
      <div className="max-w-5xl w-full mx-auto px-4 flex justify-between items-center">
        <h1>Orange Hotels</h1>
        <Nav menu={menu} />
        <button onClick={() => alert("Booking!")}>Book Now</button>
      </div>
    </div>
  );
};

export default Header;
