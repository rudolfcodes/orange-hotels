"use client";

import Nav from "./Nav";
import { menu } from "@/lib/menu";

const Header = () => {
  return (
    <div className="flex w-full justify-evenly h-16 bg-primary-orange items-center">
      <h1>Orange Hotels</h1>
      <Nav menu={menu} />
      <button onClick={() => alert("Booking!")}>Book Now</button>
    </div>
  );
};

export default Header;
