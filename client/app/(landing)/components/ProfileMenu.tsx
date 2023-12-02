"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

import defaultAvater from "@/public/avater.png";
import Link from "next/link";
import { useSelector } from "react-redux";

const ProfileMenu = () => {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          className="cursor-pointer"
          src={user.avater ? user.avater.public_url : defaultAvater}
          alt="default avater"
          height={35}
          width={35}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="block">
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="block">Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
