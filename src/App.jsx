import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Splash from "./components/Splash";
import StoryEngine from "./components/StoryEngine";

import Home from "./pages/Home";

function Intro() {
  const [screen, setScreen] = useState("splash");

  const navigate = useNavigate();

  const goNext = () => {

    if (screen === "splash") {
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

  return (
    <Routes>

      <Route
        path="/"
        element={<Intro />}
      />

      <Route
        path="/home"
        element={<Home />}
      />

    </Routes>
  );
}