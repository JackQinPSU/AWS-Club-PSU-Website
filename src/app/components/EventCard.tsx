import { motion } from "motion/react";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

interface EventCardProps {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: string;
  tag: string;
  tagColor: string;
  index: number;
  isPast?: boolean;
}

export function EventCard({
  title,
  description,
  date,
  time,
  location,
  capacity,
  tag,
  tagColor,
  index,
  isPast = false,
}: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className={`border border-[#2a2a2a] rounded p-6 hover:border-[#404040] transition-colors ${
        isPast ? "opacity-40" : ""
      }`}
    >
      {/* Tag */}
      <div className="flex items-center justify-between mb-4">
        <span
          className={`text-xs font-semibold uppercase tracking-wider border px-2 py-0.5 rounded ${tagColor}`}
        >
          {tag}
        </span>
        {isPast && (
          <span className="text-xs text-[#555] uppercase tracking-wider">Past</span>
        )}
      </div>

      <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-[#888] mb-5 leading-relaxed">{description}</p>

      {/* Meta */}
      <div className="space-y-1.5 text-xs text-[#777]">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-3.5 h-3.5 shrink-0" />
          <span>{capacity}</span>
        </div>
      </div>

      {!isPast && (
        <button className="mt-5 w-full py-2 border border-[#FF9900] text-[#FF9900] text-xs font-bold uppercase tracking-wider rounded hover:bg-[#FF9900] hover:text-black transition-colors">
          RSVP Now
        </button>
      )}
    </motion.div>
  );
}
