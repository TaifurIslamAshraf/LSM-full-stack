import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skill Sync",
  description: "welcome to skill sync",
  keywords: "Programing, MERN, web development",
};

export default function Home() {
  return (
    <main>
      <h1 className="text-3xl text-red-500">Hello Skill sync</h1>;
      <Button>Click Here</Button>
    </main>
  );
}
