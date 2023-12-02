"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import Image from "next/image";

const SocialAuth = () => {
  return (
    <div className="w-full space-y-2">
      <div className="">
        <p className="text-center font-semibold my-4 border">OR</p>
        <Button
          className="w-full bg-secondary-foreground/80"
          onClick={() => signIn("google")}
        >
          <Image
            className="mr-2"
            src="/google-logo.svg"
            alt="google logo"
            height={30}
            width={40}
          />
          Sign In with Google
        </Button>
      </div>
      <div className="">
        <Button
          className="w-full bg-secondary-foreground/80"
          onClick={() => signIn("github")}
        >
          <Image
            className="mr-3"
            src="/github.svg"
            alt="github logo"
            height={30}
            width={30}
          />
          Sign In with Github
        </Button>
      </div>
    </div>
  );
};

export default SocialAuth;
