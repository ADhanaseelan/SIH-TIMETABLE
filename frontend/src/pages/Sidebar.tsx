import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { BsFillTriangleFill } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";
import { GrWorkshop } from "react-icons/gr";
import { SiGoogleclassroom } from "react-icons/si";
import { TbTablePlus } from "react-icons/tb";
import { BiTable } from "react-icons/bi";
import { FaPaperPlane } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";
import { GiDesk } from "react-icons/gi";
import { MdMoveToInbox } from "react-icons/md";
import { FaLaptop } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import { FaUsersViewfinder } from "react-icons/fa6";
import { BiSolidBookAdd } from "react-icons/bi";
import { MdPersonAdd } from "react-icons/md";
import { FaBookReader } from "react-icons/fa";
import { FaBuildingColumns } from "react-icons/fa6";
import { FaUsersRectangle } from "react-icons/fa6";
import { GrSchedules } from "react-icons/gr";



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
      isActive ? "bg-gray-600 text-white" : "text-gray-300 hover:bg-gray-700"
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
      icon: <FaBuildingColumns className="w-5 h-5" />,
      label: "Department",
      links: [
        { to: "/department/addstaff", icon: <MdPersonAdd />, label: "Add Staff" },
        { to: "/department/stafflist", icon: <FaUsersRectangle />, label: "Staff List" },
      ],
    },
    {
      key: "subject",
      icon: <MdMenuBook className="w-5 h-5" />,
      label: "Subject",
      links: [
        { to: "/subjects/addsubject", icon: <BiSolidBookAdd />, label: "Add Subject" },
        { to: "/subjects/subjectlist", icon: <FaBookReader />, label: "View Subject" },
      ],
    },
    {
      key: "request",
      icon: <FaPaperPlane className="w-5 h-5" />,
      label: "Request",
      links: [
        { to: "/request/send", icon: <IoSendSharp/>, label: "Send Request" },
        { to: "/request/receive", icon: <MdMoveToInbox />, label: "Receive Request" },
        { to: "/request/lab", icon: <FaLaptop  />, label: "Lab Request" },
      ],
    },
    {
      key: "viewtable",
      icon: <TbTablePlus className="w-5 h-5" />,
      label: "View Table",
      links: [
        { to: "/viewtimetable/class", icon: <SiGoogleclassroom />, label: "Class Timetable" },
        { to: "/viewtimetable/staff", icon: <FaChalkboardTeacher />, label: "Staff Timetable" },
        { to: "/viewtimetable/overall", icon: <BiTable />, label: "Overall Timetable" },
        { to: "/viewtimetable/lab", icon: <GiDesk />, label: "Lab Timetable" },
      ],
    },
    {
      key: "lab",
      icon: <GrWorkshop className="w-5 h-5" />,
      label: "Lab",
      links: [{ to: "/lab", icon: <FaUsersViewfinder />, label: "View Lab" }],
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
          <GrSchedules className="w-6 h-6" /> Timetable
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
