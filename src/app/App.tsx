import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cloud, Code, Users, Sparkles, Server, Zap, CalendarDays } from "lucide-react";
import { ProjectCard } from "./components/ProjectCard";
import { EventCard } from "./components/EventCard";

type Tab = "home" | "events";

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

  const features = [
    { icon: Cloud, label: "Cloud Native", color: "from-blue-400 to-blue-600" },
    { icon: Code, label: "Hands-on Labs", color: "from-blue-500 to-blue-700" },
    { icon: Users, label: "Community", color: "from-blue-300 to-blue-500" },
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
      tagColor: "bg-blue-100 text-blue-700",
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
      tagColor: "bg-green-100 text-green-700",
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
      tagColor: "bg-purple-100 text-purple-700",
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
      tagColor: "bg-orange-100 text-orange-700",
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
      tagColor: "bg-slate-100 text-slate-500",
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
      tagColor: "bg-slate-100 text-slate-500",
    },
  ];

  const navItems: { label: string; tab: Tab }[] = [
    { label: "Home", tab: "home" },
    { label: "Events", tab: "events" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white text-slate-900 overflow-x-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl"
        />
      </div>

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
              <Cloud className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-800 text-lg leading-tight">
              AWS Cloud Club
            </span>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 bg-blue-50 rounded-xl p-1">
            {navItems.map(({ label, tab }) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  activeTab === tab
                    ? "text-blue-700"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white rounded-lg shadow-sm border border-blue-200"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            ))}
          </div>

          {/* Join CTA */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl font-semibold text-sm shadow-md shadow-blue-300/40 transition-all"
          >
            Join the Club
          </motion.button>
        </div>
      </nav>

      {/* Page Content */}
      <AnimatePresence mode="wait">
        {activeTab === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Hero Section */}
            <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-6 py-20">
              <div className="max-w-7xl mx-auto text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 backdrop-blur-sm rounded-full border border-blue-300"
                >
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-700">Penn State University</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent"
                >
                  AWS Cloud Club
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl md:text-2xl text-slate-700 mb-12 max-w-3xl mx-auto"
                >
                  Building the future with cloud technology. Join us to learn,
                  innovate, and connect with fellow cloud enthusiasts.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl font-semibold text-lg text-white shadow-lg shadow-blue-300/50 transition-all"
                  >
                    Join the Club
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab("events")}
                    className="px-8 py-4 bg-white hover:bg-blue-50 backdrop-blur-sm rounded-xl font-semibold text-lg text-blue-700 border border-blue-300 transition-all"
                  >
                    View Events
                  </motion.button>
                </motion.div>

                {/* Feature Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto"
                >
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -5 }}
                      className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-200 hover:border-blue-400 transition-all shadow-sm hover:shadow-md"
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 mx-auto`}
                      >
                        <feature.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <h3 className="text-lg font-semibold text-slate-800">
                        {feature.label}
                      </h3>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Scroll Indicator */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
              >
                <div className="w-6 h-10 border-2 border-blue-500 rounded-full flex justify-center p-2">
                  <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-1.5 bg-blue-600 rounded-full"
                  />
                </div>
              </motion.div>
            </section>

            {/* Projects Section */}
            <section className="relative py-32 px-6">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-16"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 backdrop-blur-sm rounded-full border border-blue-300 mb-6">
                    <Server className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-700">Our Work</span>
                  </div>
                  <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 bg-clip-text text-transparent">
                    Featured Projects
                  </h2>
                  <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    Explore our latest cloud solutions built with AWS services
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project, index) => (
                    <ProjectCard key={index} {...project} index={index} />
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-32 px-6">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-400 rounded-3xl blur-xl opacity-30"></div>
                  <div className="relative bg-gradient-to-br from-white to-blue-50 backdrop-blur-sm p-12 rounded-3xl border border-blue-300 shadow-xl">
                    <Zap className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
                      Ready to Build the Future?
                    </h2>
                    <p className="text-xl text-slate-700 mb-8">
                      Join us for workshops, hackathons, and cloud certification
                      prep sessions.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-blue-300/50 transition-all"
                    >
                      Get Started Today
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === "events" && (
          <motion.div
            key="events"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Events Hero */}
            <section className="relative py-24 px-6">
              <div className="max-w-7xl mx-auto text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 backdrop-blur-sm rounded-full border border-blue-300"
                >
                  <CalendarDays className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-700">Club Events</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent"
                >
                  Events
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-xl text-slate-600 max-w-2xl mx-auto"
                >
                  Workshops, study groups, hackathons, and more — come learn,
                  build, and grow with us.
                </motion.p>
              </div>
            </section>

            {/* Upcoming Events */}
            <section className="relative pb-20 px-6">
              <div className="max-w-7xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3"
                >
                  <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-700 rounded-full inline-block" />
                  Upcoming Events
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                  {upcomingEvents.map((event, index) => (
                    <EventCard key={index} {...event} index={index} />
                  ))}
                </div>
              </div>
            </section>

            {/* Past Events */}
            <section className="relative pb-32 px-6">
              <div className="max-w-7xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3"
                >
                  <span className="w-2 h-8 bg-gradient-to-b from-slate-300 to-slate-400 rounded-full inline-block" />
                  Past Events
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                  {pastEvents.map((event, index) => (
                    <EventCard
                      key={index}
                      {...event}
                      index={index}
                      isPast={true}
                    />
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-blue-200">
        <div className="max-w-7xl mx-auto text-center text-slate-600">
          <p>&copy; 2026 AWS Cloud Club at Penn State. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
