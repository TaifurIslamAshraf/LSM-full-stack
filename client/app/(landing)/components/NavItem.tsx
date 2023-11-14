"use client";

import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "../../../components/ToggleTheme";
import { Button } from "../../../components/ui/button";

const navLink = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Course",
    path: "/course",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Blog",
    path: "/blog",
  },
];

const NavItem = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <div className="md:flex hidden justify-center items-center gap-4">
        {navLink.map((item, i) => {
          return (
            <Link
              href={item.path}
              key={i}
              className="px-1 font-semibold hover:underline"
            >
              {item.name}
            </Link>
          );
        })}
        <Button>Login</Button>
        <ModeToggle />
      </div>
      <div className="md:hidden mr-2 cursor-pointer">
        <div onClick={handleToggle}>{toggle ? <X /> : <Menu size={30} />}</div>
        <div
          className={cn(
            "absolute left-0 p-4 w-full z-40 bg-secondary transition-all duration-500 space-y-2",
            toggle ? " top-[50px]" : "top-[-500px]"
          )}
        >
          {navLink.map((item, i) => {
            return (
              <Link
                onClick={handleToggle}
                passHref
                href={item.path}
                key={i}
                className="py-3 text-center block font-semibold hover:underline"
              >
                {item.name}
              </Link>
            );
          })}
          <Button className="w-full">Login</Button>
          <div className="flex items-center justify-between bg-muted border border-primary/20 py-2 rounded-md px-3">
            <p>Appearance</p>
            <ModeToggle />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavItem;
