import React from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  return (
    <aside
      className={`h-full flex flex-col p-4 bg-gray-800 text-white transition-all duration-300 ${
        isOpen ? "w-60" : "w-0 overflow-hidden"
      }`}
    >
      <h2 className="text-lg font-bold mb-6">Menu</h2>
      <nav className="flex-1">
        <ul className="space-y-3">
          <li>
            <Link
              to="/"
              className="hover:text-gray-300 block"
              onClick={() => setIsOpen && setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/staff"
              className="hover:text-gray-300 block"
              onClick={() => setIsOpen && setIsOpen(false)}
            >
              Staff List
            </Link>
          </li>
          <li>
            <Link
              to="/addstaff"
              className="hover:text-gray-300 block"
              onClick={() => setIsOpen && setIsOpen(false)}
            >
              Add Staff
            </Link>
          </li>
          <li>
            <Link
              to="/addsubject"
              className="hover:text-gray-300 block"
              onClick={() => setIsOpen && setIsOpen(false)}
            >
              Add Subject
            </Link>
          </li>
          <li>
            <Link
              to="/subjectlist"
              className="hover:text-gray-300 block"
              onClick={() => setIsOpen && setIsOpen(false)}
            >
              Subject List
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
