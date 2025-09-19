import React, { useState } from "react";
import { CustomDropdown, LabelInput } from "../Components/Shared/Component";

const AddStaff: React.FC = () => {
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-center">
        <h2 className="text-xl font-bold mb-4">Computer Science Engineering</h2>
      </div>

      {/* Form */}
      <form >
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {/* Department dropdown */}
        <CustomDropdown
          label="Department"
          options={[
            { label: "CSE", value: "cse" },
            { label: "ECE", value: "ece" },
            { label: "EEE", value: "eee" },
            { label: "MECH", value: "mech" },
            { label: "CIVIL", value: "civil" },
          ]}
          value={department}
          onChange={setDepartment}
        />

        {/* Staff name input */}
        <LabelInput label="Staff Name" placeholder="Enter staff name" />

        {/* Role input */}
        <LabelInput label="Role" placeholder="Enter role (e.g., Teacher, Admin)" />

        {/* Status dropdown */}
        <CustomDropdown
          label="Status"
          options={[
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ]}
          value={status}
          onChange={setStatus}
        />
        
        
</div>

        {/* Submit button */}
        <div className="flex justify-end">
        <button
          type="submit"
          className=" px-4 py-2 bg-[#D9D9D9] text-black-500 rounded hover:bg-[#D9D9c5]"
        >
          Add Staff
        </button>
        </div>
      </form>


      <p className="font-bold">New List</p>

      
    </div>
  );
};

export default AddStaff;
