import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cloud, CalendarDays, Users, Camera, Server, Zap } from "lucide-react";
import { ProjectCard } from "./components/ProjectCard";
import { EventCard } from "./components/EventCard";
import { TeamCard } from "./components/TeamCard";

const LINKTREE_URL =
  "https://linktr.ee/aws.psu?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn1h7pSofemCCtxrAGYLR_sKkt21hPeDtdtneMT8Zo8DyVj_mtI40F91hTFNE_aem_PFCGIbrpMFgF-eBIXb0cpA";

type Tab = "home" | "events" | "team" | "gallery";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  const projects = [
    {
      title: "Serverless API Gateway",
      description:
        "Built a scalable REST API using AWS Lambda, API Gateway, and DynamoDB. Handles 10,000+ requests per second with automatic scaling and fault tolerance.",
      technologies: ["AWS Lambda", "API Gateway", "DynamoDB", "Node.js"],
      gradient: "",
    },
    {
      title: "Cloud Infrastructure Automation",
      description:
        "Developed infrastructure-as-code solution using AWS CDK and CloudFormation. Automated deployment of multi-tier applications with CI/CD integration.",
      technologies: ["AWS CDK", "CloudFormation", "EC2", "S3", "Python"],
      gradient: "",
    },
    {
      title: "Real-time Data Pipeline",
      description:
        "Engineered real-time data processing pipeline using AWS Kinesis and Lambda. Processes and analyzes streaming data from IoT devices with sub-second latency.",
      technologies: ["Kinesis", "Lambda", "Athena", "QuickSight"],
      gradient: "",
    },
  ];

  const upcomingEvents = [
    {
      title: "Serverless Workshop: Build & Deploy",
      description:
        "Hands-on workshop where you'll build and deploy a full serverless application using AWS Lambda, API Gateway, and DynamoDB from scratch.",
      date: "April 12, 2026",
      time: "2:00 PM – 5:00 PM",
      location: "IST Building, Room 220",
      capacity: "40 spots available",
      tag: "Workshop",
      tagColor: "text-blue-400 border-blue-400/40",
    },
    {
      title: "Cloud Cert Study Group – AWS SAA-C03",
      description:
        "Weekly collaborative study session for students preparing for the AWS Solutions Architect Associate exam. Bring your questions!",
      date: "April 18, 2026",
      time: "6:00 PM – 8:00 PM",
      location: "Pattee Library, Collaboration Room 3",
      capacity: "25 spots available",
      tag: "Study Group",
      tagColor: "text-green-400 border-green-400/40",
    },
    {
      title: "Guest Speaker: AWS Solutions Architect",
      description:
        "Industry professional from Amazon Web Services joins us to talk about real-world cloud architecture, career paths, and the AWS ecosystem.",
      date: "April 25, 2026",
      time: "5:30 PM – 7:00 PM",
      location: "Westgate Building, Auditorium A",
      capacity: "100 seats",
      tag: "Speaker",
      tagColor: "text-purple-400 border-purple-400/40",
    },
    {
      title: "Cloud Hackathon: Build for Impact",
      description:
        "24-hour hackathon challenging teams to build cloud-powered solutions addressing real-world problems. Prizes, food, and AWS credits included.",
      date: "May 3–4, 2026",
      time: "10:00 AM – 10:00 AM (24 hrs)",
      location: "HUB Robeson Center, Innovation Lab",
      capacity: "Unlimited — form a team of 2–4",
      tag: "Hackathon",
      tagColor: "text-[#FF9900] border-[#FF9900]/40",
    },
  ];

  const pastEvents = [
    {
      title: "Intro to AWS: Cloud Fundamentals",
      description:
        "Beginner-friendly overview of AWS core services including EC2, S3, RDS, and IAM. Perfect for students just getting started with cloud.",
      date: "March 7, 2026",
      time: "3:00 PM – 5:00 PM",
      location: "IST Building, Room 220",
      capacity: "38 attended",
      tag: "Workshop",
      tagColor: "text-[#666] border-[#444]",
    },
    {
      title: "Resume & LinkedIn Review Session",
      description:
        "Club officers and alumni provided feedback on resumes and LinkedIn profiles, with a focus on cloud and DevOps roles.",
      date: "March 21, 2026",
      time: "4:00 PM – 6:00 PM",
      location: "Zoom (Virtual)",
      capacity: "22 attended",
      tag: "Career",
      tagColor: "text-[#666] border-[#444]",
    },
  ];

  const teamMembers = [
    { name: "Alex Johnson", title: "President", linkedin: "#" },
    { name: "Maya Patel", title: "Vice President", linkedin: "#" },
    { name: "Chris Lee", title: "Technical Lead", linkedin: "#" },
    { name: "Sarah Kim", title: "Events Coordinator", linkedin: "#" },
    { name: "Jordan Rivera", title: "Marketing Lead", linkedin: "#" },
    { name: "Taylor Chen", title: "Secretary", linkedin: "#" },
    { name: "Morgan Davis", title: "Treasurer", linkedin: "#" },
    { name: "Casey Wilson", title: "Social Media Manager", linkedin: "#" },
  ];

  const galleryItems = [
    { label: "Serverless Workshop", date: "Feb 2026", span: "col-span-2" },
    { label: "Club Kickoff", date: "Jan 2026", span: "" },
    { label: "AWS Hackathon", date: "Nov 2025", span: "" },
    { label: "Guest Speaker Night", date: "Oct 2025", span: "" },
    { label: "Study Group Session", date: "Mar 2026", span: "" },
    { label: "Resume Review Day", date: "Mar 2026", span: "col-span-2" },
    { label: "Cloud Cert Prep", date: "Feb 2026", span: "" },
    { label: "Team Meetup", date: "Dec 2025", span: "" },
    { label: "Industry Panel", date: "Apr 2026", span: "" },
  ];

  const navItems: { label: string; tab: Tab }[] = [
    { label: "Home", tab: "home" },
    { label: "Events", tab: "events" },
    { label: "Team", tab: "team" },
    { label: "Gallery", tab: "gallery" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0a] border-b border-[#2a2a2a]">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-[#FF9900]" />
            <span className="font-bold text-white text-sm tracking-tight">
              AWS Cloud Club
            </span>
          </div>

          <div className="flex items-center gap-6">
            {navItems.map(({ label, tab }) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative text-sm font-medium pb-0.5 transition-colors ${
                  activeTab === tab
                    ? "text-white"
                    : "text-[#777] hover:text-[#bbb]"
                }`}
              >
                {label}
                {activeTab === tab && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-[1px] left-0 right-0 h-px bg-[#FF9900]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <a
            href={LINKTREE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 bg-[#FF9900] text-black text-sm font-bold rounded transition-opacity hover:opacity-90"
          >
            Join
          </a>
        </div>
      </nav>

      {/* Pages */}
      <AnimatePresence mode="wait">

        {/* HOME */}
        {activeTab === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Hero */}
            <section className="max-w-6xl mx-auto px-6 pt-32 pb-24">
              <p className="text-xs uppercase tracking-[0.2em] text-[#FF9900] mb-6">
                Penn State University
              </p>
              <h1 className="text-6xl md:text-8xl font-bold text-white leading-none tracking-tight mb-6">
                AWS Cloud Club
              </h1>
              <p className="text-lg text-[#999] max-w-xl mb-10 leading-relaxed">
                Building the future with cloud technology. Learn, build, and connect
                with fellow cloud enthusiasts at Penn State.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href={LINKTREE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#FF9900] text-black font-bold text-sm rounded transition-opacity hover:opacity-90"
                >
                  Join the Club
                </a>
                <button
                  onClick={() => setActiveTab("events")}
                  className="px-6 py-3 border border-[#3a3a3a] text-[#aaa] text-sm font-medium rounded hover:border-[#666] hover:text-white transition-colors"
                >
                  View Events
                </button>
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-12 mt-20 pt-10 border-t border-[#1a1a1a]">
                {[
                  { value: "200+", label: "Members" },
                  { value: "20+", label: "Events hosted" },
                  { value: "10+", label: "AWS certifications" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-[#888] mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Divider */}
            <div className="border-t border-[#2a2a2a]" />

            {/* What we do */}
            <section className="max-w-6xl mx-auto px-6 py-20">
              <p className="text-xs uppercase tracking-[0.2em] text-[#777] mb-10">
                What we do
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#2a2a2a]">
                {[
                  {
                    label: "Cloud Native",
                    body: "Hands-on experience with core AWS services — from compute to storage to networking.",
                  },
                  {
                    label: "Hands-on Labs",
                    body: "Build real projects. No slides-only sessions. Every meeting has something to ship.",
                  },
                  {
                    label: "Community",
                    body: "A network of students, alumni, and professionals who take cloud seriously.",
                  },
                ].map((item) => (
                  <div key={item.label} className="bg-[#141414] p-8">
                    <p className="text-white font-semibold mb-3">{item.label}</p>
                    <p className="text-sm text-[#888] leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Divider */}
            <div className="border-t border-[#2a2a2a]" />

            {/* Projects */}
            <section className="max-w-6xl mx-auto px-6 py-20">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#777] mb-2">
                    Our work
                  </p>
                  <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
                </div>
                <Server className="w-5 h-5 text-[#555]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project, index) => (
                  <ProjectCard key={index} {...project} index={index} />
                ))}
              </div>
            </section>

            {/* Divider */}
            <div className="border-t border-[#2a2a2a]" />

            {/* CTA */}
            <section className="max-w-6xl mx-auto px-6 py-20">
              <div className="border border-[#2a2a2a] rounded p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div>
                  <Zap className="w-6 h-6 text-[#FF9900] mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Ready to build the future?
                  </h2>
                  <p className="text-[#888] text-sm max-w-md">
                    Workshops, hackathons, and cloud certification prep — all at no
                    cost to Penn State students.
                  </p>
                </div>
                <a
                  href={LINKTREE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 px-6 py-3 bg-[#FF9900] text-black font-bold text-sm rounded transition-opacity hover:opacity-90"
                >
                  Get Started Today
                </a>
              </div>
            </section>
          </motion.div>
        )}

        {/* EVENTS */}
        {activeTab === "events" && (
          <motion.div
            key="events"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <section className="max-w-6xl mx-auto px-6 pt-20 pb-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[#FF9900] mb-4">
                Club Events
              </p>
              <div className="flex items-end gap-3 mb-2">
                <CalendarDays className="w-6 h-6 text-[#555] mb-1" />
                <h1 className="text-5xl font-bold text-white leading-none">Events</h1>
              </div>
              <p className="text-[#888] mt-4 max-w-xl">
                Workshops, study groups, hackathons, and more.
              </p>
            </section>

            <div className="border-t border-[#2a2a2a] mt-10" />

            <section className="max-w-6xl mx-auto px-6 py-14">
              <p className="text-xs uppercase tracking-[0.2em] text-[#777] mb-8">
                Upcoming
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingEvents.map((event, index) => (
                  <EventCard key={index} {...event} index={index} />
                ))}
              </div>
            </section>

            <div className="border-t border-[#2a2a2a]" />

            <section className="max-w-6xl mx-auto px-6 py-14 pb-24">
              <p className="text-xs uppercase tracking-[0.2em] text-[#555] mb-8">
                Past events
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pastEvents.map((event, index) => (
                  <EventCard key={index} {...event} index={index} isPast={true} />
                ))}
              </div>
            </section>
          </motion.div>
        )}

        {/* TEAM */}
        {activeTab === "team" && (
          <motion.div
            key="team"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <section className="max-w-6xl mx-auto px-6 pt-20 pb-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[#FF9900] mb-4">
                Our Team
              </p>
              <div className="flex items-end gap-3 mb-2">
                <Users className="w-6 h-6 text-[#555] mb-1" />
                <h1 className="text-5xl font-bold text-white leading-none">
                  Meet the Team
                </h1>
              </div>
              <p className="text-[#888] mt-4 max-w-xl">
                The people behind AWS Cloud Club at Penn State.
              </p>
            </section>

            <div className="border-t border-[#2a2a2a] mt-10" />

            <section className="max-w-6xl mx-auto px-6 py-14 pb-24">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {teamMembers.map((member, index) => (
                  <TeamCard key={index} {...member} index={index} />
                ))}
              </div>
            </section>
          </motion.div>
        )}

        {/* GALLERY */}
        {activeTab === "gallery" && (
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <section className="max-w-6xl mx-auto px-6 pt-20 pb-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[#FF9900] mb-4">
                Photo Gallery
              </p>
              <div className="flex items-end gap-3 mb-2">
                <Camera className="w-6 h-6 text-[#555] mb-1" />
                <h1 className="text-5xl font-bold text-white leading-none">Gallery</h1>
              </div>
              <p className="text-[#888] mt-4 max-w-xl">
                Highlights from our workshops, hackathons, and club events.
              </p>
            </section>

            <div className="border-t border-[#2a2a2a] mt-10" />

            <section className="max-w-6xl mx-auto px-6 py-14 pb-24">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-[#2a2a2a] auto-rows-[200px]">
                {galleryItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`relative bg-[#161616] group cursor-pointer overflow-hidden ${item.span}`}
                  >
                    {/* Placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Camera className="w-8 h-8 text-[#333]" />
                    </div>

                    {/* Caption */}
                    <div className="absolute bottom-0 inset-x-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-200 bg-[#141414] border-t border-[#2a2a2a]">
                      <p className="text-white text-sm font-medium">{item.label}</p>
                      <p className="text-[#777] text-xs mt-0.5">{item.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <p className="text-[#555] text-xs mt-6">
                Photos coming soon — check back after our next event.
              </p>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="border-t border-[#2a2a2a]">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cloud className="w-4 h-4 text-[#FF9900]" />
            <span className="text-xs text-[#555] font-medium">AWS Cloud Club at Penn State</span>
          </div>
          <p className="text-xs text-[#555]">&copy; 2026</p>
        </div>
      </div>
    </div>
  );
}
