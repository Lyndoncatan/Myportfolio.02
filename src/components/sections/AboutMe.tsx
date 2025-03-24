import React from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, User, Code } from "lucide-react";

interface AboutMeProps {
  name?: string;
  email?: string;
  location?: string;
  specialization?: string;
}

const AboutMe: React.FC<AboutMeProps> = ({
  name = "Lyndon Domini Catan",
  email = "lyndoncatan75@gmail.com",
  location = "Metro Manila, Marikina City",
  specialization = "UI/UX Web Design",
}) => {
  return (
    <section id="about" className="py-24 w-full bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">About Me</h2>
          <div className="h-1 w-20 bg-white"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center bg-gray-900/50 p-8 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-6 text-white">
              Personal Details
            </h3>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-gray-800 p-3 rounded-full">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Name</p>
                  <p className="font-medium text-white">{name}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-gray-800 p-3 rounded-full">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="font-medium text-white">{email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-gray-800 p-3 rounded-full">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="font-medium text-white">{location}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-gray-800 p-3 rounded-full">
                  <Code className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Specialization</p>
                  <p className="font-medium text-white">{specialization}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center bg-gray-900/50 p-8 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-6 text-white">My Story</h3>

            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                I am a passionate web designer with a keen eye for detail and a
                commitment to creating responsive, user-friendly websites. My
                journey in web development started with a curiosity about how
                websites work, and has evolved into a professional career where
                I continuously learn and adapt to new technologies.
              </p>
              <p className="text-gray-300 leading-relaxed">
                When I'm not coding, you can find me exploring new design
                trends, contributing to open-source projects, or enjoying
                outdoor activities to recharge my creative energy.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
