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
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useUpdateProfileMutation } from "@/redux/features/users/usersApi";
import { Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AccountInfo = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [name, setName] = useState(user.name && user.name);
  const [validate, setValidate] = useState(false);

  const [updateProfile, { isSuccess, error }] = useUpdateProfileMutation();
  const {} = useLoadUserQuery(
    {},
    {
      skip: !validate,
    }
  );
  const router = useRouter();

  const handleImage = (e: any) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateProfile({ avatar });
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess) {
      setValidate(true);
    }
    if (error) {
      console.log(error);
    }
  }, [error, isSuccess]);
  console.log(validate, isSuccess);
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
              onChange={handleImage}
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
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input defaultValue={user.email} readOnly disabled />
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
