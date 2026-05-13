import React from "react";
import { motion } from "framer-motion";

import {
  ShieldCheck,
  Eye,
  Cpu,
  BellRing,
  Database,
  Wifi,
  Car,
  Activity,
} from "lucide-react";

export default function About() {
  const features = [
    {
      icon: <Eye size={18} />,
      title: "IR Eye Blink Sensor",
      description:
        "Detects eye closure and blinking patterns in real time using infrared sensing technology.",
    },

    {
      icon: <Cpu size={18} />,
      title: "ESP32 Processing",
      description:
        "ESP32 handles sensor processing, alert generation, and real-time communication efficiently.",
    },

    {
      icon: <BellRing size={18} />,
      title: "Instant Alerts",
      description:
        "The system activates a buzzer and hazard light immediately when drowsiness is detected.",
    },

    {
      icon: <Wifi size={18} />,
      title: "Realtime Monitoring",
      description:
        "Firebase Realtime Database enables live monitoring through the web dashboard.",
    },
  ];

  const technologies = [
    "ESP32",
    "Firebase",
    "React",
    "Tailwind CSS",
    "IR Sensor",
    "Realtime Database",
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden">
      {/* BACKGROUND */}
      <div className="fixed top-[-120px] left-[-120px] w-[300px] h-[300px] bg-cyan-500/10 blur-[120px]" />
      <div className="fixed bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-blue-500/10 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-8">
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl rounded-3xl p-6 md:p-8"
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:items-center justify-between">
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
                    About The Project
                  </h1>

                  <p className="text-sm text-gray-400 mt-1">
                    Smart Embedded Driver Safety System
                  </p>
                </div>
              </div>

              <p className="text-gray-300 leading-7 text-[15px]">
                Driver fatigue is one of the major causes of
                road accidents during long-distance and
                night-time driving. The Driver Drowsiness
                Detection System is designed to monitor driver
                alertness using an IR eye blink sensor and
                provide instant warnings whenever signs of
                drowsiness are detected.
              </p>

              <p className="text-gray-400 leading-7 text-[15px] mt-4">
                The project combines embedded systems,
                realtime cloud monitoring, and intelligent
                alert mechanisms to create a low-cost and
                practical road safety solution using ESP32 and
                Firebase technologies.
              </p>
            </div>

            {/* RIGHT */}
            <div className="grid grid-cols-2 gap-4 min-w-[280px]">
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-5">
                <Car
                  size={20}
                  className="text-cyan-400"
                />

                <h2 className="text-xl font-semibold mt-4">
                  Real-Time
                </h2>

                <p className="text-sm text-gray-400 mt-2 leading-6">
                  Live monitoring of driver and vehicle
                  activity.
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
                <Activity
                  size={20}
                  className="text-cyan-400"
                />

                <h2 className="text-xl font-semibold mt-4">
                  Smart Alerts
                </h2>

                <p className="text-sm text-gray-400 mt-2 leading-6">
                  Immediate buzzer and hazard activation.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FEATURES */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-2xl font-bold">
                Core Features
              </h1>

              <p className="text-sm text-gray-400 mt-1">
                Main technologies and functionalities used
                in the system
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl rounded-2xl p-5"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  {feature.icon}
                </div>

                <h2 className="text-lg font-semibold mt-4">
                  {feature.title}
                </h2>

                <p className="text-sm text-gray-400 leading-6 mt-3">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* OVERVIEW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl rounded-3xl p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Database
                  size={18}
                  className="text-cyan-400"
                />
              </div>

              <div>
                <h1 className="text-xl font-semibold">
                  System Workflow
                </h1>

                <p className="text-sm text-gray-400">
                  Embedded monitoring process
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                "IR sensor continuously monitors eye blinking activity.",
                "ESP32 processes sensor data in realtime.",
                "Drowsiness triggers buzzer and hazard light alerts.",
                "Firebase sends live data to the monitoring dashboard.",
              ].map((step, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-start"
                >
                  <div className="min-w-[28px] h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-xs text-cyan-300 font-semibold">
                    {index + 1}
                  </div>

                  <p className="text-sm text-gray-300 leading-6">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl rounded-3xl p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Cpu
                  size={18}
                  className="text-cyan-400"
                />
              </div>

              <div>
                <h1 className="text-xl font-semibold">
                  Technologies Used
                </h1>

                <p className="text-sm text-gray-400">
                  Main tools and frameworks
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {technologies.map((tech, index) => (
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  key={index}
                  className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-sm text-cyan-300"
                >
                  {tech}
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-white/[0.06]">
              <p className="text-sm text-gray-400 leading-7">
                The system focuses on providing a practical,
                lightweight, and cost-effective solution for
                improving road safety using realtime embedded
                monitoring and smart alert mechanisms.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}