"use client";

import Loading from "@/app/loading";
import { IChildren } from "@/types/global";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { userAuth } from "./userAuth";

const Protected = ({ children }: IChildren) => {
  const isAuthenticated = userAuth();
  const router = useRouter();

  return (
    <>
      {!isAuthenticated && <Suspense fallback={<Loading />} />}
      {isAuthenticated && children}
      {!isAuthenticated && router.replace("/login")}
    </>
  );
};
export default Protected;
