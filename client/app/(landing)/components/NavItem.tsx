"use client";

import Link from "next/link";
import { useState } from "react";

import { Menu, UserCircle, X } from "lucide-react";
import { useSelector } from "react-redux";
import { ModeToggle } from "../../../components/ToggleTheme";

import { cn } from "@/lib/utils";
import ProfileMenu from "./ProfileMenu";

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
  const { user } = useSelector((state: any) => state.auth);

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
        {user.name ? (
          <ProfileMenu isDashboard={true} />
        ) : (
          <Link href={"/login"} className="">
            <UserCircle size={30} />
          </Link>
        )}
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
          {user.name ? (
            <div className="w-full flex items-center justify-between bg-muted border border-primary/20 py-3 rounded-md px-3 cursor-default">
              <p>Logout from here</p>
              <ProfileMenu isDashboard={true} />
            </div>
          ) : (
            <Link
              href={"/login"}
              className="w-full flex items-center justify-between bg-muted border border-primary/20 py-3 rounded-md px-3 hover:underline"
            >
              <p>Login Your Account</p>
              <UserCircle size={30} />
            </Link>
          )}
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
