import React, { useState } from "react";
import { SearchBox } from "../Components/Shared/Component";
import ViewTable from "../Components/Shared/ViewTable";

const StaffList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample staff data
  const staffData = [
    {
      Name: "John Doe",
      Position: "Professor",
      Email: "john.doe@example.com",
      Phone: "123-456-7890",
    },
    {
      Name: "Jane Smith",
      Position: "Assistant Professor",
      Email: "jane.smith@example.com",
      Phone: "987-654-3210",
    },
    {
      Name: "Mark Johnson",
      Position: "Lecturer",
      Email: "mark.johnson@example.com",
      Phone: "555-111-2222",
    },
  ];

  // Filter logic
  const filteredRows = staffData.filter((row) =>
    Object.values(row).some((val) =>
      val.toLowerCase().includes(searchTerm.toLowerCase())
    )
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

      {/* Table */}
      <ViewTable
        columns={["Name", "Position", "Email", "Phone"]}
        colWidths={["w-40", "w-32", "w-48", "w-32"]}
        initialRows={filteredRows}
      />
    </div>
  );
};

export default StaffList;
