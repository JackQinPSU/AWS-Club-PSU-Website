import { motion } from "motion/react";
import { Linkedin, UserRound } from "lucide-react";

interface TeamCardProps {
  name: string;
  title: string;
  linkedin: string;
  photo?: string;
  index: number;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function TeamCard({ name, title, linkedin, photo, index }: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      className="border border-[#2a2a2a] rounded overflow-hidden hover:border-[#404040] transition-colors group"
    >
      {/* Photo */}
      <div className="relative w-full aspect-[3/4] bg-[#111] overflow-hidden">
        {photo ? (
          <img
            src={photo}
            alt={name}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[#161616]">
            <UserRound className="w-10 h-10 text-[#333]" />
            <span className="text-[#3a3a3a] text-xl font-bold tracking-widest">
              {getInitials(name)}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 border-t border-[#2a2a2a]">
        <p className="text-sm font-semibold text-white">{name}</p>
        <p className="text-xs text-[#FF9900] mt-0.5">{title}</p>
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center gap-1.5 text-xs text-[#666] hover:text-white transition-colors"
        >
          <Linkedin className="w-3.5 h-3.5" />
          LinkedIn
        </a>
      </div>
    </motion.div>
  );
}
