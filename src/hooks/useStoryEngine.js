import { useState } from "react";
import { storyData } from "../data/storyData";

export default function useStoryEngine(onFinish, onBack) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [transitioning, setTransitioning] = useState(false);

  function next() {
    if (transitioning) return;

    setTransitioning(true);
    setDirection(1);

    setTimeout(() => {
      if (current < storyData.length - 1) {
        setCurrent((prev) => prev + 1);
        setTransitioning(false);
      } else {
        setTransitioning(false);
        onFinish?.();
      }
    }, 900);
  }

  function previous() {
    if (transitioning) return;

    if (current === 0) {
      onBack?.();
      return;
    }

    setTransitioning(true);
    setDirection(-1);

    setTimeout(() => {
      setCurrent((prev) => prev - 1);
      setTransitioning(false);
    }, 900);
  }

  return {
    current,
    direction,
    transitioning,
    next,
    previous,
  };
}