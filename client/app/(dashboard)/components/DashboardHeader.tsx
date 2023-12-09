"use client";

import { Popover, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Bell, BellRing } from "lucide-react";

const notificationData = [
  {
    id: 1,
    title: "Notification one",
    message: "You are buy a course here is your course description",
    status: "seen",
  },
  {
    id: 2,
    title: "someone give a review in your course",
    message: "you have one review for mern stack ecommerce course",
    status: "unseen",
  },
  {
    id: 3,
    title: "Taifur islam buy your course",
    message: "byu your course for mern stack ecommerce course",
    status: "unseen",
  },
];

const DashboardHeader = () => {
  return (
    <div
      className={cn("fixed top-0 right-0 transition-all duration-400  px-4")}
    >
      <div className="flex items-center justify-end">
        <div className="bg-blue-500 text-white p-2 rounded-full mt-5 cursor-pointer mr-5">
          <Popover>
            <PopoverTrigger asChild>
              <Bell size={25} />
            </PopoverTrigger>
            <PopoverContent
              className={"w-[400px] bg-foreground text-secondary"}
            >
              {notificationData.map((item) => (
                <div key={item.id} className="mb-5">
                  <h1 className="flex font-semibold text-blue-500/70  cursor-pointer hover:text-blue-500 gap-1 transition-all">
                    <BellRing /> {item.title}
                  </h1>
                  <p>{item.message}</p>
                </div>
              ))}
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
