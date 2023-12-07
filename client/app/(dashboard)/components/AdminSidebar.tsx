"use client";

import { cn } from "@/lib/utils";
import { sidebar } from "@/redux/features/commonSlice";
import {
  ChevronLeftCircleIcon,
  ChevronRightCircleIcon,
  LayoutDashboard,
  MonitorPlay,
  User,
  Video,
} from "lucide-react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { useDispatch, useSelector } from "react-redux";

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const { toggle, collapsed } = useSelector((state: any) => state.common);

  const handleCollapsed = () => {
    dispatch(sidebar({ collapsed: !collapsed }));
  };

  return (
    <div className="fixed text-black">
      <Sidebar
        toggled={toggle}
        className="h-screen"
        collapsed={collapsed}
        backgroundColor="#61A3BA"
      >
        <div className="flex justify-evenly my-5">
          <h1 className={cn(collapsed ? "hidden" : "block")}>Skill Sync</h1>
          <div className="" onClick={handleCollapsed}>
            {collapsed ? <ChevronRightCircleIcon /> : <ChevronLeftCircleIcon />}
          </div>
        </div>
        <Menu
          className=""
          menuItemStyles={{
            button: {
              backgroundColor: "#61A3BA",
            },
          }}
        >
          <MenuItem icon={<LayoutDashboard />}>Dashboard</MenuItem>
          <SubMenu label="Content" icon={<Video />}>
            <div className="">
              <MenuItem icon={<Video />}>Create Course</MenuItem>
              <MenuItem icon={<MonitorPlay />}>Live Course</MenuItem>
            </div>
          </SubMenu>

          <div className="">
            <h2 className={cn("font-bold ml-6", collapsed && "opacity-0")}>
              Information
            </h2>
            <MenuItem icon={<User />}>Users</MenuItem>
            <MenuItem icon={<MonitorPlay />}>Invoices</MenuItem>
          </div>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default AdminSidebar;
