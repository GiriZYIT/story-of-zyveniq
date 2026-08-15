import "../styles/ParticleLayer.css";

export default function ParticleLayer() {

  const particles = Array.from({ length: 35 });

  return (
    <div className="particle-layer">

      {particles.map((_, i) => (

        <span
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 12}s`,
            animationDuration: `${10 + Math.random() * 10}s`,
            opacity: 0.2 + Math.random() * 0.6,
            transform: `scale(${0.5 + Math.random()})`
          }}
        />

      ))}

    </div>
  );

}