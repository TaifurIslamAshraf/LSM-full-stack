"use client";

import { store } from "@/redux/store";
import { Provider } from "react-redux";

interface ProviderProps {
  children: React.ReactNode;
}

export const ReduxProviders = ({ children }: ProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};
