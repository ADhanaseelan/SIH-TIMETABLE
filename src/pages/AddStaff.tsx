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
      <form className="">
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

        {/* Submit button */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Staff
        </button>
      </form>
    </div>
  );
};

export default AddStaff;
