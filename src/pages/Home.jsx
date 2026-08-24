import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.webp";
import heroImage from "../assets/home/hero_banner.png";
import "./../styles/Home.css";

export default function Home() {
  const [showComingSoon, setShowComingSoon] = useState(false);

  return (
    <main className="home-page">

      <AnimatePresence mode="wait">

        {!showComingSoon ? (

          /* =========================
             HERO
          ========================== */

          <motion.section
            key="hero"
            className="home-hero"
            style={{
              backgroundImage: `url(${heroImage})`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >

            <div className="hero-overlay" />

           <motion.div
              className="hero-content"
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* =========================
                  BRAND
              ========================= */}

              <motion.div
                className="brand-block"
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >

                <motion.img
                  src={logo}
                  alt="ZYVENIQ Logo"
                  className="home-logo"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                  }}
                />

                <h2 className="brand-name">
                  ZYVENIQ
                </h2>

                <h6 className="brand-tagline">
                  WEAR THE MOMENT
                </h6>

              </motion.div>

              {/* TAGLINE */}
              <h1>
                Where elegance
                <br />
                begins.
              </h1>

              <div className="hero-divider">
                <span></span>
                <span>✦</span>
                <span></span>
              </div>

              {/* DESCRIPTION */}

              <p>
                Discover ZYVENIQ — where heritage meets
                contemporary expression, crafted for those
                who wear their identity with purpose.
              </p>

              {/* EXPLORE BUTTON */}

              <motion.button
                className="explore-button"
                onClick={() => setShowComingSoon(true)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Explore Collections
              </motion.button>

            </motion.div>

          </motion.section>

        ) : (

          /* =========================
             COMING SOON
          ========================== */

          <motion.section
            key="coming-soon"
            className="coming-soon"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >

            <div className="coming-overlay" />

            <motion.div
              className="coming-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.2,
              }}
            >

              <img
                src={logo}
                alt="ZYVENIQ"
                className="coming-logo"
              />

              <div className="coming-line"></div>

              <h1>
                Coming
                <br />
                Soon
              </h1>

              <p>
                Something timeless is being crafted.
              </p>

              <p className="coming-description">
                Our first collection is taking shape —
                rooted in heritage, refined for tomorrow.
              </p>

              <button
                className="back-button"
                onClick={() => setShowComingSoon(false)}
              >
                Back to Home
              </button>

            </motion.div>

          </motion.section>

        )}

      </AnimatePresence>

    </main>
  );
}