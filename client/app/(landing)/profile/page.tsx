import { styles } from "@/app/style";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Protected from "@/lib/Protected";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import AccountInfo from "../components/AccountInfo";
import ChangePassword from "../components/ChangePassword";
import EnrolledCourse from "../components/EnrolledCourse";

export const metadata: Metadata = {
  title: "Profile | Skill Sync",
  description: "Learn and Earn with skill sync",
  keywords: "MERN, Programing, web development",
};

export default function Page() {
  return (
    <Protected>
      <Tabs
        defaultValue="account"
        className={cn(
          "max-w-[600px] mx-auto",
          styles.pagePadding,
          styles.paddingX
        )}
      >
        <TabsList className="grid w-full gap-3 md:gap-2 grid-cols-3">
          <TabsTrigger value="account">My Account</TabsTrigger>
          <TabsTrigger value="password">Password Change</TabsTrigger>
          <TabsTrigger value="course">Enrolled Course</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <AccountInfo />
        </TabsContent>
        <TabsContent value="password">
          <ChangePassword />
        </TabsContent>
        <TabsContent value="course">
          <EnrolledCourse />
        </TabsContent>
      </Tabs>
    </Protected>
  );
}
