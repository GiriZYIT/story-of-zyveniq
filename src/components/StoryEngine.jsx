import { AnimatePresence } from "framer-motion";

import Scene from "./Scene";
import { storyData } from "../data/storyData";
import useStoryEngine from "../hooks/useStoryEngine";

export default function StoryEngine({ onFinish }) {

  const {
    current,
    next
  } = useStoryEngine(onFinish);

  return (

    <AnimatePresence mode="wait">

      <Scene
        key={storyData[current].id}
        image={storyData[current].image}
        title={storyData[current].title}
        subtitle={storyData[current].subtitle}
        onNext={next}
      />

    </AnimatePresence>

  );

}