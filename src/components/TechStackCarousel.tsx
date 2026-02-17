import { useTranslation } from "react-i18next";
import { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

// Simple SVG icons for tech stack (grayscale by default)
const techStack = [
  {
    name: "Notion",
    icon: (
      <svg viewBox="0 0 100 100" fill="currentColor" className="w-10 h-10">
        <path d="M6.017 4.313l55.333 -4.087c6.797 -0.583 8.543 -0.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 0.193 -6.023 -0.39 -8.16 -3.113L3.3 79.94c-2.333 -3.113 -3.3 -5.443 -3.3 -8.167V11.113c0 -3.497 1.553 -6.413 6.017 -6.8z" />
        <path fill="#fff" d="M61.35 0.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723 0.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257 -3.89c5.433 -0.387 6.99 -2.917 6.99 -7.193V20.64c0 -2.21 -0.873 -2.847 -3.443 -4.733L74.167 3.143c-4.273 -3.107 -6.02 -3.5 -12.817 -2.917zM25.92 19.523c-5.247 0.353 -6.437 0.433 -9.417 -1.99L8.927 11.507c-0.77 -0.78 -0.383 -1.753 1.557 -1.947l53.193 -3.887c4.467 -0.39 6.793 1.167 8.54 2.527l9.123 6.61c0.39 0.197 1.36 1.36 0.193 1.36l-54.933 3.307 -0.68 0.047zM19.803 88.3V30.367c0 -2.53 0.777 -3.697 3.103 -3.893L86 22.78c2.14 -0.193 3.107 1.167 3.107 3.693v57.547c0 2.53 -0.39 4.67 -3.883 4.863l-60.377 3.5c-3.493 0.193 -5.043 -0.97 -5.043 -4.083zm59.6 -54.827c0.387 1.75 0 3.5 -1.75 3.7l-2.91 0.577v42.773c-2.527 1.36 -4.853 2.137 -6.797 2.137 -3.107 0 -3.883 -0.973 -6.21 -3.887l-19.03 -29.94v28.967l6.02 1.363s0 3.5 -4.857 3.5l-13.39 0.777c-0.39 -0.78 0 -2.723 1.357 -3.11l3.497 -0.97v-38.3L30.48 40.667c-0.39 -1.75 0.58 -4.277 3.3 -4.473l14.367 -0.967 19.8 30.327v-26.83l-5.047 -0.58c-0.39 -2.143 1.163 -3.7 3.103 -3.89l13.4 -0.78z" />
      </svg>
    ),
  },
  {
    name: "n8n",
    icon: (
      <svg viewBox="0 0 100 100" fill="currentColor" className="w-10 h-10">
        <circle cx="25" cy="50" r="12" />
        <circle cx="75" cy="25" r="12" />
        <circle cx="75" cy="75" r="12" />
        <path d="M37 50 L63 30" stroke="currentColor" strokeWidth="6" fill="none" />
        <path d="M37 50 L63 70" stroke="currentColor" strokeWidth="6" fill="none" />
      </svg>
    ),
  },
  {
    name: "Make",
    icon: (
      <svg viewBox="0 0 100 100" fill="currentColor" className="w-10 h-10">
        <circle cx="50" cy="50" r="40" strokeWidth="8" stroke="currentColor" fill="none" />
        <circle cx="50" cy="50" r="15" />
      </svg>
    ),
  },
  {
    name: "OpenAI",
    icon: (
      <svg viewBox="0 0 100 100" fill="currentColor" className="w-10 h-10">
        <path d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z" strokeWidth="6" stroke="currentColor" fill="none" />
        <circle cx="50" cy="50" r="12" />
      </svg>
    ),
  },
  {
    name: "Claude",
    icon: (
      <svg viewBox="0 0 100 100" fill="currentColor" className="w-10 h-10">
        <ellipse cx="50" cy="50" rx="35" ry="40" strokeWidth="6" stroke="currentColor" fill="none" />
        <circle cx="35" cy="40" r="5" />
        <circle cx="65" cy="40" r="5" />
        <path d="M35 60 Q50 75 65 60" stroke="currentColor" strokeWidth="4" fill="none" />
      </svg>
    ),
  },
  {
    name: "Buildin.AI",
    icon: (
      <svg viewBox="0 0 100 100" fill="currentColor" className="w-10 h-10">
        <rect x="15" y="25" width="70" height="50" rx="8" strokeWidth="6" stroke="currentColor" fill="none" />
        <rect x="30" y="40" width="15" height="20" rx="2" />
        <rect x="55" y="40" width="15" height="20" rx="2" />
      </svg>
    ),
  },
];

const TechStackCarousel = () => {
  const { i18n } = useTranslation();
  const isRu = i18n.language === "ru";

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      dragFree: true,
      align: "start",
    },
    [AutoScroll({ speed: 1, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const onPointerDown = useCallback(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;
    autoScroll.stop();
  }, [emblaApi]);

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;
  }, [emblaApi]);

  // Duplicate items for seamless loop
  const items = [...techStack, ...techStack];

  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-10">
          <h2 className="text-2xl md:text-3xl font-bold font-display">
            {isRu ? "Инструменты, на которых я строю системы" : "Tools I Use to Build Systems"}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            {isRu ? "Современный стек для автоматизации и продуктивности" : "Modern stack for automation and productivity"}
          </p>
        </div>

        <div className="overflow-hidden" ref={emblaRef} onPointerDown={onPointerDown}>
          <div className="flex gap-8">
            {items.map((tool, index) => (
              <div
                key={`${tool.name}-${index}`}
                className="flex-none flex flex-col items-center gap-3 p-6 min-w-[140px] group"
              >
                <div className="text-muted-foreground grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:text-primary transition-all duration-300">
                  {tool.icon}
                </div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackCarousel;
