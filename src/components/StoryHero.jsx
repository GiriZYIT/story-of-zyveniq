import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./../styles/StoryHero.css";

import scene1 from "../assets/story/scene1.png";
import scene2 from "../assets/story/scene2.png";
import scene3 from "../assets/story/scene3.png";
import scene4 from "../assets/story/scene4.png";
import scene5 from "../assets/story/scene5.png";

const stories = [
  {
    image: scene1,
    title: "ZYVENIQ",
    subtitle: "Where elegance begins.",
  },
  {
    image: scene2,
    title: "Luxury",
    subtitle: "Luxury is not purchased. It is experienced.",
  },
  {
    image: scene3,
    title: "Craftsmanship",
    subtitle: "Inspired by heritage. Crafted for tomorrow.",
  },
  {
    image: scene4,
    title: "Tailoring",
    subtitle: "Every stitch. Every detail. Made with purpose.",
  },
  {
    image: scene5,
    title: "Welcome",
    subtitle: "Welcome to ZYVENIQ.",
  },
];

export default function StoryHero({ onFinish }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextStory = useCallback(() => {
    if (isTransitioning) return;

    if (index >= stories.length - 1) {
      onFinish?.();
      return;
    }

    setDirection(1);
    setIsTransitioning(true);

    setTimeout(() => {
      setIndex((current) => current + 1);
      setIsTransitioning(false);
    }, 850);
  }, [index, isTransitioning, onFinish]);

  const previousStory = useCallback(() => {
    if (isTransitioning || index === 0) return;

    setDirection(-1);
    setIsTransitioning(true);

    setTimeout(() => {
      setIndex((current) => current - 1);
      setIsTransitioning(false);
    }, 850);
  }, [index, isTransitioning]);

  /* Automatic progression */
  useEffect(() => {
    const timer = setTimeout(() => {
      nextStory();
    }, 6000);

    return () => clearTimeout(timer);
  }, [index, nextStory]);

  /* Keyboard navigation */
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        nextStory();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previousStory();
      }

      if (event.key === "Escape") {
        onFinish?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextStory, previousStory, onFinish]);

  const story = stories[index];

  return (
    <main className="fixed inset-0 z-[9999] bg-[#011826] overflow-hidden">

      {/* =====================================
          PROGRESS BARS
      ====================================== */}

      <div className="absolute top-5 left-4 right-4 z-[50] flex gap-1.5">
        {stories.map((_, storyIndex) => (
          <div
            key={storyIndex}
            className="h-[2px] flex-1 overflow-hidden rounded-full bg-white/25"
          >
            <motion.div
              className="h-full bg-white"
              initial={{ width: "0%" }}
              animate={{
                width:
                  storyIndex < index
                    ? "100%"
                    : storyIndex === index
                    ? "100%"
                    : "0%",
              }}
              transition={{
                duration: storyIndex === index ? 6 : 0.3,
                ease: "linear",
              }}
            />
          </div>
        ))}
      </div>

      {/* =====================================
          SKIP
      ====================================== */}

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onFinish?.();
        }}
        className="
          absolute
          top-10
          right-5
          z-[60]
          px-4
          py-2
          text-[10px]
          md:text-xs
          uppercase
          tracking-[0.25em]
          text-white/80
          border
          border-white/30
          rounded-full
          backdrop-blur-md
          hover:bg-white
          hover:text-[#023047]
          transition-all
        "
      >
        Skip
      </button>

      {/* =====================================
          STORY
      ====================================== */}

      <AnimatePresence
        mode="sync"
        initial={false}
        custom={direction}
      >
        <motion.div
          key={index}
          custom={direction}
          className="story-container"
          style={{
            backgroundImage: `url(${story.image})`,
          }}

          initial={{
            opacity: 0,
            scale: 1.08,
            clipPath:
              direction === 1
                ? "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)"
                : "polygon(0 0, 0 0, 0 100%, 0 100%)",
          }}

          animate={{
            opacity: 1,
            scale: 1,
            clipPath:
              "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          }}

          exit={{
            opacity: 0,
            scale: 1.12,
            x: direction === 1 ? -80 : 80,
            rotate: direction === 1 ? -1.5 : 1.5,
            clipPath:
              direction === 1
                ? "polygon(0 0, 78% 0, 100% 100%, 0 100%)"
                : "polygon(22% 0, 100% 0, 100% 100%, 0 100%)",
          }}

          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          {/* =====================================
              DARK OVERLAY
          ====================================== */}

          <div className="overlay"></div>

          {/* =====================================
              CINEMATIC CONTENT
          ====================================== */}

          <motion.div
            className="story-content"
            initial={{
              opacity: 0,
              y: 45,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h1>{story.title}</h1>

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.45,
              }}
            >
              {story.subtitle}
            </motion.p>
          </motion.div>

        </motion.div>
      </AnimatePresence>

      {/* =====================================
          LEFT CLICK ZONE
      ====================================== */}

      <button
        type="button"
        aria-label="Previous scene"
        onClick={(event) => {
          event.stopPropagation();
          previousStory();
        }}
        className="
          absolute
          left-0
          top-0
          bottom-0
          z-[40]
          w-[28%]
          cursor-w-resize
          bg-transparent
          border-none
        "
      />

      {/* =====================================
          RIGHT CLICK ZONE
      ====================================== */}

      <button
        type="button"
        aria-label="Next scene"
        onClick={(event) => {
          event.stopPropagation();
          nextStory();
        }}
        className="
          absolute
          right-0
          top-0
          bottom-0
          z-[40]
          w-[72%]
          cursor-e-resize
          bg-transparent
          border-none
        "
      />

      {/* =====================================
          BOTTOM INSTRUCTION
      ====================================== */}

     

    </main>
  );
}