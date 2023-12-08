import DashboardProtected from "@/lib/DashboardProtected";
import { IChildren } from "@/types/global";
import DashboardHeader from "./components/DashboardHeader";
import Navbar from "./components/Sidebar";

const DashboartLayout = ({ children }: IChildren) => {
  return (
    <div>
      <DashboardProtected>
        <DashboardHeader />
        <Navbar />
        {children}
      </DashboardProtected>
    </div>
  );
};

export default DashboartLayout;
