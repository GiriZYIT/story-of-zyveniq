import { AnimatePresence } from "framer-motion";

import Scene from "./Scene";
import { storyData } from "../data/storyData";
import useStoryEngine from "../hooks/useStoryEngine";

export default function StoryEngine({ onFinish, onBack }) {

  const {
    current,
    direction,
    next,
    previous,
  } = useStoryEngine(onFinish, onBack);

  return (
    <AnimatePresence
      mode="wait"
      custom={direction}
    >
     <Scene
      key={storyData[current].id}
      image={storyData[current].image}
      eyebrow={storyData[current].eyebrow}
      title={storyData[current].title}
      subtitle={storyData[current].subtitle}
      description={storyData[current].description}
      detail={storyData[current].detail}
      direction={direction}
      onNext={next}
      onPrevious={previous}
    />
    </AnimatePresence>
  );
}