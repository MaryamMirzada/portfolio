import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let animationFrame;

    const moveCursor = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      const target = event.target;

      setIsHovering(
        target instanceof Element &&
          Boolean(target.closest("a, button, img, h1, h2, h3"))
      );
    };

    const animateCursor = () => {
      currentX += (mouseX - currentX) * 0.18;
      currentY += (mouseY - currentY) * 0.18;

      setPosition({
        x: currentX,
        y: currentY,
      });

      animationFrame = requestAnimationFrame(animateCursor);
    };

    window.addEventListener("mousemove", moveCursor);
    animationFrame = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${isHovering ? "cursor-hover" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      aria-hidden="true"
    />
  );
}
