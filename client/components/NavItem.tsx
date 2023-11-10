"use client";

import Link from "next/link";
import { useState } from "react";

import { Menu } from "lucide-react";
import { ModeToggle } from "./ToggleTheme";

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

  return (
    <>
      <div className="md:flex hidden justify-center items-center gap-2">
        {navLink.map((item, i) => {
          return (
            <Link href={item.path} key={i} className="px-3 font-semibold">
              {item.name}
            </Link>
          );
        })}
        <ModeToggle />
      </div>
      <div className="md:hidden mr-2 cursor-pointer relative">
        <Menu size={30} />
        <div className="absolute right-[20px] m-auto h-[150px] w-[180px] bg-red-500">
          {navLink.map((item, i) => {
            return (
              <Link
                href={item.path}
                key={i}
                className="px-3 block font-semibold"
              >
                {item.name}
              </Link>
            );
          })}
          <div className="flex items-center justify-between">
            <p>Appearance</p>
            <ModeToggle />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavItem;
