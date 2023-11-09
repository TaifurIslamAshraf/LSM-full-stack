"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [active, setActive] = useState(false);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  return (
    <header className="w-full relative h-[200vh]">
      <div
        className={cn(
          "bg-secondary fixed top-0 left-0 right-0 w-full h-[80px] z-50",
          active ? "bg-secondary/90 shadow-xl" : ""
        )}
      >
        <div className="w-[92%] md:w-[95%] h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <Link
              href="/"
              className="text-primary text-[20 px] md:text-[25px] font-bold"
            >
              Skill <span className="text-blue-400">Sync</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
