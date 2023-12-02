"use client";

import GlobalLoders from "@/components/GlobalLoader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

const Loading = () => {
  const { isLoading } = useLoadUserQuery({});

  return <>{(isLoading && <GlobalLoders />) || <GlobalLoders />}</>;
};

export default Loading;
