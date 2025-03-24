import React from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

interface HeroProps {
  name?: string;
  title?: string;
  onExplore?: () => void;
}

const Hero: React.FC<HeroProps> = ({
  name = "Lyndon Domini Catan",
  title = "Web Developer",
  onExplore = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  },
}) => {
  return (
    <div className="relative h-[600px] w-full flex items-center justify-center bg-background">
      <div className="text-center z-10 px-4">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-4 text-foreground"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {name}
        </motion.h1>

        <motion.h2
          className="text-2xl md:text-3xl mb-8 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            size="lg"
            onClick={onExplore}
            className="px-8 py-6 text-lg font-medium transition-all hover:scale-105"
          >
            Explore
          </Button>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-[5]"></div>

      {/* Animated dots in background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/20 dark:bg-primary/10"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
