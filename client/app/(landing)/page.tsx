import Hero from "@/app/(landing)/components/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skill Sync",
  description: "Learn and Earn",
  keywords: "MERN, Programing, web development",
};

const page = () => {
  return (
    <>
      <div className="hero md:pt-20">
        <Hero />
      </div>
    </>
  );
};

export default page;
