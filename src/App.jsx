import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Splash from "./components/Splash";
import StoryEngine from "./components/StoryEngine";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Collections from "./pages/Collections";

function Intro() {
  const [showSplash, setShowSplash] = useState(true);
  const [showStory, setShowStory] = useState(false);

  if (showSplash) {
    return (
      <Splash
        onComplete={() => {
          setShowSplash(false);
          setShowStory(true);
        }}
      />
    );
  }

  if (showStory) {
    return (
      <StoryEngine
        onFinish={() => {
          setShowStory(false);
        }}
      />
    );
  }

  return <Landing />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/home" element={<Home />} />
      <Route path="/collections" element={<Collections />} />
    </Routes>
  );
}