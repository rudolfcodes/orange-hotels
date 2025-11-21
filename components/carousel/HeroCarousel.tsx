/**
 * useCarousel hook will provide the functionality
 * The HeroCarousel will utilize sliding animations
 * and will be accessible using aria roles and properties.
 * */

import slides from "@/lib/carousel-slides/slides";
import useCarousel from "@/lib/hooks/useCarousel";
import Image from "next/image";
import BaseButton from "../buttons/BaseButton";

const HeroCarousel = () => {
  const {
    currentIndex,
    goToNext,
    goToPrevious,
    goToSlide,
    autoAdvance,
    stopAutoAdvance,
  } = useCarousel(slides.length, 6000);

  // The Carousel will be a ul with li elements for each slide
  // Each slide will have an image that uses Next.js Image component
  // The slides will have sliding animations when transitioning
  // There will be navigation buttons to go to next and previous slides
  // On user interaction (arrow press or arrow click or when hovered the carousel will pause auto-advance)

  // the main wrap area will have role="region" and aria-roledescription="carousel"
  // It will be full width and height of the parent container
  // Each slide will have role="group" and aria-roledescription="slide"
  // Each slide will have aria-label indicating the slide number and total slides
  // There will be visually hidden text for screen readers indicating current slide
  return (
    <div
      className="w-full h-full relative overflow-hidden"
      role="region"
      aria-roledescription="carousel"
    >
      {slides.map((slide, index) => (
        <div key={slide.id} className="absolute inset-0">
          <Image
            src={slide.image}
            alt={`Slide ${index + 1}`}
            layout="fill"
            objectFit="cover"
            className={`transition-transform duration-1000 ease-in-out transform ${
              index === currentIndex
                ? "translate-x-0"
                : index < currentIndex
                ? "-translate-x-full"
                : "translate-x-full"
            }`}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${slides.length}`}
          />
          {/* Navigation arrows */}
          <div className="flex w-full justify-between items-center absolute top-1/2 transform -translate-y-1/2 px-4">
            <BaseButton onClick={goToPrevious}>
              <span className="text-white text-2xl">&#8592;</span>
            </BaseButton>
            <BaseButton onClick={goToNext}>
              <span className="text-white text-2xl">&#8594;</span>
            </BaseButton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroCarousel;
