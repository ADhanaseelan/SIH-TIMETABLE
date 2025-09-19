import React, { useState } from "react";
import { SearchBox } from "../Components/Shared/Component";

const StaffList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");


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

     
    </div>
  );
};

export default StaffList;
