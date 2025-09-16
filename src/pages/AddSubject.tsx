import React, { useState } from "react";
import { CustomDropdown, LabelInput } from "../Components/Shared/Component";

const AddSubject: React.FC = () => {
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");

  // Map years to semesters
  const semesterOptionsMap: Record<string, { label: string; value: string }[]> = {
    "First Year": [
      { label: "I", value: "I" },
      { label: "II", value: "II" },
    ],
    "Second Year": [
      { label: "III", value: "III" },
      { label: "IV", value: "IV" },
    ],
    "Third Year": [
      { label: "V", value: "V" },
      { label: "VI", value: "VI" },
    ],
    "Fourth Year": [
      { label: "VII", value: "VII" },
      { label: "VIII", value: "VIII" },
    ],
  };

  // Get the semesters for the selected year (default empty array)
  const semesterOptions = year ? semesterOptionsMap[year] : [];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-center">
        <h2 className="text-xl font-bold mb-4">Computer Science Engineering</h2>
      </div>

      {/* Form */}
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          <LabelInput label="Subject Name" placeholder="Enter Subject name" />
          <LabelInput label="Subject Code" placeholder="Enter subject code" />
          <LabelInput label="Subject Id" placeholder="Enter subject id" />
          <LabelInput label="Credit" placeholder="Enter credit" />

          {/* Year dropdown */}
          <CustomDropdown
            label="Year"
            options={[
              { label: "First Year", value: "First Year" },
              { label: "Second Year", value: "Second Year" },
              { label: "Third Year", value: "Third Year" },
              { label: "Fourth Year", value: "Fourth Year" },
            ]}
            value={year}
            onChange={(val) => {
              setYear(val);
              setSemester(""); // Reset semester when year changes
            }}
          />

          {/* Semester dropdown */}
          <CustomDropdown
            label="Semester"
            options={semesterOptions}
            value={semester}
            onChange={setSemester}
          />

          <LabelInput label="Department" placeholder="Enter department" />

          <CustomDropdown
            label="Subject Type"
            options={[
              { label: "Theory", value: "Theory" },
              { label: "Lab", value: "Lab" },
              { label: "Embedded", value: "Embedded" },
            ]}
            value={department}
            onChange={setDepartment}
          />
        </div>

        {/* Submit button */}
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-[#D9D9D9] text-black rounded hover:bg-[#D9D9c5]"
          >
            Add Staff
          </button>
        </div>
      </form>

      <p className="font-bold mt-4">New List</p>
    </div>
  );
};

export default AddSubject;
