"use client";

import { useSocialAuthMutation } from "@/redux/features/auth/authApi";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import Login from "../components/Login";
import Register from "../components/Register";

const Page = () => {
  const { data: session } = useSession();
  const { user } = useSelector((state: any) => state.auth);
  const [socialAuth, {}] = useSocialAuthMutation();

  useEffect(() => {
    if (!user.name) {
      if (session?.user) {
        socialAuth({
          name: session.user?.name,
          email: session.user?.email,
          avatar: {
            url: session.user?.image,
          },
        });
      }
    }
  }, [session, socialAuth, user.name]);

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
