import React, { useEffect, useState } from "react";
import { app } from "../firebase";
import { getDatabase, onValue, ref } from "firebase/database";

import {
  Activity,
  ShieldCheck,
  Wifi,
  WifiOff,
  Volume2,
  Siren,
  Car,
  AlertTriangle,
  Power,
} from "lucide-react";

import { motion } from "framer-motion";

export default function Home() {
  const db = getDatabase(app);

  const [deviceStatus, setDeviceStatus] = useState(false);

  const [state, setState] = useState(1);
  const [timestamp, setTimestamp] = useState(null);

  const [motor, setMotor] = useState(false);
  const [led, setLed] = useState(false);
  const [buzzer, setBuzzer] = useState(false);

  const [lastSeen, setLastSeen] = useState(Date.now());

  // FIREBASE LISTENER
  useEffect(() => {
    const dataRef = ref(db, "/users");

    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) return;

      const currentState = Number(data.state);

      setState(currentState);
      setTimestamp(data.timestamp);

      // STATE CONDITIONS
      if (currentState === 1) {
        setMotor(true);
        setLed(false);
        setBuzzer(false);
      }

      else if (currentState === 2) {
        setMotor(true);
        setLed(true);
        setBuzzer(true);
      }

      else if (currentState === 3) {
        setMotor(false);
        setLed(true);
        setBuzzer(true);
      }

      setLastSeen(Date.now());
    });

    return () => unsubscribe();
  }, []);

  // DEVICE STATUS
  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Date.now() - lastSeen;

      setDeviceStatus(diff <= 2000);
    }, 500);

    return () => clearInterval(interval);
  }, [lastSeen]);

  // DRIVER STATUS TEXT
  const getDriverStatus = () => {
    if (state === 1) return "Driver Normal";

    if (state === 2) return "Warning Detected";

    return "Drowsiness Detected";
  };

  // STATUS COLORS
  const getStatusColor = () => {
    if (state === 1) return "text-green-400";

    if (state === 2) return "text-yellow-300";

    return "text-red-400";
  };

  // LIVE DASHBOARD STATUS TEXT
  const getLiveDataText = () => {
    if (state === 1) {
      return "Motor ON • LED OFF • Buzzer OFF";
    }

    if (state === 2) {
      return "Motor ON • LED Blinking • Buzzer Blinking";
    }

    return "Motor OFF • LED Fast Blink • Buzzer Fast Blink";
  };

  // CARD STYLE
  const card =
    "bg-white/[0.04] border border-white/[0.08] backdrop-blur-2xl rounded-3xl";

  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden">
      {/* BACKGROUND */}
      <div className="fixed top-[-120px] left-[-120px] w-[350px] h-[350px] bg-cyan-500/10 blur-[120px]" />

      <div className="fixed bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-blue-500/10 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${card} p-6 md:p-7`}
        >
          <div className="flex flex-col lg:flex-row justify-between gap-6">

            {/* LEFT */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <ShieldCheck
                  size={28}
                  className="text-cyan-400"
                />
              </div>

              <div>
                <h1 className="text-3xl font-bold">
                  Driver Drowsiness Detection
                </h1>

                <p className="text-gray-400 mt-2">
                  ESP32 + Firebase Realtime Monitoring
                </p>
              </div>
            </div>

            {/* ONLINE STATUS */}
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
                  {deviceStatus
                    ? "Device Online"
                    : "Device Offline"}
                </h2>

                <p className="text-sm text-gray-400">
                  Realtime Sync Active
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid xl:grid-cols-3 gap-5 mt-5">

          {/* LEFT */}
          <div className="xl:col-span-2 space-y-5">

            {/* STATUS ROW */}
            <div className="grid md:grid-cols-2 gap-5">

              {/* DRIVER STATUS */}
              <motion.div
                whileHover={{ y: -3 }}
                className={`${card} p-6`}
              >
                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-gray-400">
                      Driver Status
                    </p>

                    <h1
                      className={`text-3xl font-bold mt-3 ${getStatusColor()}`}
                    >
                      {getDriverStatus()}
                    </h1>
                  </div>

                  <div
                    className={`w-16 h-16 rounded-3xl flex items-center justify-center ${
                      state === 1
                        ? "bg-green-500/10"
                        : state === 2
                        ? "bg-yellow-500/10"
                        : "bg-red-500/10"
                    }`}
                  >
                    <AlertTriangle
                      size={32}
                      className={
                        state === 1
                          ? "text-green-400"
                          : state === 2
                          ? "text-yellow-300"
                          : "text-red-400"
                      }
                    />
                  </div>
                </div>

                <div className="mt-6 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      state === 1
                        ? "bg-green-400 w-1/3"
                        : state === 2
                        ? "bg-yellow-300 w-2/3"
                        : "bg-red-400 w-full"
                    }`}
                  />
                </div>
              </motion.div>

              {/* MOTOR STATUS */}
              <motion.div
                whileHover={{ y: -3 }}
                className={`${card} p-6`}
              >
                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-gray-400">
                      Vehicle Motor
                    </p>

                    <h1
                      className={`text-3xl font-bold mt-3 ${
                        motor
                          ? "text-cyan-300"
                          : "text-red-400"
                      }`}
                    >
                      {motor ? "Running" : "Stopped"}
                    </h1>
                  </div>

                  <div
                    className={`w-16 h-16 rounded-3xl flex items-center justify-center ${
                      motor
                        ? "bg-cyan-500/10"
                        : "bg-red-500/10"
                    }`}
                  >
                    <Car
                      size={32}
                      className={
                        motor
                          ? "text-cyan-400"
                          : "text-red-400"
                      }
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* LIVE DASHBOARD */}
            <motion.div
              whileHover={{ y: -3 }}
              className={`${card} p-7`}
            >
              <div className="flex items-center gap-3">
                <Activity className="text-cyan-400" />

                <h1 className="text-xl font-semibold">
                  Live Dashboard
                </h1>
              </div>

              <p className="text-sm text-gray-400 mt-2">
                Realtime hardware monitoring from Firebase
              </p>

              <div className="mt-6 grid md:grid-cols-2 gap-5">

                {/* CURRENT STATUS */}
                <div className="bg-white/[0.03] rounded-2xl p-5 border border-white/[0.05]">
                  <p className="text-gray-500 text-sm">
                    Current Hardware State
                  </p>

                  <h1 className="text-lg font-semibold mt-3 text-cyan-300 leading-8">
                    {getLiveDataText()}
                  </h1>
                </div>

                {/* TIMESTAMP */}
                <div className="bg-white/[0.03] rounded-2xl p-5 border border-white/[0.05]">
                  <p className="text-gray-500 text-sm">
                    Last Firebase Update
                  </p>

                  <h1 className="text-lg font-semibold mt-3 text-green-400 break-all">
                    {timestamp || "Waiting for data..."}
                  </h1>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT */}
          <div className="space-y-5">

            {/* BUZZER */}
            <motion.div
              whileHover={{ y: -3 }}
              className={`${card} p-6`}
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-gray-400">
                    Buzzer
                  </p>

                  <h1
                    className={`text-2xl font-bold mt-3 ${
                      buzzer
                        ? "text-red-400"
                        : "text-gray-300"
                    }`}
                  >
                    {buzzer ? "ACTIVE" : "OFF"}
                  </h1>
                </div>

                <Volume2
                  className={
                    buzzer
                      ? state === 3
                        ? "text-red-400 animate-pulse"
                        : "text-yellow-300"
                      : "text-gray-500"
                  }
                />
              </div>
            </motion.div>

            {/* LED */}
            <motion.div
              whileHover={{ y: -3 }}
              className={`${card} p-6`}
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-gray-400">
                    Hazard LED
                  </p>

                  <h1
                    className={`text-2xl font-bold mt-3 ${
                      led
                        ? "text-yellow-300"
                        : "text-gray-300"
                    }`}
                  >
                    {led ? "ACTIVE" : "OFF"}
                  </h1>
                </div>

                <Siren
                  className={
                    led
                      ? state === 3
                        ? "text-red-400 animate-pulse"
                        : "text-yellow-300"
                      : "text-gray-500"
                  }
                />
              </div>
            </motion.div>

            {/* SYSTEM STATE */}
            <motion.div
              whileHover={{ y: -3 }}
              className={`${card} p-6`}
            >
              <div className="flex items-center gap-3">
                <Power className="text-cyan-400" />

                <h1 className="text-lg font-semibold">
                  System State
                </h1>
              </div>

              <div className="mt-5 space-y-4">

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    Motor
                  </span>

                  <span
                    className={
                      motor
                        ? "text-cyan-300"
                        : "text-red-400"
                    }
                  >
                    {motor ? "ON" : "OFF"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    LED
                  </span>

                  <span
                    className={
                      led
                        ? "text-yellow-300"
                        : "text-gray-400"
                    }
                  >
                    {led ? "ON" : "OFF"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    Buzzer
                  </span>

                  <span
                    className={
                      buzzer
                        ? "text-red-400"
                        : "text-gray-400"
                    }
                  >
                    {buzzer ? "ON" : "OFF"}
                  </span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}