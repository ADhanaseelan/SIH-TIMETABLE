// Sidebar.tsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-lg font-bold mb-6">Menu</h2>
      <nav>
        <ul className="space-y-3">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/staff" className="hover:text-gray-300">
              Staff List
            </Link>
          </li>
           <li>
            <Link to="/addstaff" className="hover:text-gray-300">
              Add Staff
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
