"use client";

import Loading from "@/app/loading";
import { IChildren } from "@/types/global";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { useSelector } from "react-redux";

const DashboardProtected = ({ children }: IChildren) => {
  const { user } = useSelector((state: any) => state.auth);
  const router = useRouter();

  if (!user.role || !user.name) {
    return <Suspense fallback={<Loading />} />;
  }

  return (
    <>
      {user.role !== "admin" && !user.name
        ? router.replace("/login")
        : children}
    </>
  );
};

export default DashboardProtected;
