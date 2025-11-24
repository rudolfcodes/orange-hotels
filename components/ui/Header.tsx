"use client";

import Link from "next/link";
import Nav from "./Nav";
import { menu } from "@/lib/menu";
import BaseButton from "../buttons/BaseButton";

const Header = () => {
  /* TODO: opacity should be 0 on top with a black fading in gradient on the top. so black fades to 0 opacity. when scrolled it will be sticky */
  return (
    <div className="flex w-full h-16 items-center z-20 bg-dark-slate text-white sticky top-0 min-h-20">
      <div className="max-w-5xl w-full mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          <h1>Orange Hotels</h1>
        </Link>
        <Nav menu={menu} />
        <BaseButton
          className="bg-primary-orange p-4 rounded hover:bg-darker-orange transition-colors"
          onClick={() => alert("Booking!")}
        >
          Reserveer nu
        </BaseButton>
      </div>
    </div>
  );
};

export default Header;
