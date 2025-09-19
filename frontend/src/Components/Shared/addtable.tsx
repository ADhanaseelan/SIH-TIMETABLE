// AddTable.tsx
import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

interface AddTableProps {
  columns: string[]; // Dynamic column names
  colWidths?: string[]; // optional Tailwind width classes per column (e.g. "w-20")
}

const AddTable: React.FC<AddTableProps> = ({ columns, colWidths }) => {
  const [rows, setRows] = useState<any[]>([]);

  const handleAddRow = () => {
    const newRow: any = {};
    columns.forEach((col) => {
      newRow[col] = "";
    });
    setRows((prev) => [...prev, newRow]);
  };

  const handleRemoveRow = (index: number) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (rowIndex: number, col: string, value: string) => {
    setRows((prev) => {
      const copy = [...prev];
      copy[rowIndex] = { ...copy[rowIndex], [col]: value };
      return copy;
    });
  };

  return (
    <div className="p-4">
      {/* Header with Add button */}
      <div className="flex justify-end items-center mb-3">
        <button
          onClick={handleAddRow}
          className="flex items-center gap-2 bg-[#203C8A] text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          <FaPlus /> Add Row
        </button>
      </div>

      {/* Table container */}
      <div className="overflow-x-auto overflow-y-auto max-h-[400px] rounded-lg ">
        <table className="min-w-full table-fixed border-collapse">
          {/* Table header */}
          <thead className="bg-[#203C8A] text-white">
            <tr>
              {/* SI. No column */}
              <th className="w-12 px-2 py-2 text-center font-semibold border-4 border-white">
                SI. No
              </th>

              {/* Dynamic columns */}
              {columns.map((col, index) => {
                const w = colWidths?.[index] ?? "w-24"; // fixed width for each column
                return (
                  <th
                    key={index}
                    className={`${w} whitespace-nowrap px-4 py-2 text-center font-semibold border-4 border-white`}
                  >
                    {col}
                  </th>
                );
              })}

              {/* Cancel button column */}
              <th className="w-8 px-2 py-2 bg-white" aria-hidden />
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 2} // +2 for SI.No + cancel
                  className="text-center py-3 text-gray-500"
                >
                  No rows added yet. Click "Add Row".
                </td>
              </tr>
            ) : (
              rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="bg-[#F3F3F3] hover:bg-gray-50 text-[15px] font-medium whitespace-nowrap"
                >
                  {/* SI. No cell */}
                  <td className="w-12 px-2 py-2 text-center border-4 border-white">
                    {rowIndex + 1}
                  </td>

                  {/* Dynamic cells */}
                  {columns.map((col, colIndex) => {
                    const w = colWidths?.[colIndex] ?? "w-24";
                    return (
                      <td key={colIndex} className={`${w} border-4 border-white`}>
                        <input
                          type="text"
                          value={row[col]}
                          onChange={(e) =>
                            handleInputChange(rowIndex, col, e.target.value)
                          }
                          className="h-10 w-full text-center rounded focus:outline-none focus:border-[#F3F3F3] focus:ring-1 focus:ring-[#cbcaca] transition"
                        />
                      </td>
                    );
                  })}

                  {/* Cancel button cell */}
                  <td className="w-8 px-2 py-2 border border-white bg-white">
                    <button
                      onClick={() => handleRemoveRow(rowIndex)}
                      title="Remove row"
                      className="text-white bg-red-600 hover:bg-white hover:text-red-600 p-1 rounded-full transition"
                    >
                      <FaTimes />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddTable;
