import { useState, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Splash from "./components/Splash";
import StoryEngine from "./components/StoryEngine";

import Home from "./pages/Home";


function Intro({ startMusic }) {
  const [screen, setScreen] = useState("splash");

  const navigate = useNavigate();

  const goNext = () => {

  if (screen === "splash") {

    startMusic();

    setScreen("story");
    return;
  }

    if (screen === "story") {
      setScreen("home");
      navigate("/home");
    }
  };


  const goPrevious = () => {

    if (screen === "story") {
      setScreen("splash");
      return;
    }

    navigate("/home");
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


  return null;
}


export default function App() {

  const audioRef = useRef(null);

  const startMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/luxury-ambience.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.35;
    }

    audioRef.current.play().catch(() => {});
  };

  return (
    <Routes>

      <Route
        path="/"
        element={<Intro startMusic={startMusic} />}
      />

      <Route
        path="/home"
        element={<Home />}
      />

    </Routes>
  );
}