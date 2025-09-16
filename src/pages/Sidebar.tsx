// Sidebar.tsx
import React, {type FC, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUser,
  FaList,
  FaPlusSquare,
  FaClipboardList,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { BsFillTriangleFill } from "react-icons/bs";

interface SidebarProps {
  role: string;
}

const Sidebar: FC<SidebarProps> = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [pendingLabCount, setPendingLabCount] = useState(0);

  const isAdmin = role.toUpperCase() === "ADMIN";

  // Fetch pending lab requests count
  useEffect(() => {
    const fetchPendingLabCount = async () => {
      try {
        const res = await fetch("/api/Lab/pendingLabRequestsCount");
        if (res.ok) {
          const data = await res.json();
          setPendingLabCount(data.pendingLabRequestsCount);
        }
      } catch (err) {
        console.error("Error fetching lab requests:", err);
      }
    };
    fetchPendingLabCount();
    const intervalId = setInterval(fetchPendingLabCount, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({
      ...Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {} as Record<string, boolean>),
      [menu]: !prev[menu],
    }));
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center h-[40px] w-full gap-2 px-2 py-2 rounded-xl transition-all font-medium text-[15px] ${
      isActive
        ? "bg-black text-white shadow-md"
        : "text-gray-800 hover:bg-gray-100"
    }`;

  const menuItemClass =
    "flex items-center justify-between px-2 py-2 cursor-pointer text-gray-800 hover:text-blue-800 transition-all font-medium text-[15px]";

  const getSubMenuClass = (menu: string) =>
    `ml-4 mt-2 flex flex-col gap-1 transition-all duration-300 overflow-hidden ${
      openMenus[menu] ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
    }`;

  const menuData = [
    {
      key: "dashboard",
      icon: <MdDashboard className="w-6 h-6" />,
      label: "Dashboard",
      links: [],
    },
    {
      key: "department",
      icon: <FaUser className="w-5 h-5" />,
      label: "Department",
      links: [
        isAdmin
          ? { to: "/department/create", icon: <FaPlusSquare />, label: "Create Department" }
          : { to: "/department/addstaff", icon: <FaPlusSquare />, label: "Add Staff" },
        !isAdmin
          ? { to: "/department/showstaff", icon: <FaList />, label: "Show Staff" }
          : null,
      ].filter(Boolean),
    },
    !isAdmin && {
      key: "subject",
      icon: <FaClipboardList className="w-5 h-5" />,
      label: "Subject",
      links: [
        { to: "/subject/add", icon: <FaPlusSquare />, label: "Add Subject" },
        { to: "/subject/view", icon: <FaList />, label: "View Subject" },
      ],
    },
    !isAdmin && {
      key: "timetable",
      icon: <FaClipboardList className="w-5 h-5" />,
      label: "Timetable",
      links: [{ to: "/timetable", icon: <FaList />, label: "Timetable" }],
    },
    !isAdmin && {
      key: "request",
      icon: <FaClipboardList className="w-5 h-5" />,
      label: "Request",
      links: [
        { to: "/request/send", icon: <FaPlusSquare />, label: "Send" },
        { to: "/request/received", icon: <FaList />, label: "Received" },
        {
          to: "/request/labReceived",
          icon: <FaClipboardList />,
          label: "Lab Received",
          badge: pendingLabCount,
        },
      ],
    },
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header (Mobile) */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-black flex items-center px-4 xl:hidden z-50">
        <button
          onClick={() => setIsOpen(true)}
          className={`text-white p-2 ${isOpen ? "hidden" : "block"}`}
        >
          <BsFillTriangleFill className="w-5 h-5" />
        </button>
        <span className="text-white font-semibold ml-2">App Name</span>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 xl:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-white shadow-md px-4 py-6 pt-20 z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } xl:translate-x-0 xl:static`}
      >
        <nav className="flex flex-col gap-4">
          {menuData.map(({ key, icon, label, links }: any) => (
            <div key={key}>
              <div className={menuItemClass} onClick={() => toggleMenu(key)}>
                <span className="flex items-center gap-2">
                  {icon} {label}
                </span>
                {links && links.length > 0 && (
                  <BsFillTriangleFill
                    className={`transition-transform duration-300 w-3 h-3 ${
                      openMenus[key] ? "" : "rotate-180"
                    }`}
                  />
                )}
              </div>
              {links && links.length > 0 && (
                <div className={getSubMenuClass(key)}>
                  {links.map(({ to, icon, label, badge }: any) => (
                    <NavLink
                      key={to}
                      to={to}
                      className={linkClass}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="flex items-center gap-2">
                        {icon} {label}
                        {badge && badge > 0 && (
                          <span className="ml-auto bg-red-500 w-2 h-2 rounded-full" />
                        )}
                      </span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
