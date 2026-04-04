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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`relative p-6 bg-white/80 backdrop-blur-sm rounded-2xl border transition-all shadow-sm hover:shadow-md ${
        isPast
          ? "border-slate-200 hover:border-slate-300 opacity-70"
          : "border-blue-200 hover:border-blue-400"
      }`}
    >
      {/* Glow effect */}
      {!isPast && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/10 to-blue-600/10 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
      )}

      {/* Tag */}
      <div className="flex items-start justify-between mb-4">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${tagColor}`}
        >
          {tag}
        </span>
        {isPast && (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-500">
            Past Event
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm mb-4 leading-relaxed">{description}</p>

      {/* Meta info */}
      <div className="space-y-2 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-500 shrink-0" />
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-500 shrink-0" />
          <span>{capacity}</span>
        </div>
      </div>

      {!isPast && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-5 w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl font-semibold text-sm shadow-md shadow-blue-300/40 transition-all"
        >
          RSVP Now
        </motion.button>
      )}
    </motion.div>
  );
}
