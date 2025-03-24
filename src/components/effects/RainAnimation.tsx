import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../ThemeProvider";

interface RainDropProps {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

interface CloudProps {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
}

interface StarProps {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
}

interface MoonProps {
  x: number;
  y: number;
  radius: number;
  phase: number; // 0-1 for moon phase
}

interface RainAnimationProps {
  density?: number;
  fallSpeed?: number;
}

const RainAnimation = ({
  density = 100,
  fallSpeed = 1.5,
}: RainAnimationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const raindrops = useRef<RainDropProps[]>([]);
  const clouds = useRef<CloudProps[]>([]);
  const stars = useRef<StarProps[]>([]);
  const moon = useRef<MoonProps | null>(null);
  const animationFrameId = useRef<number>(0);
  const { theme } = useTheme() || { theme: "dark" };
  const pixelSize = 3; // Size of each pixel for the pixel art effect

  // Set up canvas dimensions and initialize elements
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const { clientWidth, clientHeight } = document.documentElement;
        setDimensions({
          width: clientWidth,
          height: clientHeight,
        });
        canvasRef.current.width = clientWidth;
        canvasRef.current.height = clientHeight;
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  // Initialize elements when dimensions change
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      initRaindrops();
      initClouds();
      initStars();
      initMoon();
    }
  }, [dimensions, density]);

  // Animation effect
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      const animate = () => {
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext("2d");
          if (ctx) {
            ctx.clearRect(0, 0, dimensions.width, dimensions.height);

            // Set background based on theme
            if (theme === "dark") {
              // Night sky gradient - darker blue for night
              const gradient = ctx.createLinearGradient(
                0,
                0,
                0,
                dimensions.height,
              );
              gradient.addColorStop(0, "#050518"); // Darker night blue
              gradient.addColorStop(1, "#0a0a2a"); // Slightly lighter at bottom
              ctx.fillStyle = gradient;
              ctx.fillRect(0, 0, dimensions.width, dimensions.height);

              // Draw stars
              drawStars(ctx);

              // Draw moon
              drawMoon(ctx);

              // Draw pixelated rain
              drawPixelRain(ctx, "#8acdff");
            } else {
              // Day sky gradient
              const gradient = ctx.createLinearGradient(
                0,
                0,
                0,
                dimensions.height,
              );
              gradient.addColorStop(0, "#87ceeb");
              gradient.addColorStop(1, "#e0f7ff");
              ctx.fillStyle = gradient;
              ctx.fillRect(0, 0, dimensions.width, dimensions.height);

              // Draw sun
              drawSun(ctx);

              // Draw clouds
              drawClouds(ctx);
            }
          }
        }
        animationFrameId.current = requestAnimationFrame(animate);
      };

      animate();
      return () => {
        cancelAnimationFrame(animationFrameId.current);
      };
    }
  }, [dimensions, fallSpeed, theme]);

  // Draw pixelated rain
  const drawPixelRain = (ctx: CanvasRenderingContext2D, color: string) => {
    raindrops.current.forEach((drop, index) => {
      // Draw pixelated raindrop
      ctx.fillStyle = color;
      ctx.globalAlpha = drop.opacity;

      // Draw a pixel square instead of a line
      ctx.fillRect(
        Math.floor(drop.x / pixelSize) * pixelSize,
        Math.floor(drop.y / pixelSize) * pixelSize,
        pixelSize,
        pixelSize,
      );

      // Update raindrop position
      drop.y += drop.speed * fallSpeed;

      // Reset raindrop if it goes off screen
      if (drop.y > dimensions.height) {
        raindrops.current[index] = createRaindrop(dimensions.width);
      }
    });
    ctx.globalAlpha = 1;
  };

  // Draw stars with twinkling effect
  const drawStars = (ctx: CanvasRenderingContext2D) => {
    stars.current.forEach((star, index) => {
      // Calculate twinkling effect
      const twinkle =
        Math.sin(Date.now() * 0.001 * star.twinkleSpeed) * 0.3 + 0.7;

      ctx.fillStyle = "#ffffff";
      ctx.globalAlpha = star.opacity * twinkle;

      // Draw pixelated star
      ctx.fillRect(
        Math.floor(star.x / pixelSize) * pixelSize,
        Math.floor(star.y / pixelSize) * pixelSize,
        star.size,
        star.size,
      );
    });
    ctx.globalAlpha = 1;
  };

  // Draw moon
  const drawMoon = (ctx: CanvasRenderingContext2D) => {
    if (!moon.current) return;

    const { x, y, radius, phase } = moon.current;

    // Draw pixelated moon
    ctx.fillStyle = "#e1e1e6"; // Light gray for moon

    // Draw moon as a collection of pixels
    for (let py = y - radius; py < y + radius; py += pixelSize) {
      for (let px = x - radius; px < x + radius; px += pixelSize) {
        const distance = Math.sqrt(Math.pow(px - x, 2) + Math.pow(py - y, 2));

        if (distance < radius) {
          // Create moon phase effect (simple crescent)
          const phaseOffset = radius * phase;
          const distanceFromPhaseEdge = px - (x - radius + phaseOffset * 2);

          if (distanceFromPhaseEdge > 0 || phase === 0) {
            ctx.fillRect(
              Math.floor(px / pixelSize) * pixelSize,
              Math.floor(py / pixelSize) * pixelSize,
              pixelSize,
              pixelSize,
            );
          }
        }
      }
    }

    // Add some moon craters
    const craterPositions = [
      { x: x - radius * 0.3, y: y - radius * 0.2, size: radius * 0.15 },
      { x: x + radius * 0.2, y: y + radius * 0.3, size: radius * 0.1 },
      { x: x - radius * 0.1, y: y + radius * 0.1, size: radius * 0.08 },
    ];

    ctx.fillStyle = "#d1d1d6"; // Slightly darker for craters
    craterPositions.forEach((crater) => {
      const { x: cx, y: cy, size } = crater;

      // Only draw craters on the visible part of the moon
      const phaseOffset = radius * phase;
      const distanceFromPhaseEdge = cx - (x - radius + phaseOffset * 2);

      if (distanceFromPhaseEdge > 0 || phase === 0) {
        for (let py = cy - size; py < cy + size; py += pixelSize) {
          for (let px = cx - size; px < cx + size; px += pixelSize) {
            const distance = Math.sqrt(
              Math.pow(px - cx, 2) + Math.pow(py - cy, 2),
            );

            if (distance < size) {
              ctx.fillRect(
                Math.floor(px / pixelSize) * pixelSize,
                Math.floor(py / pixelSize) * pixelSize,
                pixelSize,
                pixelSize,
              );
            }
          }
        }
      }
    });
  };

  // Draw sun
  const drawSun = (ctx: CanvasRenderingContext2D) => {
    const sunX = dimensions.width * 0.8;
    const sunY = dimensions.height * 0.2;
    const sunRadius = dimensions.width * 0.05;

    // Draw pixelated sun
    ctx.fillStyle = "#ffdd00";

    // Draw sun as a collection of pixels
    for (let y = sunY - sunRadius; y < sunY + sunRadius; y += pixelSize) {
      for (let x = sunX - sunRadius; x < sunX + sunRadius; x += pixelSize) {
        const distance = Math.sqrt(
          Math.pow(x - sunX, 2) + Math.pow(y - sunY, 2),
        );
        if (distance < sunRadius) {
          ctx.fillRect(
            Math.floor(x / pixelSize) * pixelSize,
            Math.floor(y / pixelSize) * pixelSize,
            pixelSize,
            pixelSize,
          );
        }
      }
    }
  };

  // Draw clouds
  const drawClouds = (ctx: CanvasRenderingContext2D) => {
    clouds.current.forEach((cloud, index) => {
      ctx.fillStyle = "#ffffff";

      // Draw pixelated cloud
      for (let y = cloud.y; y < cloud.y + cloud.height; y += pixelSize) {
        for (let x = cloud.x; x < cloud.x + cloud.width; x += pixelSize) {
          // Create a cloud shape using noise
          const distFromCenterY =
            Math.abs(y - (cloud.y + cloud.height / 2)) / (cloud.height / 2);
          const distFromCenterX =
            Math.abs(x - (cloud.x + cloud.width / 2)) / (cloud.width / 2);
          const dist = Math.sqrt(
            distFromCenterX * distFromCenterX +
              distFromCenterY * distFromCenterY,
          );

          if (dist < 1 && Math.random() > dist * 0.3) {
            ctx.fillRect(
              Math.floor(x / pixelSize) * pixelSize,
              Math.floor(y / pixelSize) * pixelSize,
              pixelSize,
              pixelSize,
            );
          }
        }
      }

      // Move cloud horizontally
      cloud.x += cloud.speed;

      // Reset cloud if it goes off screen
      if (cloud.x > dimensions.width) {
        clouds.current[index] = createCloud(
          dimensions.width,
          dimensions.height,
        );
        clouds.current[index].x = -clouds.current[index].width;
      }
    });
  };

  const createRaindrop = (width: number): RainDropProps => {
    return {
      x: Math.random() * width,
      y: Math.random() * -100,
      size: pixelSize,
      opacity: Math.random() * 0.5 + 0.3,
      speed: Math.random() * 5 + 5,
    };
  };

  const createCloud = (width: number, height: number): CloudProps => {
    const cloudWidth = Math.random() * 100 + 50;
    return {
      x: Math.random() * width,
      y: Math.random() * (height * 0.5),
      width: cloudWidth,
      height: cloudWidth * 0.6,
      speed: Math.random() * 0.2 + 0.1,
    };
  };

  const createStar = (width: number, height: number): StarProps => {
    return {
      x: Math.random() * width,
      y: Math.random() * height * 0.7,
      size: Math.random() > 0.8 ? pixelSize * 2 : pixelSize,
      opacity: Math.random() * 0.5 + 0.5,
      twinkleSpeed: Math.random() * 5 + 1,
    };
  };

  const initMoon = () => {
    // Position moon on the right side of the screen
    const moonRadius = dimensions.width * 0.04;
    moon.current = {
      x: dimensions.width * 0.85,
      y: dimensions.height * 0.2,
      radius: moonRadius,
      phase: 0.3, // Crescent moon phase (0 = full, 1 = new)
    };
  };

  const initRaindrops = () => {
    const newRaindrops: RainDropProps[] = [];
    for (let i = 0; i < density; i++) {
      newRaindrops.push(createRaindrop(dimensions.width));
    }
    raindrops.current = newRaindrops;
  };

  const initClouds = () => {
    const newClouds: CloudProps[] = [];
    const cloudCount = Math.floor(dimensions.width / 300) + 2;
    for (let i = 0; i < cloudCount; i++) {
      newClouds.push(createCloud(dimensions.width, dimensions.height));
    }
    clouds.current = newClouds;
  };

  const initStars = () => {
    const newStars: StarProps[] = [];
    const starCount = Math.floor(
      (dimensions.width * dimensions.height) / 8000, // Increased star density
    );
    for (let i = 0; i < starCount; i++) {
      newStars.push(createStar(dimensions.width, dimensions.height));
    }
    stars.current = newStars;
  };

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
};

export default RainAnimation;
