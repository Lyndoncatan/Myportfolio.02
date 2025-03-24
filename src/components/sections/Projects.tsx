import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ExternalLink, Github, ArrowRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
}

interface ProjectsProps {
  projects?: Project[];
  title?: string;
  subtitle?: string;
}

const Projects = ({
  projects = [
    {
      id: "1",
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce platform with user authentication, product catalog, and payment integration.",
      imageUrl:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
      liveUrl: "https://example.com/ecommerce",
      githubUrl: "https://github.com/lyndoncatan/ecommerce",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    },
    {
      id: "2",
      title: "Weather Dashboard",
      description:
        "Real-time weather application with location-based forecasts and interactive maps.",
      imageUrl:
        "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80",
      liveUrl: "https://example.com/weather",
      githubUrl: "https://github.com/lyndoncatan/weather-app",
      technologies: ["React", "OpenWeather API", "Leaflet", "Tailwind CSS"],
    },
    {
      id: "3",
      title: "Task Management App",
      description:
        "Collaborative task management tool with real-time updates and team collaboration features.",
      imageUrl:
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
      liveUrl: "https://example.com/taskmanager",
      githubUrl: "https://github.com/lyndoncatan/task-manager",
      technologies: ["React", "Firebase", "Material UI", "Redux"],
    },
  ],
  title = "Projects",
  subtitle = "A collection of my recent web design work",
}: ProjectsProps) => {
  return (
    <section
      id="projects"
      className="py-24 w-full bg-background relative z-10 border-t border-b border-white/10"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">{title}</h2>
          <div className="h-1 w-20 bg-white"></div>
          <p className="text-gray-300 mt-6 max-w-2xl">{subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900/90 rounded-lg overflow-hidden group hover:bg-gray-800/90 transition-all duration-300 shadow-xl border border-white/10 hover:border-white/20"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-gray-300 mb-6">{project.description}</p>
                <div className="flex justify-between items-center">
                  {project.liveUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-white hover:bg-gray-800 hover:text-white"
                      asChild
                    >
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Project
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-300 hover:text-white"
                      asChild
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button
            className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-5 text-lg font-medium transition-all"
            size="lg"
            variant="outline"
          >
            View All Projects
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
