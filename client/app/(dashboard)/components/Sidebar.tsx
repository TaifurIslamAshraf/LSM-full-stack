"use client";

import ProfileMenu from "@/app/(landing)/components/ProfileMenu";
import { ModeToggle } from "@/components/ToggleTheme";
import { cn } from "@/lib/utils";
import { sidebar } from "@/redux/features/commonSlice";
import {
  ChevronLeft,
  ChevronRight,
  FilePieChart,
  FileText,
  Layout,
  LayoutDashboard,
  LineChart,
  ListOrdered,
  PlaySquare,
  ShieldQuestion,
  ShoppingBag,
  UserCog,
  Users,
  Video,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const deshboardMenu = [
  {
    title: "Dashboard",
    path: "/dashboard",
    spacing: true,
    icon: <LayoutDashboard size={17} />,
  },
  {
    title: "Users",
    path: "/users",
    icon: <Users size={17} />,
  },
  {
    title: "Invoices",
    path: "/invoice",
    spacing: true,

    icon: <FileText size={17} />,
  },

  {
    title: "Courses",
    path: "/courses",
    icon: <PlaySquare size={17} />,
  },
  {
    title: "Create Course",
    path: "/create-course",
    icon: <Video size={17} />,
    spacing: true,
  },

  {
    title: "Category",
    path: "/category",
    icon: <ListOrdered size={17} />,
  },
  {
    title: "FAQ",
    path: "/faq",
    icon: <ShieldQuestion size={17} />,
  },

  {
    title: "Hero",
    path: "/hero",
    icon: <Layout size={17} />,
  },
  {
    title: "Manage Team",
    path: "/marageTeam",
    spacing: true,

    icon: <UserCog size={17} />,
  },
  {
    title: "Course Analytics",
    path: "/CourseAnalytics",

    icon: <LineChart size={17} />,
  },
  {
    title: "Order Analytics",
    path: "/OrderAnalytics",

    icon: <ShoppingBag size={17} />,
  },
  {
    title: "Users Analytics",
    path: "/usersAnalytics",
    icon: <FilePieChart size={17} />,
  },
];

const Navbar = () => {
  const { toggle, collapsed } = useSelector((state: any) => state.common);
  const dispatch = useDispatch();
  const path = usePathname();

  const handleCollapsed = (isColl: boolean) => {
    if (collapsed && isColl) {
      dispatch(sidebar({ collapsed: true, toggle: false }));
    }
    if (!isColl) {
      dispatch(sidebar({ collapsed: !collapsed, toggle: false }));
    }
  };

  return (
    <div
      className={cn(
        `bg-[#96EFFF]
      h-screen fixed top-0 left-0 bottom-0 transition-all duration-400 group text-[#1B4242] px-3 overflow-y-auto no-scrollbar py-6 z-40 border-r-2 border-r-blue-400/75`,
        collapsed ? "w-60" : "w-16",
        toggle && "left-[-200px]"
      )}
    >
      <div className="flex items-center justify-between px-1 ">
        <h1
          className={cn(
            "font-semibold text-xl uppercase",
            collapsed === false && "hidden"
          )}
        >
          Skill <span className="text-blue-400">Sync</span>
        </h1>
        <div
          className="cursor-pointer hover:bg-blue-400 rounded-md"
          onClick={() => handleCollapsed(false)}
        >
          {collapsed ? <ChevronLeft size={30} /> : <ChevronRight size={30} />}
        </div>
      </div>

      <div
        className={cn(
          "my-6 flex items-center justify-between ",
          collapsed && "bg-slate-50/70 rounded-lg rounded-l-full"
        )}
      >
        <ProfileMenu isDashboard={false} />
        {collapsed && <ModeToggle />}
      </div>

      <div className="menu">
        {deshboardMenu.map((menu, index) => {
          return (
            <nav
              key={index}
              className={cn(
                "hover:bg-blue-400 px-1 rounded-sm transition",
                path === menu.path && "bg-blue-400"
              )}
            >
              <Link
                href={menu.path}
                className={`
                flex
                items-center
                gap-x-4
                my-1
                px-2
                py-2
                rounded
                ${menu.spacing && "mb-5"}
              `}
                onClick={() => handleCollapsed(true)}
              >
                <div className="">{menu.icon}</div>
                <div
                  className={cn(
                    "text-sm flex-1",
                    collapsed ? "block" : "hidden"
                  )}
                >
                  {menu.title}
                </div>
              </Link>
            </nav>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
