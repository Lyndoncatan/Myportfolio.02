import React, { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Menu,
  X,
  Home,
  User,
  FolderKanban,
  Code,
  Cloud,
  Stars,
} from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeProvider";

interface NavbarProps {
  toggleTheme?: () => void;
  isDarkMode?: boolean;
}

const Navbar = ({
  toggleTheme: propToggleTheme,
  isDarkMode: propIsDarkMode,
}: NavbarProps) => {
  const {
    theme,
    toggleTheme: contextToggleTheme,
    themeDescription,
  } = useTheme();
  const toggleTheme = propToggleTheme || contextToggleTheme;
  const isDarkMode =
    propIsDarkMode !== undefined ? propIsDarkMode : theme === "dark";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = ["home", "about", "projects", "skills"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (
          element &&
          scrollPosition >= element.offsetTop &&
          scrollPosition < element.offsetTop + element.offsetHeight
        ) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-background/80 backdrop-blur-sm"}`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo/Name */}
        <div className="text-xl font-bold">
          <span className="text-white">Lyndon Catan</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("home")}
            className={`flex items-center space-x-2 px-4 py-2 transition-all ${activeSection === "home" ? "text-white border-b-2 border-white font-bold" : "text-gray-300 hover:text-white hover:bg-white/10 rounded-md"}`}
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className={`flex items-center space-x-2 px-4 py-2 transition-all ${activeSection === "about" ? "text-white border-b-2 border-white font-bold" : "text-gray-300 hover:text-white hover:bg-white/10 rounded-md"}`}
          >
            <User className="h-4 w-4" />
            <span>About</span>
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className={`flex items-center space-x-2 px-4 py-2 transition-all ${activeSection === "projects" ? "text-white border-b-2 border-white font-bold" : "text-gray-300 hover:text-white hover:bg-white/10 rounded-md"}`}
          >
            <FolderKanban className="h-4 w-4" />
            <span>Projects</span>
          </button>
          <button
            onClick={() => scrollToSection("skills")}
            className={`flex items-center space-x-2 px-4 py-2 transition-all ${activeSection === "skills" ? "text-white border-b-2 border-white font-bold" : "text-gray-300 hover:text-white hover:bg-white/10 rounded-md"}`}
          >
            <Code className="h-4 w-4" />
            <span>Skills</span>
          </button>
        </div>

        {/* Theme Toggle Button */}
        <div className="flex items-center">
          <div className="mr-2 text-sm hidden sm:block text-white/80">
            {themeDescription}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full hover:bg-muted/20 relative overflow-hidden"
            aria-label={`Toggle theme to ${isDarkMode ? "light" : "dark"} mode`}
          >
            {isDarkMode ? (
              <>
                <Sun className="h-5 w-5 text-yellow-300 relative z-10" />
                <div className="absolute inset-0 bg-blue-900/30 rounded-full"></div>
              </>
            ) : (
              <>
                <div className="relative">
                  <Moon className="h-5 w-5 text-blue-100 relative z-10" />
                  <Stars className="h-3 w-3 text-yellow-200 absolute -top-1 -right-1 z-20" />
                </div>
                <div className="absolute inset-0 bg-indigo-900/50 rounded-full"></div>
              </>
            )}
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full hover:bg-muted/20 ml-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-white" />
            ) : (
              <Menu className="h-5 w-5 text-white" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center space-x-2 text-white hover:text-primary transition-colors py-2"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="flex items-center space-x-2 text-white hover:text-primary transition-colors py-2"
            >
              <User className="h-4 w-4" />
              <span>About</span>
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="flex items-center space-x-2 text-white hover:text-primary transition-colors py-2"
            >
              <FolderKanban className="h-4 w-4" />
              <span>Projects</span>
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="flex items-center space-x-2 text-white hover:text-primary transition-colors py-2"
            >
              <Code className="h-4 w-4" />
              <span>Skills</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
