"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import defaultAvater from "@/public/default-avater.jpg";
import { useLogoutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const ProfileMenu = ({ isDashboard }: { isDashboard: boolean }) => {
  const [isLogout, setIsLogout] = useState(false);

  const { user } = useSelector((state: any) => state.auth);
  const {} = useLogoutQuery(undefined, {
    skip: !isLogout,
  });

  const handleLogout = async () => {
    setIsLogout(true);
    await signOut();
    toast.success("Logout successfull");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          className="cursor-pointer rounded-full"
          src={user.avatar ? user.avatar.url : defaultAvater}
          alt="default avater"
          height={35}
          width={35}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {user.name && user.role === "admin" && isDashboard && (
          <Link href="/dashboard">
            <DropdownMenuItem className="block cursor-pointer">
              Dashboard
            </DropdownMenuItem>
          </Link>
        )}
        <Link href="/profile">
          <DropdownMenuItem className="block cursor-pointer">
            Profile
          </DropdownMenuItem>
        </Link>
        <Separator className="mb-2" />
        <DropdownMenuItem
          onClick={handleLogout}
          className="block cursor-pointer"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
