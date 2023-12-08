"use client";

import { IChildren } from "@/types/global";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const DashboardProtected = ({ children }: IChildren) => {
  const { user } = useSelector((state: any) => state.auth);
  const router = useRouter();

  return (
    <>{user.role !== "admin" && !user.name ? router.replace("/") : children}</>
  );
};

export default DashboardProtected;
