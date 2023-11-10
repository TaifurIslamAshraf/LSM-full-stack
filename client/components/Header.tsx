"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import NavItem from "./NavItem";

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
    <header className="w-full relative">
      <div
        className={cn(
          "bg-secondary fixed top-5 left-0 right-0 w-[70%] m-auto h-[50px] md:h-[70px] z-50 border rounded-2xl transition-all px-3",
          active ? "bg-secondary/90 shadow-md top-2" : ""
        )}
      >
        <div className="h-full">
          <div className="w-full h-[50px] md:h-[70px] flex items-center justify-between p-3">
            <div className="">
              <Link
                href="/"
                className="text-primary text-[20 px] md:text-[25px] font-bold"
              >
                <span className={cn(active ? "text-primary" : "text-blue-400")}>
                  SKILL{" "}
                </span>
                <span className={cn(active ? "text-blue-400" : "text-primary")}>
                  SYNC
                </span>
              </Link>
            </div>
            <div className="">
              <NavItem />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
