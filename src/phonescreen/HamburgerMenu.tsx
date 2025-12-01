"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrickWallFire, Podcast, School, Cable,ShieldUser,NotebookTabs } from "lucide-react";

import Link from "next/link";
const data = [
  {
      title: "Campaign",
      url: "/LeadStatusClone",
      icon: <BrickWallFire size={16}/>,
    },
    {
     title: "Customer",
      url: "/customer",
      icon: <Podcast size={16}/>,
    },
    {
     title: "FollowUp",
      url: "/FollowUp",
      icon: <School size={16}/>,
    },
     {
     title: "Status Type",
      url: "/Status-Type",
      icon: <NotebookTabs size={16}/>,
    },
    {
     title: "Contact",
      url: "/Contact",
      icon:  <Cable size={16}/>,
    },
    {
     title: "Task",
      url: "/Task",
      icon: <ShieldUser size={16}/>,
    },
   
]
export default function MobileHamburger() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click + ESC
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("mousedown", handleClick);
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  return (
    <>
    
    <div className="md:hidden bg-cyan-500"> 
      {/* Only MOBILE screen — md:hidden */}

      {/* Hamburger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 relative z-50 "
      >
        <svg width="28" height="28" fill="none" className="text-white">
          <path d="M4 6h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 12h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 18h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed z-40"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Slider Menu (TOP → DOWN) */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            ref={menuRef}
            initial={{ y: -250, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                type: "spring",
                stiffness: 180,
                damping: 18,
              },
            }}
            exit={{
              y: -250,
              opacity: 0,
              transition: { duration: 0.2 },
            }}
            className="fixed  left-0 right-0 mx-auto w-full z-50 bg-cyan-500/70 backdrop-blur-[10px] "
          >
            <ul className="flex flex-col gap-2 p-3 ">
              {data.map((item, index)=>{
                return <li 
                key={index} 
                className="px-2   rounded-md text-white flex justify-center ">
                  <Link href={item.url} className="flex items-center text-left  w-full mx-28 ">
                  <span className="text-sm  pr-3">{item.icon}</span>
                  <span>{item.title}</span>
                  </Link>
                  </li>
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}
