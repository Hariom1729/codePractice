"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NAV_ITEMS = [
  { name: "Overview", path: "/dashboard" },
  { name: "Learning Hub", path: "/learning" },
  { name: "Projects", path: "/dashboard/projects" },
  { name: "Analytics", path: "/dashboard/analytics" },
  { name: "Settings", path: "/dashboard/settings" },
];

export function NeonNav() {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activeIndex = NAV_ITEMS.findIndex(item => item.path === pathname) === -1 ? 0 : NAV_ITEMS.findIndex(item => item.path === pathname);

  return (
    <nav className="flex items-center gap-1 rounded-full border border-[var(--color-border-glass)] bg-[#121214]/60 backdrop-blur-md px-2 py-2 shadow-2xl relative">
      {NAV_ITEMS.map((item, index) => {
        const isActive = activeIndex === index;
        return (
          <Link
            key={item.name}
            href={item.path}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={cn(
              "relative px-4 py-1.5 text-sm font-medium transition-colors duration-300",
              isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="active-nav-pill"
                className="absolute inset-0 rounded-full bg-[var(--color-border-glass)] border border-gray-600 shadow-[0_0_15px_rgba(139,92,246,0.15)]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            
            {/* Hover Indicator */}
            {hoveredIndex === index && !isActive && (
              <motion.div
                layoutId="hover-nav-pill"
                className="absolute inset-0 rounded-full bg-white/5"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            
            <span className="relative z-10">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
