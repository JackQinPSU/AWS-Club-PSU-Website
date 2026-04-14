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
      className={`relative p-6 bg-gray-800/80 backdrop-blur-sm rounded-2xl border transition-all shadow-sm ${
        isPast
          ? "border-gray-700 hover:border-gray-600 opacity-60"
          : "border-gray-700 hover:border-orange-500/50 hover:shadow-md hover:shadow-orange-500/10"
      }`}
    >
      {/* Glow effect */}
      {!isPast && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/5 to-orange-600/10 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
      )}

      {/* Tag */}
      <div className="flex items-start justify-between mb-4">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${tagColor}`}
        >
          {tag}
        </span>
        {isPast && (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-700 text-gray-400">
            Past Event
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-4 leading-relaxed">{description}</p>

      {/* Meta info */}
      <div className="space-y-2 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-orange-400 shrink-0" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-orange-400 shrink-0" />
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-orange-400 shrink-0" />
          <span>{capacity}</span>
        </div>
      </div>

      {!isPast && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-5 w-full py-2.5 bg-gradient-to-r from-orange-500 to-[#FF9900] hover:from-orange-400 hover:to-orange-500 text-white rounded-xl font-semibold text-sm shadow-md shadow-orange-500/30 transition-all"
        >
          RSVP Now
        </motion.button>
      )}
    </motion.div>
  );
}
