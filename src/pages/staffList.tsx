import React, { useState } from "react";
import { SearchBox } from "../Components/Shared/Component";

const StaffList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const staff = [
    { id: 1, name: "Alice Johnson", role: "Teacher", status: "active" },
    { id: 2, name: "Bob Smith", role: "Admin", status: "inactive" },
    { id: 3, name: "Charlie Brown", role: "Librarian", status: "active" },
  ];

  // Search filter only
  const filteredStaff = staff.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-center mb-4">
        <p className="text-lg font-semibold">Computer Science Engineering</p>
      </div>

      {/* Header with title and search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold">Staff List</h2>

        <div className="flex w-full md:w-auto">
          <SearchBox
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Staff list */}
      <ul className="space-y-2">
        {filteredStaff.map((person) => (
          <li
            key={person.id}
            className="p-3 border rounded-lg shadow-sm bg-gray-50 flex justify-between"
          >
            <span>
              <span className="font-medium">{person.name}</span> — {person.role}
            </span>
            <span
              className={`px-2 py-1 text-xs rounded ${
                person.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {person.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StaffList;
