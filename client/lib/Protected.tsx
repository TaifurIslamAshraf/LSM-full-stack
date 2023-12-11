"use client";

import Loading from "@/app/loading";
import { IChildren } from "@/types/global";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { userAuth } from "./userAuth";

const Protected = ({ children }: IChildren) => {
  const isAuthenticated = userAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    <Suspense fallback={<Loading />} />;
  }

  return isAuthenticated ? children : router.replace("/login");
};

export default Protected;
