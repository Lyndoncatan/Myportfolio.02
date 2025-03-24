import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CustomCursorProps {
  color?: string;
  size?: number;
  hoverScale?: number;
  clickScale?: number;
}

const CustomCursor = ({
  color = "rgba(255, 255, 255, 0.7)",
  size = 20,
  hoverScale = 1.5,
  clickScale = 0.8,
}: CustomCursorProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleLinkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink =
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-hover");

      setIsHovering(isLink);
    };

    document.addEventListener("mousemove", updateCursorPosition);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleLinkHover);

    return () => {
      document.removeEventListener("mousemove", updateCursorPosition);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleLinkHover);
    };
  }, [isVisible]);

  const cursorVariants = {
    default: {
      x: position.x - size / 2,
      y: position.y - size / 2,
      width: size,
      height: size,
      backgroundColor: color,
      mixBlendMode: "difference" as const,
    },
    hover: {
      x: position.x - (size * hoverScale) / 2,
      y: position.y - (size * hoverScale) / 2,
      width: size * hoverScale,
      height: size * hoverScale,
      backgroundColor: color,
      mixBlendMode: "difference" as const,
    },
    click: {
      x: position.x - (size * clickScale) / 2,
      y: position.y - (size * clickScale) / 2,
      width: size * clickScale,
      height: size * clickScale,
      backgroundColor: color,
      mixBlendMode: "difference" as const,
    },
  };

  const cursorOuterVariants = {
    default: {
      x: position.x - (size + 10) / 2,
      y: position.y - (size + 10) / 2,
      width: size + 10,
      height: size + 10,
      border: `1px solid ${color}`,
      backgroundColor: "transparent",
    },
    hover: {
      x: position.x - (size * hoverScale + 10) / 2,
      y: position.y - (size * hoverScale + 10) / 2,
      width: size * hoverScale + 10,
      height: size * hoverScale + 10,
      border: `1px solid ${color}`,
      backgroundColor: "transparent",
    },
    click: {
      x: position.x - (size * clickScale + 10) / 2,
      y: position.y - (size * clickScale + 10) / 2,
      width: size * clickScale + 10,
      height: size * clickScale + 10,
      border: `1px solid ${color}`,
      backgroundColor: "transparent",
    },
  };

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50"
      style={{ backgroundColor: "transparent" }}
    >
      {isVisible && (
        <>
          <motion.div
            className="rounded-full fixed top-0 left-0 pointer-events-none"
            variants={cursorVariants}
            animate={isClicking ? "click" : isHovering ? "hover" : "default"}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 28,
              mass: 0.5,
            }}
          />
          <motion.div
            className="rounded-full fixed top-0 left-0 pointer-events-none"
            variants={cursorOuterVariants}
            animate={isClicking ? "click" : isHovering ? "hover" : "default"}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 28,
              mass: 0.8,
            }}
          />
        </>
      )}
    </div>
  );
};

export default CustomCursor;
