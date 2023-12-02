"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

import defaultAvater from "@/public/default-avater.jpg";
import Link from "next/link";
import { useSelector } from "react-redux";

const ProfileMenu = () => {
  const { user } = useSelector((state: any) => state.auth);

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
        <Link href="/profile">
          <DropdownMenuItem className="block cursor-pointer">
            Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="block cursor-pointer">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
