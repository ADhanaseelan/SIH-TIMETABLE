import React from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  return (
    <aside
      className={`
        bg-gray-800 text-white h-full  flex flex-col transition-all duration-300
        ${isOpen ? "w-60" : "w-0 overflow-hidden"}
        md:w-60 md:static md:overflow-visible
      `}
    >
      <h2 className="text-lg font-bold mb-6 p-4">Menu</h2>
      <nav className="flex-1 px-4">
        <ul className="space-y-3">
          {[
            { name: "Home", path: "/" },
            { name: "Staff List", path: "/staff" },
            { name: "Add Staff", path: "/addstaff" },
            { name: "Add Subject", path: "/addsubject" },
            { name: "Subject List", path: "/subjectlist" },
          ].map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="block hover:text-gray-300"
                onClick={() => setIsOpen && setIsOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
