import { LayoutDashboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const deshboardMenu = [
  {
    title: "Deshboard",
    path: "/",
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: "Students",
    path: "/admission",
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: "Admits",
    path: "/admits",
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: "Results",
    path: "/results",
    spacing: true,
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: "Events",
    path: "/events",
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: "Article",
    path: "/article",
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: "Notice",
    path: "/notice",
    spacing: true,
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: "Teachers",
    path: "/teacher",
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: "Users",
    path: "/users",
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: "Creations",
    path: "/creations",
    spacing: true,
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: "Logout",
    path: "/logout",
    icon: <LayoutDashboard size={20} />,
  },
];

const Navbar = () => {
  return (
    <div
      className="bg-foreground hover:w-60 w-20
      h-screen fixed transition-all duration-150 group text-secondary hover:px-4 px-3 overflow-y-auto scrollbar-thin scrollbar-thumb-transparent py-6 z-40"
    >
      <div className="w-[40px] mb-4 flex items-center space-x-1 font-bold text-xl">
        <Image src="/images/Logo.png" width={40} height={40} alt="logo" />
        <p className="group-hover:block hidden">Govindapur</p>
      </div>
      <div className="menu">
        {deshboardMenu.map((menu, index) => {
          return (
            <nav key={index} className="">
              <Link
                href={menu.path}
                className={`
                flex
                items-center
                gap-x-4
                px-2
                my-4
                hover:bg-[#4a6c8d]
                rounded
                ${menu.spacing && "mb-8"}
              `}
              >
                <div>{menu.icon}</div>
                <div className="hidden hover:inline-block text-base group-hover:block flex-1">
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
