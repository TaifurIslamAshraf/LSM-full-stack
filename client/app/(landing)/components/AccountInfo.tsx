"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

import defaultAvater from "@/public/default-avater.jpg";
import { Camera } from "lucide-react";
import { useSelector } from "react-redux";

const AccountInfo = () => {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div>
      <Card>
        <CardHeader className="w-full flex justify-center">
          <div className="relative">
            <Image
              className="rounded-full m-auto"
              src={user.avatar?.url ? user.avatar.url : defaultAvater}
              alt="default avater"
              height={110}
              width={110}
            />
            <Input
              className="hidden"
              name="avatar"
              id="avatar"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
            />
            <Label
              htmlFor="avatar"
              className="absolute bottom-0 left-[50%] bg-secondary rounded-full p-1  mx-auto cursor-pointer"
            >
              <Camera className="z-20 h-[30px] w-[30px] rounded-full" />
            </Label>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Pedro Duarte" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="@peduarte" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AccountInfo;
