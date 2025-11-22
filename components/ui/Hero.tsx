"use client";

import BaseButton from "../buttons/BaseButton";
import HeroCarousel from "../carousel/HeroCarousel";

const Hero = () => {
  return (
    <div className="h-screen w-full absolute overflow-hidden flex flex-col max-h-[600px]">
      <HeroCarousel />
      <div className="max-w-5xl w-full mx-auto h-full relative flex flex-wrap flex-col justify-center px-4 pointer-events-none">
        <h1 className="transform z-10 text-4xl md:text-6xl font-bold text-white drop-shadow-lg max-w-lg">
          Welcome to Orange Hotels
        </h1>
        <BaseButton
          className="pointer-events-auto"
          onClick={() => alert("Booking now!")}
        >
          Book Your Stay Now
        </BaseButton>
      </div>
    </div>
  );
};

export default Hero;
