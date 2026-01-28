import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Camera, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface HeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  alignment?: "left" | "center" | "right";
  theme?: "light" | "dark";
}

interface HeroCarouselProps {
  slides: HeroSlide[];
  autoPlayInterval?: number;
  className?: string;
}

export function HeroCarousel({ slides, autoPlayInterval = 5000, className }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, goToNext]);

  const currentSlide = slides[currentIndex];

  return (
    <section
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides Container */}
      <div className="relative aspect-[16/9] md:aspect-[21/9] lg:aspect-[3/1]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            />
            {/* Overlay */}
            <div
              className={cn(
                "absolute inset-0",
                slide.theme === "dark"
                  ? "bg-black/50"
                  : "bg-gradient-to-r from-black/60 via-black/30 to-transparent"
              )}
            />

            {/* Content */}
            <div
              className={cn(
                "relative h-full container px-4 flex items-center",
                slide.alignment === "center" && "justify-center text-center",
                slide.alignment === "right" && "justify-end text-right"
              )}
            >
              <div className="max-w-xl space-y-4 md:space-y-6">
                {slide.subtitle && (
                  <p className="text-white/80 text-sm md:text-base font-medium">
                    {slide.subtitle}
                  </p>
                )}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
                  {slide.title}
                </h1>
                {slide.description && (
                  <p className="text-white/80 text-sm md:text-lg max-w-md">
                    {slide.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-3">
                  <Link href={slide.primaryCta.href}>
                    <Button size="lg" className="gap-2">
                      {slide.primaryCta.label}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  {slide.secondaryCta && (
                    <Link href={slide.secondaryCta.href}>
                      <Button size="lg" variant="secondary" className="gap-2">
                        <Camera className="h-4 w-4" />
                        {slide.secondaryCta.label}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors hidden md:block"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors hidden md:block"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === currentIndex
                ? "w-6 bg-white"
                : "bg-white/50 hover:bg-white/70"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

// Default hero slides
export const defaultHeroSlides: HeroSlide[] = [
  {
    id: "1",
    title: "Wear the Culture. Own the Room.",
    subtitle: "New Season",
    description: "Discover bold African prints and modern silhouettes from brands across the continent.",
    imageUrl: "/demo/hero-slide-1.svg",
    primaryCta: { label: "Shop Women", href: "/shop/women" },
    secondaryCta: { label: "Virtual Try-On", href: "/try-on" },
    alignment: "left",
  },
  {
    id: "2",
    title: "Street Style, African Soul",
    subtitle: "Men's Collection",
    description: "Contemporary streetwear meets traditional craftsmanship.",
    imageUrl: "/demo/hero-slide-2.svg",
    primaryCta: { label: "Shop Men", href: "/shop/men" },
    alignment: "left",
  },
  {
    id: "3",
    title: "Try Before You Buy",
    subtitle: "Virtual Try-On",
    description: "See how our pieces look on you with AI-powered virtual try-on.",
    imageUrl: "/demo/hero-slide-3.svg",
    primaryCta: { label: "Try It Now", href: "/try-on" },
    alignment: "center",
    theme: "dark",
  },
];
