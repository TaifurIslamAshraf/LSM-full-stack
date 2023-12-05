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

import { LoadingButton } from "@/components/LoaderButton";
import { cn } from "@/lib/utils";
import defaultAvater from "@/public/default-avater.jpg";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import {
  useUpdateProfileMutation,
  useUpdateUserInfoMutation,
} from "@/redux/features/users/usersApi";
import { Camera, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const AccountInfo = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [name, setName] = useState(user.name && user.name);
  const [validate, setValidate] = useState(false);

  const [updateProfile, { isSuccess, error, isLoading, data }] =
    useUpdateProfileMutation();
  const [
    updateUserInfo,
    { isSuccess: nameIsSuccess, isLoading: nameIsLoading, data: nameData },
  ] = useUpdateUserInfoMutation();
  const { isSuccess: success } = useLoadUserQuery(
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

  const handleName = () => {
    updateUserInfo({ name });
    console.log("first");
  };

  useEffect(() => {
    if (nameIsSuccess) {
      setValidate(true);
      toast.success(nameData.message);
    }
  }, [nameData, nameIsSuccess]);

  useEffect(() => {
    if (isSuccess) {
      setValidate(true);
      toast.success(data.message);
      window.location.reload();
    }
    if (error) {
      const errorData = error as any;
      toast.error(errorData.data.message);
    }
  }, [data, error, isSuccess, router]);
  return (
    <div>
      <Card>
        <CardHeader className="w-full flex justify-center">
          <div className="relative">
            <Image
              className={cn("rounded-full m-auto", isLoading ? "blur-md" : "")}
              src={user.avatar?.url ? user.avatar.url : defaultAvater}
              alt="default avater"
              height={110}
              width={110}
            />
            <Loader2
              className={cn(
                `absolute inset-0 m-auto h-10 w-10 animate-spin`,
                isLoading ? "block" : "hidden"
              )}
            />
            <Input
              className="hidden"
              name="avatar"
              id="avatar"
              onChange={handleImage}
              type="file"
              disabled={isLoading}
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
              disabled={nameIsLoading}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input defaultValue={user.email} readOnly disabled />
          </div>
        </CardContent>
        <CardFooter>
          {nameIsLoading ? (
            <LoadingButton className="w-auto" />
          ) : (
            <Button onClick={handleName}>Save changes</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AccountInfo;
