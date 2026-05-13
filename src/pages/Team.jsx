import React from "react";
import { motion } from "framer-motion";

import {
  GraduationCap,
  Cpu,
  Code2,
  Database,
  FileText,
  Mail,
  Github,
  Linkedin,
  ShieldCheck,
  Instagram,
  Facebook,
  BookOpen,
  CircuitBoard,
} from "lucide-react";

export default function Team() {
  const supervisor = {
    name: "Er. Raj Kiran Chhatkuli",
    role: "Project Supervisor",
    image:
      "/photo/ch.jpeg",
    description:
      "Guiding the project development, embedded system implementation, and technical research activities.",
      facebook:"https://www.facebook.com/RaazKeyRun"
  };

  const members = [
    {
      name: "Binod Sharma",
      role: "Frontend & database Developer",
      image:
        "/photo/binod.jpg",
      description:
        "Worked on React dashboard UI, Firebase integration,and real-time data visualization for monitoring driver drowsiness.",
      icon: <Code2 size={18} />,
      facebook:"https://www.facebook.com/dangerboy.binod.9/"
    },

    {
      name: "Chhatra Raj Phulara",
      role: "Hardware Engineer",
      image:
        "/photo/chhatra.jpeg",
      description:
        "Handled circuit design, IR eye blink sensor integration,esp32 coding and embedded hardware implementation.",
      icon: <Cpu size={18} />,
      whatsapp:"bjbj"
    },

    {
      name: "Gaurav Pant",
      role: "Documentation & Presentation",
      image:
        "/photo/gp.jpeg",
      description:
        "Handled report writing, proposal preparation, presentation design, and overall project documentation tasks.",
      icon: <FileText size={18} />,
      facebook:"https://www.facebook.com/gaurav.pant.7509836"
    },

    {
      name: "Gaurab Chand Bohora",
      role: "Embedded developer",
      image:
        "/photo/gcb.jpeg",
      description:
        "Realtime Monitoring and Esp 32 communication",
      icon: <CircuitBoard size={18} />,
      facebook:"https://www.facebook.com/gau.rab.187895"
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden">
      {/* BACKGROUND */}
      <div className="fixed top-[-120px] left-[-120px] w-[320px] h-[320px] bg-cyan-500/10 blur-[120px]" />
      <div className="fixed bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-blue-500/10 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-8">
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl rounded-3xl p-6 md:p-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* LEFT */}
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <ShieldCheck
                    size={20}
                    className="text-cyan-400"
                  />
                </div>

                <div>
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                    Project Team
                  </h1>

                  <p className="text-sm text-gray-400 mt-1">
                    Driver Drowsiness Detection System
                  </p>
                </div>
              </div>

              <p className="text-[15px] leading-7 text-gray-300">
                Meet the team behind the Driver Drowsiness
                Detection System project. The project combines
                embedded systems, realtime monitoring, cloud
                technologies, and intelligent alert mechanisms
                to improve driver safety and reduce fatigue-
                related road accidents.
              </p>
            </div>

            {/* RIGHT */}
            <div className="grid grid-cols-2 gap-4 min-w-[280px]">
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-5">
                <h2 className="text-3xl font-bold text-cyan-300">
                  4+
                </h2>

                <p className="text-sm text-gray-400 mt-2">
                  Team Members
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
                <h2 className="text-3xl font-bold text-cyan-300">
                  ESP32
                </h2>

                <p className="text-sm text-gray-400 mt-2">
                  Embedded Platform
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SUPERVISOR */}
        <div className="mt-6">
          <div className="mb-5">
            <h1 className="text-2xl font-bold">
              Supervisor
            </h1>

            <p className="text-sm text-gray-400 mt-1">
              Academic guidance and technical supervision
            </p>
          </div>

          <motion.div
            whileHover={{ y: -2 }}
            className="bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl rounded-3xl overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
              {/* IMAGE */}
              <div className="h-full">
                <img
                  src={supervisor.image}
                  alt={supervisor.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="p-6 md:p-7 flex flex-col justify-center">
                <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-5">
                  <GraduationCap
                    size={20}
                    className="text-cyan-400"
                  />
                </div>

                <h1 className="text-2xl font-bold">
                  {supervisor.name}
                </h1>

                <p className="text-cyan-300 text-sm mt-2">
                  {supervisor.role}
                </p>

                <p className="text-gray-400 leading-7 text-[15px] mt-5 max-w-2xl">
                  {supervisor.description}
                </p>

                {/* SOCIALS */}
                <div className="flex gap-3 mt-6">
                  <div className="flex gap-3 mt-5">
                    <a
                      href={supervisor.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-all duration-300"
                    >
                      <Facebook size={15} />
                    </a>
                  </div>


                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* TEAM MEMBERS */}
        <div className="mt-8">
          <div className="mb-5">
            <h1 className="text-2xl font-bold">
              Core Members
            </h1>

            <p className="text-sm text-gray-400 mt-1">
              Main contributors involved in the project
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {members.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -3 }}
                className="bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl rounded-3xl overflow-hidden"
              >
                {/* IMAGE */}
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-[250px] object-cover"
                  />

                  <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-cyan-300">
                    {member.icon}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <h1 className="text-lg font-semibold">
                    {member.name}
                  </h1>

                  <p className="text-cyan-300 text-sm mt-1">
                    {member.role}
                  </p>

                  <p className="text-sm text-gray-400 leading-6 mt-4">
                    {member.description}
                  </p>

                  {/* SOCIALS */}
                  <div className="flex gap-3 mt-5">
                    <div className="flex gap-3 mt-5">
                      <a
                        href={member.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-all duration-300"
                      >
                        <Facebook size={15} />
                      </a>
                    </div>


                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}