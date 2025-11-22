"use client";

import HeroCarousel from "../carousel/HeroCarousel";

const Hero = () => {
  return (
    <div className="h-screen w-full absolute overflow-hidden flex flex-col max-h-[600px]">
      <HeroCarousel />
    </div>
  );
};

export default Hero;
