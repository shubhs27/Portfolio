import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const StarBackground = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    generateStars();
    const handleResize = () => {
      generateStars();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const generateStars = () => {
    const numberOfStars = Math.floor(
      (window.innerWidth * window.innerHeight) / 15000
    );
    // One keyframe per entry in the transition's `times` array, built once
    // here so the drift path stays stable across re-renders.
    const drift = (origin, distance) => {
      const offset = () => `${origin + (Math.random() - 0.5) * distance}%`;
      return [`${origin}%`, offset(), offset(), offset(), `${origin}%`];
    };

    const newStars = [];
    for (let i = 0; i < numberOfStars; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const moveDistance = Math.random() * 50 + 4;
      newStars.push({
        id: i,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.8 + 0.3,
        moveDuration: Math.random() * 15 + 20,
        driftX: drift(x, moveDistance),
        driftY: drift(y, moveDistance),
      });
    }
    setStars(newStars);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="star-minimal"
          initial={{ left: star.driftX[0], top: star.driftY[0] }}
          animate={{
            left: star.driftX,
            top: star.driftY,
            opacity: [
              star.opacity,
              star.opacity * 1.2,
              star.opacity * 0.6,
              star.opacity * 1.1,
              star.opacity,
            ],
          }}
          transition={{
            duration: star.moveDuration,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
          style={{
            width: star.size + "px",
            height: star.size + "px",
          }}
        />
      ))}
    </div>
  );
};
