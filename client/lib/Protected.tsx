"use client";

import { IChildren } from "@/types/global";
import { redirect } from "next/navigation";
import { userAuth } from "./userAuth";

const Protected = ({ children }: IChildren) => {
  const isAuthenticated = userAuth();

  return isAuthenticated ? children : redirect("/login");
};

export default Protected;
