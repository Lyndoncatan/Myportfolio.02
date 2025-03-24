import React from "react";
import { motion } from "framer-motion";
import {
  Code,
  Database,
  Globe,
  Palette,
  Server,
  Smartphone,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number; // 1-5 for skill level
  color: string;
}

interface SkillsProps {
  skills?: Skill[];
  title?: string;
  description?: string;
}

const Skills = ({
  skills = [
    {
      name: "HTML/CSS",
      icon: <Globe className="h-6 w-6" />,
      level: 5,
      color: "text-white",
    },
    {
      name: "JavaScript",
      icon: <Code className="h-6 w-6" />,
      level: 4,
      color: "text-white",
    },
    {
      name: "React",
      icon: <Code className="h-6 w-6" />,
      level: 4,
      color: "text-white",
    },
    {
      name: "Node.js",
      icon: <Server className="h-6 w-6" />,
      level: 3,
      color: "text-white",
    },
    {
      name: "UI/UX Design",
      icon: <Palette className="h-6 w-6" />,
      level: 4,
      color: "text-white",
    },
    {
      name: "Responsive Design",
      icon: <Smartphone className="h-6 w-6" />,
      level: 5,
      color: "text-white",
    },
    {
      name: "Database Management",
      icon: <Database className="h-6 w-6" />,
      level: 3,
      color: "text-white",
    },
  ],
  title = "Skills",
  description = "Technologies and tools I work with",
}: SkillsProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <section
      id="skills"
      className="py-24 w-full bg-background min-h-[500px] relative z-10 border-t border-b border-white/10"
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
          <p className="text-gray-300 mt-6 max-w-2xl">{description}</p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-gray-900/90 p-6 rounded-lg hover:bg-gray-800/90 transition-all duration-300 shadow-xl border border-white/10 hover:border-white/20"
            >
              <div className="flex items-center mb-6">
                <div className="bg-gray-800 p-3 rounded-full mr-4">
                  {React.cloneElement(skill.icon as React.ReactElement, {
                    className: "h-5 w-5 text-white",
                  })}
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {skill.name}
                </h3>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-white"
                  style={{ width: `${(skill.level / 5) * 100}%` }}
                ></div>
              </div>
              <div className="mt-3 text-sm text-gray-300 flex justify-between">
                <span>Beginner</span>
                <span>
                  {skill.level === 5
                    ? "Expert"
                    : skill.level === 4
                      ? "Advanced"
                      : skill.level === 3
                        ? "Intermediate"
                        : skill.level === 2
                          ? "Basic"
                          : "Beginner"}
                </span>
                <span>Expert</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
