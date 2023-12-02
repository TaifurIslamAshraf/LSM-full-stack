"use client";

import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { IChildren } from "@/types/global";
import { useEffect, useState } from "react";
import GlobalLoders from "./GlobalLoader";

const Loader = ({ children }: IChildren) => {
  const { isLoading } = useLoadUserQuery({});
  const [isMounted, setIsModunted] = useState(false);

  useEffect(() => {
    setIsModunted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <div>{isLoading ? <GlobalLoders /> : <> {children}</>}</div>;
};

export default Loader;
