"use client";

import { IChildren } from "@/types/global";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const DashboardProtected = ({ children }: IChildren) => {
  const { user } = useSelector((state: any) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (user.name && user.role !== "admin") {
      toast.error("Only Admin can access this page");
      router.replace("/");
    }
  }, [router, user.name, user.role]);

  return <>{children}</>;
};

export default DashboardProtected;
