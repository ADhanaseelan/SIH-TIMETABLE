import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUser,
  FaList,
  FaPlusSquare,
  FaCar,
  FaRoute,
  FaClipboardList,
  FaTools,
  FaBell,
  FaChartBar,
} from "react-icons/fa";
import { BsFillTriangleFill } from "react-icons/bs";

interface SidebarProps {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-2 py-2 rounded-lg transition-all ${
      isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"
    }`;

  const menuItemClass =
    "flex items-center justify-between px-2 py-2 cursor-pointer text-gray-200 hover:text-white";

  const getSubMenuClass = (menu: string) =>
    `ml-4 mt-1 flex flex-col gap-1 transition-all duration-300 overflow-hidden ${
      openMenus[menu] ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
    }`;

  // Sidebar menu definition
  const menus = [
    {
      key: "department",
      icon: <FaUser className="w-5 h-5" />,
      label: "Department",
      links: [
        { to: "/department/addstaff", icon: <FaList />, label: "Add Staff" },
        { to: "/department/stafflist", icon: <FaPlusSquare />, label: "Staff List" },
      ],
    },
    {
      key: "subject",
      icon: <FaCar className="w-5 h-5" />,
      label: "Subject",
      links: [
        { to: "/subjects/addsubject", icon: <FaPlusSquare />, label: "Add Subject" },
        { to: "/subjects/subjectlist", icon: <FaList />, label: "View Subject" },
      ],
    },
    {
      key: "request",
      icon: <FaRoute className="w-5 h-5" />,
      label: "Request",
      links: [
        { to: "/request/send", icon: <FaList />, label: "Send Request" },
        { to: "/request/receive", icon: <FaPlusSquare />, label: "Receive Request" },
        { to: "/request/lab", icon: <FaClipboardList />, label: "Lab Request" },
      ],
    },
    {
      key: "viewtable",
      icon: <FaBell className="w-5 h-5" />,
      label: "View Table",
      links: [
        { to: "/viewtimetable/class", icon: <FaList />, label: "Class Timetable" },
        { to: "/viewtimetable/staff", icon: <FaList />, label: "Staff Timetable" },
        { to: "/viewtimetable/overall", icon: <FaList />, label: "Overall Timetable" },
        { to: "/viewtimetable/lab", icon: <FaList />, label: "Lab Timetable" },
      ],
    },
    {
      key: "lab",
      icon: <FaChartBar className="w-5 h-5" />,
      label: "Lab",
      links: [{ to: "/lab", icon: <FaClipboardList />, label: "View Lab" }],
    },
  ];

  return (
    <aside
      className={`
        bg-gray-800 text-white h-full flex flex-col  transition-all duration-300
        ${isOpen ? "w-60" : "w-0 overflow-hidden"}
        md:w-60 md:static md:overflow-visible
      `}
    >
      <h2 className="text-lg font-bold mb-6 p-4">Menu</h2>
      <nav className="flex-1 px-4 overflow-auto">
        {/* Dashboard (single link, not part of dropdown menus) */}
        <NavLink
          to="/timetable"
          className={linkClass}
          onClick={() => setIsOpen?.(false)}
        >
          <FaBell className="w-6 h-6" /> Timetable
        </NavLink>

        {/* Dropdown menus */}
        {menus.map(({ key, icon, label, links }) => (
          <div key={key}>
            <div className={menuItemClass} onClick={() => toggleMenu(key)}>
              <span className="flex items-center gap-2">
                {icon} {label}
              </span>
              <BsFillTriangleFill
                className={`transition-transform duration-300 w-3 h-3 ${
                  openMenus[key] ? "" : "rotate-180"
                }`}
              />
            </div>
            <div className={getSubMenuClass(key)}>
              {links.map(({ to, icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={linkClass}
                  onClick={() => setIsOpen?.(false)}
                >
                  {icon} {label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
