import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  gradient: string;
  index: number;
}

export function ProjectCard({ title, description, technologies, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="border border-[#2a2a2a] rounded p-6 hover:border-[#404040] transition-colors group"
    >
      <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-[#888] mb-5 leading-relaxed">{description}</p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {technologies.map((tech, i) => (
          <span
            key={i}
            className="px-2 py-0.5 text-xs text-[#888] border border-[#333] rounded"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        <button className="flex items-center gap-1.5 text-xs text-[#777] hover:text-white transition-colors">
          <Github className="w-3.5 h-3.5" />
          Code
        </button>
        <button className="flex items-center gap-1.5 text-xs text-[#777] hover:text-white transition-colors">
          <ExternalLink className="w-3.5 h-3.5" />
          Demo
        </button>
      </div>
    </motion.div>
  );
}
