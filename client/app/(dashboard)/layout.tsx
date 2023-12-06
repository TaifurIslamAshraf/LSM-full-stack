import { IChildren } from "@/types/global";
import AdminSidebar from "./components/AdminSidebar";

const DashboartLayout = ({ children }: IChildren) => {
  return (
    <div>
      <AdminSidebar />
      {children}
    </div>
  );
};

export default DashboartLayout;
