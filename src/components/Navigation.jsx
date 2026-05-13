import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  Shield,
  Home,
  Info,
  Users,
  Menu,
  X,
} from "lucide-react";

export default function Navigation() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: <Home size={16} />,
    },
    {
      name: "About",
      path: "/about",
      icon: <Info size={16} />,
    },
    {
      name: "Team",
      path: "/team",
      icon: <Users size={16} />,
    },
  ];

  return (
    <>
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 px-4 md:px-8 pt-4">
        <motion.nav
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-7xl mx-auto"
        >
          <div className="bg-[#0b1120]/70 border border-white/[0.08] backdrop-blur-2xl rounded-2xl px-5 md:px-6 h-[68px] flex items-center justify-between shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
            {/* LOGO */}
            <Link
              to="/"
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Shield
                  size={18}
                  className="text-cyan-400"
                />
              </div>

              <div>
                <h1 className="text-sm md:text-base font-semibold tracking-wide text-white">
                  DDMS
                </h1>

                <p className="text-[11px] text-gray-400">
                  Smart Safety System
                </p>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((item, index) => {
                const active =
                  location.pathname === item.path;

                return (
                  <Link
                    key={index}
                    to={item.path}
                  >
                    <motion.div
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                        active
                          ? "bg-cyan-500 text-black shadow-[0_0_20px_rgba(34,211,238,0.35)]"
                          : "text-gray-300 hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      {item.icon}
                      {item.name}
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* RIGHT STATUS */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-500/10 border border-green-500/20">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

                <span className="text-xs text-green-300 font-medium">
                  Live
                </span>
              </div>
            </div>

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white"
            >
              {open ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="fixed top-[88px] left-0 w-full z-40 px-4"
          >
            <div className="max-w-7xl mx-auto bg-[#0b1120]/95 border border-white/[0.08] backdrop-blur-2xl rounded-2xl p-3 shadow-2xl">
              <div className="flex flex-col gap-1">
                {navLinks.map((item, index) => {
                  const active =
                    location.pathname === item.path;

                  return (
                    <Link
                      key={index}
                      to={item.path}
                      onClick={() => setOpen(false)}
                    >
                      <motion.div
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                          active
                            ? "bg-cyan-500 text-black"
                            : "text-gray-300 hover:bg-white/[0.04]"
                        }`}
                      >
                        {item.icon}
                        {item.name}
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}