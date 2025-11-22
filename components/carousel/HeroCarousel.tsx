/**
 * useCarousel hook will provide the functionality
 * The HeroCarousel will utilize sliding animations
 * and will be accessible using aria roles and properties.
 * */

import slides from "@/lib/carousel-slides/slides";
import useCarousel from "@/lib/hooks/useCarousel";
import Image from "next/image";
import BaseButton from "../buttons/BaseButton";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HeroCarousel = () => {
  const { currentIndex, goToNext, goToPrevious, autoAdvance, stopAutoAdvance } =
    useCarousel(slides.length, 6000);

  useEffect(() => {
    autoAdvance();
    return () => {
      stopAutoAdvance();
    };
  }, []);

  const router = useRouter();

  // There will be visually hidden text for screen readers indicating current slide
  return (
    <div
      className="w-full h-full absolute"
      role="region"
      aria-roledescription="carousel"
    >
      <div className="w-full h-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            onMouseEnter={() => {
              stopAutoAdvance();
            }}
            onMouseLeave={() => {
              autoAdvance();
            }}
            className={`absolute inset-0 max-h-[600px] ${
              index === currentIndex
                ? "translate-x-0"
                : index < currentIndex
                ? "-translate-x-full"
                : "translate-x-full"
            } transition-transform duration-700 ease-in-out`}
          >
            <Image
              src={slide.image}
              alt={`Slide ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="object-cover"
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${slides.length}`}
            />

            <div className="max-w-5xl w-full mx-auto h-full relative flex flex-wrap flex-col justify-center px-4 pointer-events-none">
              <h1 className="transform z-10 text-4xl md:text-6xl font-bold text-white drop-shadow-lg max-w-lg">
                {slide.title}
              </h1>
              <BaseButton
                className="pointer-events-auto"
                onClick={() => router.push(slide.cta.link)}
              >
                {slide.cta.text}
              </BaseButton>
            </div>
          </div>
        ))}
      </div>
      {/* Navigation arrows */}
      <div className="flex w-full justify-between items-center absolute top-1/2 transform -translate-y-1/2 px-4">
        <BaseButton
          className="rounded-full bg-dark-slate/60 w-[100px] h-[100px] flex justify-center items-center cursor-pointer hover:scale-115 transition-all"
          onClick={goToPrevious}
        >
          <span className="text-white text-3xl transition-all">&#8592;</span>
        </BaseButton>
        <BaseButton
          className="rounded-full bg-dark-slate/60 w-[100px] h-[100px] flex justify-center items-center cursor-pointer hover:scale-115 transition-all"
          onClick={goToNext}
        >
          <span className="text-white text-3xl">&#8594;</span>
        </BaseButton>
      </div>
    </div>
  );
};

export default HeroCarousel;
