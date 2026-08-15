import { useRef } from "react";
import { motion } from "framer-motion";
import "../styles/Scene.css";

export default function Scene({
  image,
  eyebrow,
  title,
  subtitle,
  description,
  detail,
  direction,
  onNext,
  onPrevious,
}) {
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleTouchStart = (event) => {
    const touch = event.touches[0];

    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  const handleTouchEnd = (event) => {
    const touch = event.changedTouches[0];

    const deltaX =
      touch.clientX - touchStartX.current;

    const deltaY =
      touch.clientY - touchStartY.current;

    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      return;
    }

    if (Math.abs(deltaX) < 50) {
      return;
    }

    // LEFT = PREVIOUS
    if (deltaX < 0) {
      onPrevious?.();
      return;
    }

    // RIGHT = NEXT
    onNext?.();
  };

  const handleClick = (event) => {
    const screenWidth = window.innerWidth;

    if (event.clientX < screenWidth / 2) {
      onPrevious?.();
    } else {
      onNext?.();
    }
  };

  return (
    <motion.div
      className="scene"
      style={{
        backgroundImage: `url(${image})`,
      }}
      initial={{
        opacity: 0,
        scale: 1.08,
        x: direction > 0 ? 80 : -80,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        scale: 1.06,
        x: direction > 0 ? -120 : 120,
      }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
    >
      <div className="scene-overlay" />

      <motion.div
        className="scene-text"
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
        }}
      >
        <span className="scene-eyebrow">
          {eyebrow}
        </span>

        <h1>{title}</h1>

        <p className="scene-subtitle">
          {subtitle}
        </p>

        <div className="scene-line" />

        <p className="scene-description">
          {description}
        </p>

        <p className="scene-detail">
          {detail}
        </p>
      </motion.div>

      <div className="scene-hint">
        <span>SWIPE TO EXPLORE</span>
      </div>
    </motion.div>
  );
}