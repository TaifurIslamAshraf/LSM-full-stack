import Course from "@/components/Course";
import Hero from "@/components/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skill Sync",
  description: "Learn and Earn",
  keywords: "MERN, Programing, web development",
};

const page = () => {
  return (
    <>
      <div className="bg-red-500">
        <Hero />
      </div>
      <div className="">
        <Course />
      </div>
    </>
  );
};

export default page;
