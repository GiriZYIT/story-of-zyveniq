import React, { useEffect, useState, useRef } from 'react';
import logo from "../assets/logo.webp";
import background from "../assets/royal-blue-bg.png";
import divider from "../assets/divider.png";
import luxuryAmbience from "../assets/luxury-ambience.mp3";
import "../luxury.css";


const Splash = ({ onComplete }) => {
  const audioRef = useRef(new Audio(luxuryAmbience));
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

    const toggleAudio = () => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
 };
  useEffect(() => {
  document.body.style.overflow = "hidden";

  const audio = audioRef.current;

  audio.loop = true;
  audio.volume = 0.2;

  // Play after first user interaction (browser requirement)
  const startAudio = () => {
    audio.play().catch(() => {});
    window.removeEventListener("click", startAudio);
  };

  window.addEventListener("click", startAudio);

  // Mouse up = louder, mouse down = quieter
  const handleMouseMove = (e) => {
    const screenHeight = window.innerHeight;

    const targetVolume =
      0.1 + (1 - e.clientY / screenHeight) * 0.4;

    // Smooth transition
    audio.volume += (targetVolume - audio.volume) * 0.08;
  };

  window.addEventListener("mousemove", handleMouseMove);
  
  return () => {
    document.body.style.overflow = "auto";

    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("click", startAudio);

    audio.pause();
    audio.currentTime = 0;
  };
}, []);

const startExperience = () => {
  setIsFadingOut(true);

  setTimeout(() => {
    document.body.style.overflow = "auto";
    if (onComplete) onComplete();
  }, 700); // match your animation duration
};

  const handleTransitionEnd = () => {
    if (isFadingOut) {
      document.body.style.overflow = 'auto';
      if (onComplete) onComplete();
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&display=swap');
        .splash-container{
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            overflow:hidden;
            transition:
            opacity .9s ease,
            transform .9s ease;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;

            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            opacity: 1;
            visibility: visible;
        }
        .splash-container::before{
            content:"";
            position:absolute;
            top:-40%;
            left:-35%;

            width:28%;
            height:220%;

            background:linear-gradient(
                115deg,
                transparent 0%,
                rgba(255,255,255,0.08) 30%,
                rgba(255,255,255,0.45) 50%,
                rgba(255,255,255,0.08) 70%,
                transparent 100%
            );
            filter: blur(2px);
            mix-blend-mode: screen;
            transform:rotate(18deg);
            animation:luxuryFlash 5s ease-in-out infinite;
            pointer-events:none;
        }
        .splash-container.fade-out{
          animation: swipeUp .9s cubic-bezier(.22,1,.36,1) forwards;
        }
        .start-button{
              width:340px;
              height:68px;

              background:linear-gradient(
                  180deg,
                  #2d63d4 0%,
                  #1b4ea2 45%,
                  #103b84 100%
              );

              color:#f3d47a;

              font-family:'Cinzel', serif;
              font-size:1.35rem;
              font-weight:600;
              letter-spacing:.03em;

              border:2px solid #cda349;
              border-radius:50px;

              cursor:pointer;

              transition:all .35s ease;

              box-shadow:
                  0 10px 25px rgba(16,59,132,.35),
                  inset 0 2px 0 rgba(255,255,255,.35),
                  inset 0 -3px 8px rgba(0,0,0,.25);

              display:flex;
              justify-content:center;
              align-items:center;

              white-space:nowrap;
          }
            .start-button:hover{
                background:linear-gradient(
                    180deg,
                    #3d79f5 0%,
                    #2563eb 45%,
                    #1746b5 100%
                );

                color:#ffe6a3;

                transform:translateY(-3px) scale(1.03);

                box-shadow:
                    0 18px 40px rgba(37,99,235,.45),
                    0 0 18px rgba(212,175,55,.35),
                    inset 0 2px 0 rgba(255,255,255,.4);
            }
          .start-button:active{
              transform: scale(.98);
          }
          .audio-toggle{
            position:fixed;

            bottom:25px;
            right:25px;

            width:56px;
            height:56px;

            border-radius:50%;
            border:1px solid rgba(212,175,55,.35);

            background:rgba(16,59,132,.18);
            backdrop-filter:blur(14px);

            color:#d4af37;

            font-size:24px;

            display:flex;
            justify-content:center;
            align-items:center;

            cursor:pointer;

            transition:.35s ease;

            z-index:99999;
        }

        .audio-toggle:hover{
            background:#173d92;
            transform:scale(1.08);
        }
        /* Ambient glowing background aura tuned to match the antique gold from Screenshot 2026-06-12 210559.png */
        .ambient-glow {
          position: absolute;
          width: 650px;
          height: 650px;
          background:transparent;
          z-index: -1;
          pointer-events: none;
          animation: ambientIntensePulse 5s ease-in-out infinite alternate;
        }

       
        .brand-container{
            background: transparent;
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
            border: none;
            border-radius: 0;
            box-shadow: none;
            padding: 0;

            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
        }
        /* --- THE DYNAMIC LOGO ANIMATION TIMELINE --- */
        .splash-logo-wrapper{
            position:relative;
            width:220px;
            height:78px;      /* Try 78–85px */

            margin-bottom:0;

            animation:
                logoDimensionalRise 1.2s ease forwards,
                floatingLogo 3s ease-in-out infinite;
        }
        /* Tier 1: Ground Outline Silhouette (Faint antique gold mapping) */
        .logo-base-layer {
          position: absolute;
          inset: 0;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          opacity: 0.25;
          /* Specially configured CSS filter matrix to target the exact color profile of Screenshot 2026-06-12 210559.png */
          filter: sepia(1) saturate(1.8) hue-rotate(5deg) brightness(0.85) contrast(1.1);
        }

        /* Tier 2: Liquid Horizontal Gold Fill (Pours left-to-right) */
        /* Royal Blue Fill Layer */
        .logo-fill-layer{
            position:absolute;
            inset:0;
            top:0;
            left:0;
            width:100%;
            height:100%;
            object-fit:contain;

            filter:
                brightness(0)
                saturate(100%)
                invert(15%)
                sepia(90%)
                saturate(4200%)
                hue-rotate(205deg)
                brightness(.85)
                contrast(1.15);

            clip-path: inset(0 100% 0 0);

            animation: horizontalLiquidPour 2.2s ease forwards 1s;

            filter: drop-shadow(0 4px 8px rgba(8,28,92,.25));
        }
         /* Royal Blue Shine Layer */
         .logo-shimmer-layer{
              position:absolute;
              inset:0;
              top:0;
              left:0;
              width:100%;
              height:100%;
              object-fit:contain;

              filter:
                  brightness(0)
                  saturate(100%)
                  invert(42%)
                  sepia(95%)
                  saturate(4500%)
                  hue-rotate(200deg)
                  brightness(1.4);

              opacity:.8;

              mix-blend-mode:screen;

              clip-path:polygon(-50% 0%,-20% 0%,-60% 100%,-90% 100%);

              animation:luxuryFlash 1.2s ease forwards 2.5s;
        }
        .ambient-glow{
            position:absolute;

            width:700px;
            height:700px;

            background:radial-gradient(
                circle,
                rgba(32,86,198,.18),
                transparent 70%
            );

            animation:ambientIntensePulse 5s ease infinite alternate;
        } 
        .logo-image{
                width:220px;
                height:auto;
                display:block;
        }  
        /* --- LUXURY BRAND TYPOGRAPHY SEQUENCING --- */
       @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&display=swap');

          .brand-text{
              font-family: 'Cinzel', serif;
              font-size: 5.2rem;
              font-weight: 600;
              letter-spacing: .35rem;
              line-height: 1;

              color:#173d92;

              text-transform:uppercase;

              margin-top:0px;
              margin-bottom:4px;

              text-align:center;

              text-shadow:
                  0 2px 6px rgba(23,61,146,.12),
                  0 0 18px rgba(23,61,146,.06);
          }
          .brand-tagline{
            font-family:'Outfit',sans-serif;

            font-size:1.05rem;
            font-weight:500;

            letter-spacing:.65rem;

            color:#173d92;

            text-transform:uppercase;           
            margin-top:0;
            margin-bottom:0;
            text-align:center;
        }
        .brand-description{
            max-width:500px;

            margin-top:8px;
            margin-bottom:24px;

            text-align:center;

            font-family:'Outfit',sans-serif;

            font-size:.95rem;

            line-height:1.7;

            color:#48669d;

            font-weight:400;

            letter-spacing:.02em;
        }
        .brand-container{
            background: transparent;
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
            border: none;
            border-radius: 0;
            box-shadow: none;
            padding: 0;

            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:flex-start;
        }
        
        /* --- LOWER PROGRESS TIMELINE --- */
        .loader-container {
          width: 150px;
          height: 1.5px;
          background: rgba(26, 30, 21, 0.1);
          position: relative;
          overflow: hidden;
        }
        .gold-divider{
            display:block;
            width:240px;      /* Adjust 220–260px as needed */
            height:auto;

            margin:8px auto 12px auto;

            object-fit:contain;
        }
        .gold-divider:hover{
            transform: scale(1.03);

            filter:
                brightness(1.08)
                contrast(1.08)
                drop-shadow(0 0 10px rgba(212,175,55,.35));

            transition: all .35s ease;
        }

        .loader-bar {
          position: absolute;
          height: 100%;
          width: 0;
          /* Color-coordinated gradient tracks from the background tone to your antique gold */
          background: linear-gradient(90deg, #d5dc9f, #cda036, #d5dc9f);
          animation: loadTimeline 4.6s cubic-bezier(0.65, 0.05, 0.36, 1) forwards;
        }
        .splash-content{
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            width:100%;
            max-width:560px;
            margin:auto;
            text-align:center;
        }
        .logo{
            width:125px;
            margin-bottom:4px;
        }
        /* CORE KEYFRAMES */
        @keyframes ambientIntensePulse {
          0% { transform: scale(0.95); opacity: 0.7; }
          100% { transform: scale(1.05); opacity: 1; }
        }
        @keyframes floatingLogo{
          0%{transform:translateY(0px);}
         50%{transform:translateY(-6px);}
         100%{transform:translateY(0px);}
       }
       @keyframes glassFloat{
            0%{transform:translateY(0px);}
            50%{transform:translateY(-8px);}
            100%{transform:translateY(0px);}
        }
        @keyframes glassShine{
          from{left:-60%;}
          to{left:150%;}
       }
        .gold-divider{
            width:260px;
            display:block;
            margin:8px auto 22px;

            opacity:0.95;

            filter:
                contrast(1.6)
                saturate(1.5)
                drop-shadow(0 2px 8px rgba(10,60,170,.25));
        }
        @keyframes dividerGlow{
            0%,100%{filter:brightness(1.05)drop-shadow(0 0 6px rgba(212,175,55,.25));}
            50%{filter:brightness(1.12)drop-shadow(0 0 12px rgba(212,175,55,.45));}
        }
       @keyframes luxuryFlash{
        0%{opacity:0;transform:translateX(-160px) rotate(18deg);}
        12%{opacity:1;}
        50%{opacity:.9;}
        100%{opacity:0;transform:translateX(380px) rotate(18deg);}
      }
        @keyframes logoDimensionalRise{
        0%{
          opacity:0;
          transform:scale(.75);
          }

          50%{
          transform:scale(1.08);
          }

          100%{
          opacity:1;
          transform:scale(1);
          }

          }
        
        @keyframes horizontalLiquidPour {
          0% { clip-path: inset(0 100% 0 0); }
          100% { clip-path: inset(0 0% 0 0); }
        }

        @keyframes angularRefractionSweep {
          0% {
            clip-path: polygon(-40% 0%, -10% 0%, -50% 100%, -80% 100%);
          }
          100% {
            clip-path: polygon(140% 0%, 170% 0%, 130% 100%, 100% 100%);
          }
        }

        @keyframes premiumTextReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes swipeUp{
            0%{transform:translateY(0);opacity:1;}
            100%{transform:translateY(-100%);opacity:1;}
        }
        @keyframes loadTimeline {
          0% { width: 0%; }
          75% { width: 84%; }
          100% { width: 100%; }
        }
          
          .start-button{
          margin-top:55px;
          padding:18px 70px;
          border:none;
          border-radius:50px;
          background:#fff8dc;
          color:#8B6508;
          font-size:28px;
          font-weight:700;
          cursor:pointer;
          box-shadow:0 10px 25px rgba(184,134,11,.35);
          transition:.3s;
        }

        .start-button:hover{
          transform:scale(1.05);
        }
        .splash-container.fade-out{
         animation: swipeUp .9s cubic-bezier(.22,1,.36,1) forwards;
      }
         /* ================================
   MOBILE APP LAYOUT
   ================================ */

@media screen and (max-width: 768px) {

  .splash-container {
    position: fixed;
    inset: 0;

    width: 100vw;
    height: 100dvh;

    min-width: 0;
    max-width: 100vw;

    overflow: hidden;

    background-size: cover;
    background-position: center center;

    display: flex;
    align-items: center;
    justify-content: center;

    padding:
      env(safe-area-inset-top)
      env(safe-area-inset-right)
      env(safe-area-inset-bottom)
      env(safe-area-inset-left);

    box-sizing: border-box;
  }

  .brand-container {
    width: 100%;
    max-width: 100%;

    padding: 0 22px;

    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .splash-logo-wrapper {
    width: 150px;
    height: 65px;

    margin-bottom: 5px;
  }

  .logo-image {
    width: 150px;
    height: auto;
  }

  .brand-text {
    width: 100%;

    font-size: clamp(42px, 14vw, 62px);

    letter-spacing: 0.18rem;

    line-height: 0.95;

    margin: 0;

    text-align: center;

    white-space: nowrap;
  }

  .brand-tagline {
    width: 100%;

    font-size: clamp(11px, 3.5vw, 16px);

    letter-spacing: 0.28rem;

    margin-top: 10px;

    white-space: nowrap;
  }

  .gold-divider {
    width: min(210px, 65vw);

    margin: 14px auto 18px;
  }

  .brand-description {
    width: 100%;
    max-width: 340px;

    margin: 0 auto;

    padding: 0 5px;

    box-sizing: border-box;

    font-size: 14px;

    line-height: 1.6;

    letter-spacing: 0.01em;

    text-align: center;
  }

  .start-button {
    width: min(330px, calc(100vw - 44px));

    height: 58px;

    margin-top: 30px;

    padding: 0 20px;

    box-sizing: border-box;

    font-size: 18px;

    letter-spacing: 0.03em;

    white-space: nowrap;

    border-radius: 40px;
  }

  .audio-toggle {
    position: fixed;

    right: 18px;
    bottom: calc(18px + env(safe-area-inset-bottom));

    width: 52px;
    height: 52px;

    z-index: 99999;
  }

  .ambient-glow {
    width: 100vw;
    height: 100vw;

    max-width: 500px;
    max-height: 500px;
  }
}
      `}</style>

   <div
  className={`splash-container ${isFadingOut ? "fade-out" : ""}`}
  style={{ backgroundImage: `url(${background})` }}
>
  <div className="ambient-glow" />

  <div className="brand-container">

    <div className="splash-logo-wrapper">

      {/* Base Layer */}
      <img
        src={logo}
        alt="Zyveniq Logo"
        width="320"
        height="140"
        className="logo-base-layer logo-image"
      />

      {/* Gold Fill Layer */}
      <img
        src={logo}
        alt="Zyveniq Logo"
        width="320"
        height="140"
        className="logo-fill-layer logo-image"
      />

      {/* Shine Layer */}
      <img
        src={logo}
        alt="Zyveniq Logo"
        width="320"
        height="140"
        className="logo-shimmer-layer logo-image"
      />

    </div>

    <h1 className="brand-text">
      ZYVENIQ
    </h1>

    <p className="brand-tagline">
      WEAR THE MOMENT
    </p>

    <img src={divider}alt="Luxury Divider"className="gold-divider"/>
    
    <p className="brand-description">
      Discover the Zyveniq Wardrobe Circle through our Style Dictionary—a curated language of design that empowers every individual to shape a distinctive look, where fashion meets personality.
    </p>

    <button
  className="start-button"
  onClick={startExperience}
>
  Start the Experience
</button>

  </div>
  {/* 🔊 AUDIO BUTTON - ADD HERE */}
  <button
    className="audio-toggle"
    onClick={toggleAudio}
  >
    {isMuted ? "🔇" : "🔊"}
  </button>
</div>

</>

);
};


export default Splash;