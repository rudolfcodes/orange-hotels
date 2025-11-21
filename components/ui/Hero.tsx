"use client";

import BaseButton from "../buttons/BaseButton";
import HeroCarousel from "../carousel/HeroCarousel";

const Hero = () => {
  return (
    <div className="h-screen w-full relative flex flex-col justify-center items-center bg-gray-200">
      <h1>Welcome to Orange Hotels</h1>
      <HeroCarousel />
      <BaseButton onClick={() => alert("Booking now!")}>
        <span>Book Your Stay Now</span>
      </BaseButton>
    </div>
  );
};

export default Hero;
