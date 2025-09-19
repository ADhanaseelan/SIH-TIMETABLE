import React, { useState } from "react";
import { CustomDropdown, LabelInput,SearchBox } from "../Components/Shared/Component";

const SubjectList: React.FC = () => {
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
      </form>

     <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 mt-3">
             <h2 className="text-xl font-bold">Subject List</h2>
     
             <div className="flex w-full md:w-auto">
               <SearchBox
                //  value={searchTerm}
                //  onChange={(e) => setSearchTerm(e.target.value)}
               />
             </div>
           </div>
    </div>
  );
};

export default SubjectList;
