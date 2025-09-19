// ViewTable.tsx
import React, { useState } from "react";
import { FaPen, FaSave } from "react-icons/fa";
import { RiDeleteBin7Fill } from "react-icons/ri";

interface ViewTableProps {
  columns: string[];
  colWidths?: string[];
  initialRows?: any[];
}

const ViewTable: React.FC<ViewTableProps> = ({
  columns,
  colWidths,
  initialRows = [],
}) => {
  const [rows, setRows] = useState<any[]>(initialRows);
  const [editingRow, setEditingRow] = useState<number | null>(null);

  const handleRemoveRow = (index: number) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  const handleToggleEdit = (rowIndex: number) => {
    if (editingRow === rowIndex) {
      // Save and exit edit mode
      setEditingRow(null);
    } else {
      // Enable edit mode for this row
      setEditingRow(rowIndex);
    }
  };

  return (
    <div className="p-4">
      <div className="overflow-x-auto max-h-[400px] rounded-lg">
        <table className="min-w-full table-fixed border-collapse">
          {/* Header */}
          <thead className="bg-[#203C8A] text-white sticky top-0 z-10">
            <tr>
              <th className="w-12 h-20 px-3 py-2 text-center font-semibold border-4 border-white">
                No
              </th>
              {columns.map((col, index) => {
                const w = colWidths?.[index] ?? "w-32";
                return (
                  <th
                    key={index}
                    className={`${w} px-3 py-2 text-center font-semibold border-4 border-white`}
                  >
                    {col}
                  </th>
                );
              })}
              <th className="w-24 px-3 py-2 text-center font-semibold border-4 border-white">
                Options
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 2}
                  className="text-center py-3 text-gray-500"
                >
                  No rows available.
                </td>
              </tr>
            ) : (
              rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`${
                    rowIndex % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                  } hover:bg-gray-100`}
                >
                  {/* No */}
                  <td className="h-18 px-3  py-2 text-center border-4 border-white">
                    {rowIndex + 1 < 10 ? `0${rowIndex + 1}` : rowIndex + 1}
                  </td>

                  {/* Dynamic columns */}
                  {columns.map((col, colIndex) => {
                    const w = colWidths?.[colIndex] ?? "w-32";
                    return (
                      <td
                        key={colIndex}
                        className={`${w} px-3 py-2  text-center border-4 border-white`}
                      >
                        {editingRow === rowIndex ? (
                          <input
                            type="text"
                            value={row[col]}
                            onChange={(e) => {
                              const copy = [...rows];
                              copy[rowIndex][col] = e.target.value;
                              setRows(copy);
                            }}
                            className="w-full text-center rounded border border-gray-300 px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue-300"
                          />
                        ) : (
                          <span>{row[col]}</span>
                        )}
                      </td>
                    );
                  })}

                  {/* Options */}
                  <td className="  mt-5 flex justify-center align-center gap-2">
                    <button
                      onClick={() => handleToggleEdit(rowIndex)}
                      className={`text-white p-1 w-6 h-6 rounded ${
                        editingRow === rowIndex
                          ? "bg-green-600 hover:bg-green-700 h-10 w-10 flex justify-center items-center rounded-full"
                          : "bg-[#203C8A] hover:bg-blue-700 h-10 w-10 flex justify-center items-center rounded-full"
                      }`}
                    >
                      {editingRow === rowIndex ? <FaSave /> : <FaPen />}
                    </button>
                    <button
                      onClick={() => handleRemoveRow(rowIndex)}
                      className="text-white w-10 h-10 bg-[#FF0000] hover:bg-red-700 flex justify-center items-center rounded-full "
                    >
                      <RiDeleteBin7Fill className="w-6 h-6" />
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

export default ViewTable;
