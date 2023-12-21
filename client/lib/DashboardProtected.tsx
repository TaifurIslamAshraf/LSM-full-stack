"use client";

import Loading from "@/app/loading";
import { IChildren } from "@/types/global";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { useSelector } from "react-redux";

const DashboardProtected = ({ children }: IChildren) => {
  const { user } = useSelector((state: any) => state.auth);
  const router = useRouter();

  return (
    <>
      {user.role !== "admin" && !user.name ? (
        <>
          {router.replace("/login")} {<Suspense fallback={<Loading />} />}
        </>
      ) : (
        children
      )}
    </>
  );
};

export default DashboardProtected;
