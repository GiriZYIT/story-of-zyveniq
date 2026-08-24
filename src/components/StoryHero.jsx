import { useState, useEffect, useCallback, useRef } from "react";
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
    title: "ZYVENIQ",
    subtitle: "WEAR THE MOMENT",
    welcome: "Welcome to ZYVENIQ.",
  },
];

export default function StoryHero({ onFinish }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchStartTime = useRef(0);

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

  /* =========================================
     TOUCH / SWIPE
     ========================================= */

  const handleTouchStart = (event) => {
    const touch = event.touches[0];

    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
    touchStartTime.current = Date.now();
  };

  const handleTouchEnd = (event) => {
    const touch = event.changedTouches[0];

    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;

    const elapsed = Date.now() - touchStartTime.current;

    const minimumSwipeDistance = 55;

    /* Ignore vertical scrolling gestures */
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      return;
    }

    /* Swipe left = next */
    if (
      deltaX < -minimumSwipeDistance &&
      elapsed < 700
    ) {
      nextStory();
      return;
    }

    /* Swipe right = previous */
    if (
      deltaX > minimumSwipeDistance &&
      elapsed < 700
    ) {
      previousStory();
      return;
    }

    /* Simple tap */
    if (
      Math.abs(deltaX) < 15 &&
      Math.abs(deltaY) < 15 &&
      elapsed < 500
    ) {
      const screenWidth = window.innerWidth;

      if (touch.clientX > screenWidth * 0.45) {
        nextStory();
      } else {
        previousStory();
      }
    }
  };

  /* =========================================
     KEYBOARD
     ========================================= */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key === "ArrowRight" ||
        event.key === " "
      ) {
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
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [nextStory, previousStory, onFinish]);

  const story = stories[index];

  return (
    <main
      className="fixed inset-0 z-[9999] bg-[#011826] overflow-hidden touch-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >

      {/* =========================================
          PROGRESS
      ========================================= */}

      <div
        className="
          absolute
          top-[max(14px,env(safe-area-inset-top))]
          left-4
          right-4
          z-[100]
          flex
          gap-1
        "
      >
        {stories.map((_, storyIndex) => (
          <div
            key={storyIndex}
            className="
              h-[2px]
              flex-1
              overflow-hidden
              rounded-full
              bg-white/25
            "
          >
            <motion.div
              className="h-full bg-[#D4AF37]"
              initial={{ width: "0%" }}
              animate={{
                width:
                  storyIndex <= index
                    ? "100%"
                    : "0%",
              }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
            />
          </div>
        ))}
      </div>

      {/* =========================================
          SKIP
      ========================================= */}

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onFinish?.();
        }}
        className="
          absolute
          top-[max(34px,calc(env(safe-area-inset-top)+18px))]
          right-4
          z-[110]
          px-3
          py-1.5
          text-[9px]
          md:text-xs
          uppercase
          tracking-[0.25em]
          text-white/80
          border
          border-white/30
          rounded-full
          backdrop-blur-md
          bg-black/10
          hover:bg-white
          hover:text-[#023047]
          transition-all
        "
      >
        Skip
      </button>

      {/* =========================================
          STORY
      ========================================= */}

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
                ? "polygon(100% 0,100% 0,100% 100%,100% 100%)"
                : "polygon(0 0,0 0,0 100%,0 100%)",
          }}

          animate={{
            opacity: 1,
            scale: 1,

            clipPath:
              "polygon(0 0,100% 0,100% 100%,0 100%)",
          }}

          exit={{
            opacity: 0,
            scale: 1.08,

            x:
              direction === 1
                ? "-8%"
                : "8%",

            rotate:
              direction === 1
                ? -1.2
                : 1.2,

            clipPath:
              direction === 1
                ? "polygon(0 0,78% 0,100% 100%,0 100%)"
                : "polygon(22% 0,100% 0,100% 100%,0 100%)",
          }}

          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          {/* DARK OVERLAY */}

          <div className="overlay" />

          {/* CONTENT */}

       <motion.div
            className="story-content"
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h1>{story.title}</h1>

            <motion.p
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.75,
                delay: 0.35,
              }}
            >
              {story.subtitle}
            </motion.p>

            {story.welcome && (
              <motion.div
                className="welcome-message"
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.75,
                  delay: 0.5,
                }}
              >
                {story.welcome}
              </motion.div>
            )}
          </motion.div>

        </motion.div>
      </AnimatePresence>

      {/* =========================================
          MOBILE TAP AREAS
      ========================================= */}

      <div className="
        absolute
        inset-0
        z-[20]
        pointer-events-none
      ">

        <div className="
          absolute
          left-0
          top-0
          bottom-0
          w-[40%]
        " />

        <div className="
          absolute
          right-0
          top-0
          bottom-0
          w-[60%]
        " />

      </div>

    </main>
  );
}