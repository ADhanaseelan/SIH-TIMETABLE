import React from "react";

interface TableProps {
  headers: string[];
  rows: (string | React.ReactNode)[][];
}

const Table: React.FC<TableProps> = ({ headers, rows }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-blue-800 text-white">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-2 text-center border">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2 text-center border">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
