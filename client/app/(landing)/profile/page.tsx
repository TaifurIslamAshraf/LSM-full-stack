import { styles } from "@/app/style";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import AccountInfo from "../components/AccountInfo";
import ChangePassword from "../components/ChangePassword";
import EnrolledCourse from "../components/EnrolledCourse";

export default function Page() {
  return (
    <Tabs
      defaultValue="account"
      className={cn("w-[600px] mx-auto", styles.pagePadding, styles.paddingX)}
    >
      <TabsList className="grid w-full gap-2 grid-cols-3">
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
  );
}
