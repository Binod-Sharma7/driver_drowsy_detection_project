import React, { useEffect, useState } from "react";
import { app } from "../firebase";
import { getDatabase, onValue, ref } from "firebase/database";

import {
  Activity,
  Car,
  ShieldCheck,
  Siren,
  Volume2,
  Wifi,
  WifiOff,
  Gauge,
  MoonStar,
} from "lucide-react";

import { motion } from "framer-motion";

export default function Home() {
  const db = getDatabase(app);

  const [deviceStatus, setDeviceStatus] = useState(false);

  const [speed, setSpeed] = useState(0);
  const [buzzer, setBuzzer] = useState(false);
  const [hazard, setHazard] = useState(false);
  const [motor, setMotor] = useState(false);

  const [lastSeen, setLastSeen] = useState(Date.now());
  const [now, setNow] = useState(Date.now());

  // 🔥 Firebase listener
  useEffect(() => {
    const dataRef = ref(db, "/users");

    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      setSpeed((data.motorspeed * 0.005652).toFixed(1));
      setBuzzer(data.buzzer);
      setHazard(data.hazardlight);
      setMotor(data.motorspeed > 0);

      // heartbeat update
      setLastSeen(Date.now());
    });
  }, []);

  // 🔥 online/offline (2 sec rule)
  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Date.now() - lastSeen;
      setDeviceStatus(diff <= 2000);
    }, 500);

    return () => clearInterval(interval);
  }, [lastSeen]);

  // 🔥 live timer for UI
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 🔥 last updated text
  const getLastUpdatedText = () => {
    const diff = now - lastSeen;

    if (diff < 1000) return "Just now";
    if (diff < 60000) return `${Math.floor(diff / 1000)} sec ago`;
    if (diff < 3600000) return `${Math.floor(diff / 60000)} min ago`;

    return new Date(lastSeen).toLocaleTimeString();
  };

  const card =
    "bg-white/[0.04] border border-white/[0.08] backdrop-blur-2xl rounded-3xl";

  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden">

      {/* glow */}
      <div className="fixed top-[-120px] left-[-120px] w-[350px] h-[350px] bg-cyan-500/10 blur-[120px]" />
      <div className="fixed bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-blue-500/10 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-6">

        {/* HEADER */}
        <motion.div className={`${card} p-6 md:p-7`}>
          <div className="flex flex-col lg:flex-row justify-between gap-6">

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <ShieldCheck size={28} className="text-cyan-400" />
              </div>

              <div>
                <h1 className="text-3xl font-bold">
                  Driver Drowsiness Detection
                </h1>
                <p className="text-gray-400 mt-2">
                  ESP32 + Firebase Realtime System
                </p>
              </div>
            </div>

            {/* DEVICE STATUS */}
            <div
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl border ${
                deviceStatus
                  ? "bg-green-500/10 border-green-500/20"
                  : "bg-red-500/10 border-red-500/20"
              }`}
            >
              {deviceStatus ? (
                <Wifi className="text-green-400" />
              ) : (
                <WifiOff className="text-red-400" />
              )}

              <div>
                <h2 className="font-semibold">
                  {deviceStatus ? "Device Online" : "Device Offline"}
                </h2>
                <p className="text-sm text-gray-400">
                  Live Sync Status
                </p>
              </div>
            </div>

          </div>
        </motion.div>

        {/* GRID */}
        <div className="grid xl:grid-cols-3 gap-5 mt-5">

          {/* LEFT */}
          <div className="xl:col-span-2 space-y-5">

            <div className="grid md:grid-cols-2 gap-5">

              {/* DRIVER STATUS */}
              <motion.div className={`${card} p-6`}>
                <p className="text-gray-400">Driver Status</p>

                <h1
                  className={`text-3xl font-bold mt-3 ${
                    hazard || buzzer
                      ? "text-red-400"
                      : "text-green-400"
                  }`}
                >
                  {hazard
                    ? "Drowsy (Hazard ON)"
                    : buzzer
                    ? "Drowsy"
                    : "Normal"}
                </h1>

                <div className="mt-6 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      hazard || buzzer
                        ? "bg-red-400 w-full"
                        : "bg-green-400 w-1/3"
                    }`}
                  />
                </div>
              </motion.div>

              {/* VEHICLE */}
              <motion.div className={`${card} p-6`}>
                <p className="text-gray-400">Vehicle Status</p>
                <h1 className="text-3xl font-bold mt-3 text-cyan-300">
                  {motor ? "Running" : "Stopped"}
                </h1>
              </motion.div>

            </div>

            {/* SPEED */}
            <motion.div className={`${card} p-7`}>
              <p className="text-gray-400">Vehicle Speed</p>

              <div className="flex items-end gap-3 mt-4">
                <h1 className="text-6xl font-bold">{speed}</h1>
                <span className="text-gray-400 mb-2">km/h</span>
              </div>
            </motion.div>

          </div>

          {/* RIGHT */}
          <div className="space-y-5">

            {/* BUZZER */}
            <motion.div className={`${card} p-6`}>
              <p className="text-gray-400">Buzzer</p>
              <h1 className={`text-2xl font-bold mt-3 ${
                buzzer ? "text-red-400" : "text-gray-300"
              }`}>
                {buzzer ? "ACTIVE" : "OFF"}
              </h1>
            </motion.div>

            {/* HAZARD */}
            <motion.div className={`${card} p-6`}>
              <p className="text-gray-400">Hazard</p>
              <h1 className={`text-2xl font-bold mt-3 ${
                hazard ? "text-yellow-300" : "text-gray-300"
              }`}>
                {hazard ? "ACTIVE" : "OFF"}
              </h1>
            </motion.div>

            {/* LIVE MONITORING */}
            <motion.div className={`${card} p-6`}>
              <div className="flex items-center gap-3">
                <Activity className="text-cyan-400" />
                <h1 className="text-lg font-semibold">
                  Live Monitoring
                </h1>
              </div>

              <p className="text-xs text-gray-500 mt-2">
                Firebase Realtime System Active
              </p>

              {/* 🔥 LAST UPDATED */}
              <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-xs text-gray-500">
                  Last Updated
                </p>

                <p className="text-sm text-cyan-300 mt-2">
                  {getLastUpdatedText()}
                </p>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </div>
  );
}