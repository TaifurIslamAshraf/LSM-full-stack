"use client";

import { IChildren } from "@/types/global";
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }: IChildren) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
