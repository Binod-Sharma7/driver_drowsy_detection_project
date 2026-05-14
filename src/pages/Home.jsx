import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { onValue, ref } from "firebase/database";

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

  const [deviceStatus, setDeviceStatus] = useState(false);

  const [state, setState] = useState(1);
  const [timestamp, setTimestamp] = useState(null);

  const [motor, setMotor] = useState(false);
  const [led, setLed] = useState(false);
  const [buzzer, setBuzzer] = useState(false);

  const [lastSeen, setLastSeen] = useState(Date.now());
  const [history, setHistory] = useState([]);

  // Format Timestamp to Readable Time
  const formatTimestamp = (ts) => {
    if (!ts) return "N/A";
    const date = new Date(ts);
    if (isNaN(date.getTime())) return ts;

    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Get hardware condition text with your requested changes
  const getConditionText = (s) => {
    if (s === 0) return "Motor OFF • LED OFF • Buzzer OFF";
    if (s === 1) return "Motor ON • LED OFF • Buzzer OFF";
    if (s === 2) return "Motor ON • LED Blinks Fast • Buzzer Beeps Fast";
    if (s === 3) return "Motor OFF • LED Blinking • Buzzer Beeping";
    return "Unknown State";
  };

  // FIREBASE LISTENER
  useEffect(() => {

    const dataRef = ref(db, "/drowsiness_system");

    const unsubscribe = onValue(dataRef, (snapshot) => {

      const data = snapshot.val();
      if (!data) return;

      const currentState = Number(data.state);

      setState(currentState);
      setTimestamp(data.timestamp);

      // State Conditions
      if (currentState === 0) {
        setMotor(false);
        setLed(false);
        setBuzzer(false);
      } else if (currentState === 1) {
        setMotor(true);
        setLed(false);
        setBuzzer(false);
      } else if (currentState === 2) {
        setMotor(true);
        setLed(true);
        setBuzzer(true);
      } else if (currentState === 3) {
        setMotor(false);
        setLed(true);
        setBuzzer(true);
      }

      // Add to history (last 10)
      setHistory((prev) => {
        const newEntry = {
          state: currentState,
          timestamp: data.timestamp || new Date().toISOString(),
        };
        return [newEntry, ...prev].slice(0, 10);
      });

      setLastSeen(Date.now());
    });

    return () => unsubscribe();
  }, []);

  // DEVICE STATUS
  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Date.now() - lastSeen;
      setDeviceStatus(diff <= 30000);
    }, 500);

    return () => clearInterval(interval);
  }, [lastSeen]);

  const getDriverStatus = () => {
    if (state === 0) return "System Idle";
    if (state === 1) return "Driver Normal";
    if (state === 2) return "Warning Detected";
    return "Drowsiness Detected";
  };

  const getStatusColor = () => {
    if (state === 0) return "text-gray-400";
    if (state === 1) return "text-green-400";
    if (state === 2) return "text-yellow-300";
    return "text-red-400";
  };

  const card = "bg-white/[0.04] border border-white/[0.08] backdrop-blur-2xl rounded-3xl";

  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden">

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
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <ShieldCheck size={28} className="text-cyan-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Driver Drowsiness Detection</h1>
                <p className="text-gray-400 mt-2">ESP32 + Firebase Realtime Monitoring</p>
              </div>
            </div>

            <div className={`flex items-center gap-4 px-5 py-4 rounded-2xl border ${deviceStatus ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"}`}>
              {deviceStatus ? <Wifi className="text-green-400" /> : <WifiOff className="text-red-400" />}
              <div>
                <h2 className="font-semibold">{deviceStatus ? "Device Online" : "Device Offline"}</h2>
                <p className="text-sm text-gray-400">Realtime Sync Active</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid xl:grid-cols-3 gap-5 mt-5">

          <div className="xl:col-span-2 space-y-5">

            {/* STATUS ROW */}
            <div className="grid md:grid-cols-2 gap-5">
              {/* DRIVER STATUS */}
              <motion.div whileHover={{ y: -3 }} className={`${card} p-6`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400">Driver Status</p>
                    <h1 className={`text-3xl font-bold mt-3 ${getStatusColor()}`}>
                      {getDriverStatus()}
                    </h1>
                  </div>
                  <div className={`w-16 h-16 rounded-3xl flex items-center justify-center ${state === 0 ? "bg-gray-500/10" : state === 1 ? "bg-green-500/10" : state === 2 ? "bg-yellow-500/10" : "bg-red-500/10"}`}>
                    <AlertTriangle size={32} className={state === 0 ? "text-gray-400" : state === 1 ? "text-green-400" : state === 2 ? "text-yellow-300" : "text-red-400"} />
                  </div>
                </div>
                <div className="mt-6 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${state === 0 ? "bg-gray-400 w-0" : state === 1 ? "bg-green-400 w-1/3" : state === 2 ? "bg-yellow-300 w-2/3" : "bg-red-400 w-full"}`} />
                </div>
              </motion.div>

              {/* MOTOR STATUS */}
              <motion.div whileHover={{ y: -3 }} className={`${card} p-6`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400">Vehicle Motor</p>
                    <h1 className={`text-3xl font-bold mt-3 ${motor ? "text-cyan-300" : "text-red-400"}`}>
                      {motor ? "Running" : "Stopped"}
                    </h1>
                  </div>
                  <div className={`w-16 h-16 rounded-3xl flex items-center justify-center ${motor ? "bg-cyan-500/10" : "bg-red-500/10"}`}>
                    <Car size={32} className={motor ? "text-cyan-400" : "text-red-400"} />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* LIVE DASHBOARD */}
            <motion.div whileHover={{ y: -3 }} className={`${card} p-7`}>
              <div className="flex items-center gap-3">
                <Activity className="text-cyan-400" />
                <h1 className="text-xl font-semibold">Live Dashboard</h1>
              </div>
              <p className="text-sm text-gray-400 mt-2">Realtime hardware monitoring from Firebase (Last 10 Records)</p>

              <div className="mt-6 bg-white/[0.03] rounded-2xl border border-white/[0.05] overflow-hidden">
                <div className="max-h-[420px] overflow-y-auto">
                  {history.length === 0 ? (
                    <p className="text-gray-500 text-center py-12">Waiting for system data...</p>
                  ) : (
                    <table className="w-full">
                      <thead className="bg-white/[0.04] sticky top-0">
                        <tr>
                          <th className="text-left p-4 text-gray-400">No.</th>
                          <th className="text-left p-4 text-gray-400">Hardware Status</th>
                          <th className="text-left p-4 text-gray-400">Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.06]">
                        {history.map((entry, index) => (
                          <tr key={index} className="hover:bg-white/[0.01]">
                            <td className="p-4 text-gray-500 font-medium">#{history.length - index}</td>
                            <td className="p-4 text-cyan-300 font-medium">
                              {getConditionText(entry.state)}
                            </td>
                            <td className="p-4 text-sm text-gray-400">
                              {formatTimestamp(entry.timestamp)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </motion.div>

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-5">
            {/* BUZZER */}
            <motion.div whileHover={{ y: -3 }} className={`${card} p-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400">Buzzer</p>
                  <h1 className={`text-2xl font-bold mt-3 ${buzzer ? "text-red-400" : "text-gray-300"}`}>
                    {buzzer ? "ACTIVE" : "OFF"}
                  </h1>
                </div>
                <Volume2 className={buzzer ? (state === 3 ? "text-red-400 animate-pulse" : "text-yellow-300") : "text-gray-500"} />
              </div>
            </motion.div>

            {/* LED */}
            <motion.div whileHover={{ y: -3 }} className={`${card} p-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400">Hazard LED</p>
                  <h1 className={`text-2xl font-bold mt-3 ${led ? "text-yellow-300" : "text-gray-300"}`}>
                    {led ? "ACTIVE" : "OFF"}
                  </h1>
                </div>
                <Siren className={led ? (state === 3 ? "text-red-400 animate-pulse" : "text-yellow-300") : "text-gray-500"} />
              </div>
            </motion.div>

            {/* SYSTEM STATE */}
            <motion.div whileHover={{ y: -3 }} className={`${card} p-6`}>
              <div className="flex items-center gap-3">
                <Power className="text-cyan-400" />
                <h1 className="text-lg font-semibold">System State</h1>
              </div>
              <div className="mt-5 space-y-4">
                <div className="flex justify-between"><span className="text-gray-400">Motor</span><span className={motor ? "text-cyan-300" : "text-red-400"}>{motor ? "ON" : "OFF"}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">LED</span><span className={led ? "text-yellow-300" : "text-gray-400"}>{led ? "ON" : "OFF"}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Buzzer</span><span className={buzzer ? "text-red-400" : "text-gray-400"}>{buzzer ? "ON" : "OFF"}</span></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}