"use client";

import HeroCarousel from "../carousel/HeroCarousel";

const Hero = () => {
  return (
    <div className="h-screen w-full relative -mt-16 overflow-hidden flex flex-col max-h-[500px] lg:max-h-[600px]">
      <HeroCarousel />
    </div>
  );
};

export default Hero;
