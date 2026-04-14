import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  gradient: string;
  index: number;
}

export function ProjectCard({ title, description, technologies, gradient, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 to-[#FF9900] rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500"></div>
      <div className={`relative h-full bg-gray-800 p-8 rounded-2xl border border-gray-700 group-hover:border-orange-500/50 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-orange-500/10`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
          <p className="text-gray-400 mb-6 leading-relaxed">{description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {technologies.map((tech, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + i * 0.1 }}
                className="px-3 py-1 bg-orange-500/10 backdrop-blur-sm rounded-full text-sm text-orange-300 border border-orange-500/30"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 backdrop-blur-sm rounded-lg text-gray-300 border border-gray-600 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Code</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-[#FF9900] hover:from-orange-400 hover:to-orange-500 rounded-lg text-white transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Demo</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
