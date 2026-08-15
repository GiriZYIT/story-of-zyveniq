import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Splash from "./components/Splash";
import StoryEngine from "./components/StoryEngine";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Collections from "./pages/Collections";

function Intro() {
  const [screen, setScreen] = useState("splash");

  const goNext = () => {
    if (screen === "splash") {
      setScreen("story");
    } else if (screen === "story") {
      setScreen("landing");
    }
  };

  const goPrevious = () => {
    if (screen === "landing") {
      setScreen("story");
    } else if (screen === "story") {
      setScreen("splash");
    }
  };

  if (screen === "splash") {
    return (
      <Splash
        onComplete={goNext}
      />
    );
  }

  if (screen === "story") {
    return (
      <StoryEngine
        onFinish={goNext}
        onBack={goPrevious}
      />
    );
  }

  return (
    <Landing
      onBack={goPrevious}
    />
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />

      <Route
        path="/home"
        element={<Home />}
      />

      <Route
        path="/collections"
        element={<Collections />}
      />
    </Routes>
  );
}