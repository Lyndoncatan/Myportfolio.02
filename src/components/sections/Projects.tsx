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
      title: "Lhood Shop",
      description:
        "A full-stack e-commerce platform with user authentication, product catalog, and payment integration.",
      imageUrl:
        "no image showed",
      liveUrl: "https://l-hood-shop.vercel.app/",
      githubUrl: "https://github.com/Lyndoncatan/L-hood-Shop",
      technologies: ["Typescript", "Css", "Java script"],
    },
    {
      id: "2",
      title: "Streamy",
      description:
        "User can create and post and watch videos.",
      imageUrl:
        "no image showed",
      liveUrl: "https://streamy-my-youtube-version.vercel.app/",
      githubUrl: "https://github.com/Lyndoncatan/Streamy-myYoutube-version",
      technologies: ["Typescript", "Javascript", "Html", "CSS"],
    },
    {
      id: "3",
      title: "Sonify",
      description:
        "User can listen to musci and create playlist.",
      imageUrl:
        "no image showed",
      liveUrl: "https://sonify-my-spotify-version.vercel.app/",
      githubUrl: "https://github.com/Lyndoncatan/sonify-my-Spotify-version",
      technologies: ["Typescript", "Javascript", "Css"],
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
