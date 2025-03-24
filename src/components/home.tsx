import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, MousePointer } from "lucide-react";
import { Button } from "./ui/button";
import ThemeProvider, { useTheme } from "./ThemeProvider";
import RainAnimation from "./effects/RainAnimation";
import CustomCursor from "./effects/CustomCursor";
import Navbar from "./layout/Navbar";
import AboutMe from "./sections/AboutMe";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";

const Hero = ({ name = "Lyndon Domini Catan", title = "UI/UX WEB DESIGN" }) => {
  const scrollToContent = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const viewProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="h-screen flex items-center justify-center relative bg-background"
    >
      <div className="container mx-auto px-6 z-10">
        <div className="max-w-4xl">
          <div className="flex items-center mb-8 space-x-4">
            <div className="bg-gray-800 rounded-full p-4 w-16 h-16 flex items-center justify-center">
              <MousePointer className="h-6 w-6 text-white" />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-lg uppercase tracking-wider text-white/80"
            >
              {title}
            </motion.p>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight"
          >
            Welcome to Lyndon's Portfolio
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl mb-12 text-gray-400 max-w-3xl"
          >
            Explore my work and projects showcasing my skills in web
            development, design, and creative problem-solving.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              onClick={viewProjects}
              className="bg-white text-black hover:bg-white/90 px-8 py-6 text-lg font-medium transition-all"
              size="lg"
            >
              View Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              onClick={scrollToContent}
              className="bg-transparent border border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-medium transition-all"
              size="lg"
              variant="outline"
            >
              About Me
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 1.2,
        }}
      >
        <p className="text-white/70 mb-2 text-sm">Explore More</p>
        <ArrowDown className="h-6 w-6 text-white/70 animate-bounce" />
      </motion.div>
    </section>
  );
};

const Home = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <RainAnimation density={100} fallSpeed={1.5} />
      <CustomCursor />
      <Navbar toggleTheme={toggleTheme} isDarkMode={theme === "dark"} />

      <main>
        <Hero />
        <AboutMe />
        <Projects />
        <Skills />
      </main>

      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border">
        <div className="container mx-auto">
          <p>
            © {new Date().getFullYear()} Lyndon Domini Catan. All rights
            reserved.
          </p>
          <p className="mt-2">
            Built with React, Tailwind CSS, and Framer Motion
          </p>
        </div>
      </footer>
    </div>
  );
};

const HomeWithTheme = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <Home />
    </ThemeProvider>
  );
};

export default HomeWithTheme;
