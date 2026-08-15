import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "../styles/Landing.css";
import logo from "../assets/logo.webp";
import ParticleLayer from "../components/ParticleLayer";

export default function Landing() {

  const navigate = useNavigate();

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const lightStyle = {

 left:mouse.x + window.innerWidth/2 -175,

 top:mouse.y + window.innerHeight/2 -175

}

  function handleMove(e) {

    const x = (e.clientX - window.innerWidth / 2) / 30;
    const y = (e.clientY - window.innerHeight / 2) / 30;

    setMouse({ x, y });

  }

  return (

    <div
      className="landing-page"
      onMouseMove={handleMove}
    >
        <ParticleLayer />
        <div className="mouse-light" style={lightStyle}/>
      <img
        src={logo}
        className="landing-logo"
        alt="logo"
        style={{
          transform: `translate(${mouse.x}px, ${mouse.y}px)`
        }}
      />

      <div className="landing-buttons">

        <button onClick={() => navigate("/home")}>
          ENTER EXPERIENCE
        </button>

        <button onClick={() => navigate("/collections")}>
          DISCOVER COLLECTIONS
        </button>

      </div>

    </div>

  );

}