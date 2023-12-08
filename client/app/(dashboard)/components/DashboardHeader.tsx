"use client";

import { cn } from "@/lib/utils";
import { sidebar } from "@/redux/features/commonSlice";
import { useDispatch, useSelector } from "react-redux";

const DashboardHeader = () => {
  const { toggle, collapsed } = useSelector((state: any) => state.common);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(sidebar({ toggle: !toggle, collapsed: false }));
  };
  console.log(toggle, "toggle");
  console.log(collapsed, "co");

  return (
    <div
      className={cn(
        "fixed inset-0 h-[60px] w-full bg-[#96EFFF] transition-all duration-400 sm:ml-0 ml-20"
      )}
    >
      {/* <div className="" onClick={handleToggle}>
        <AlignJustify />
      </div> */}
    </div>
  );
};

export default DashboardHeader;
