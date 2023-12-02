"use client";

import { useSocialAuthMutation } from "@/redux/features/auth/authApi";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import Login from "../components/Login";
import Register from "../components/Register";

const Page = () => {
  const { data: session, status } = useSession();
  const { user } = useSelector((state: any) => state.auth);
  const [socialAuth, { isError, error, isSuccess }] = useSocialAuthMutation();
  console.log(user);
  useEffect(() => {
    if (!user.name) {
      if (session) {
        socialAuth({
          name: session.user?.name,
          email: session.user?.email,
          avatar: {
            url: session.user?.image,
          },
        });
      } else if (isSuccess) {
        toast.success("Login successfully");
      }
    }
  }, [isSuccess, session, socialAuth, user]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center mt-5 md:mt-32">
      <Tabs defaultValue="signin" className="w-full max-w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <Login />
        <Register />
      </Tabs>
    </div>
  );
};

export default Page;
