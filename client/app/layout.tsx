import { Toaster } from "react-hot-toast";

import Loader from "@/components/Loader";
import AuthProvider from "@/lib/AuthProvider";
import ThemeProvider from "@/lib/ThemeProvider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter, Josefin_Sans, Poppins } from "next/font/google";
import { ReduxProviders } from "../lib/Provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skill sync",
  description: "Online learning platform",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-Josefin",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(poppins.className)}>
        <ReduxProviders>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Loader>{children}</Loader>
              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </AuthProvider>
        </ReduxProviders>
      </body>
    </html>
  );
}
