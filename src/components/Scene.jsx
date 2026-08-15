import { motion } from "framer-motion";
import "../styles/Scene.css";

export default function Scene({
  image,
  title,
  subtitle,
  onNext,
}) {
  return (
    <motion.div
      className="scene"
      style={{
        backgroundImage: `url(${image})`,
      }}
      initial={{
        opacity: 0,
        scale: 1.08,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 1.04,
      }}
      transition={{
        duration: 1.2,
      }}
      onClick={onNext}
    >
      <div className="scene-overlay" />

      <div className="scene-text">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </motion.div>
  );
}