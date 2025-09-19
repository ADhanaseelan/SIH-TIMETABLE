import React, { useEffect, useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const periods = [1, 2, 3, 4, 5, 6, 7];

interface TimetableSlot {
  Day: string;
  HourlySlots: {
    [key: string]: {
      Display: string;
      SubjectId: number;
    };
  };
}

const ViewTable: React.FC = () => {
  const tableRef = useRef<HTMLDivElement>(null);

  const [userRole, setUserRole] = useState('');
  const [department, setDepartment] = useState('');
  const [allDepartments, setAllDepartments] = useState<string[]>([]);
  const [year, setYear] = useState('');
  const [semesterOptions, setSemesterOptions] = useState<string[]>([]);
  const [semester, setSemester] = useState('');
  const [section, setSection] = useState('');
  const [timetableData, setTimetableData] = useState<TimetableSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedUser') || '';
    const role = loggedUser || '';
    setUserRole(role.trim().toUpperCase());

    if (role.trim().toUpperCase() === 'ADMIN') {
      fetch('https://localhost:7244/api/Login/departments')
        .then((res) => res.json())
        .then((data) => setAllDepartments(data))
        .catch(() => toast.error('Error loading departments'));
    } else {
      setDepartment(loggedUser.trim().toUpperCase());
    }
  }, []);

  const handleExportPDF = () => {
    if (tableRef.current) {
      html2pdf()
        .set({
          filename: 'timetable.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        })
        .from(tableRef.current)
        .save();
      toast.success('📄 Timetable exported as PDF!');
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = e.target.value;
    setYear(selectedYear);

    switch (selectedYear) {
      case 'First Year':
        setSemesterOptions(['I', 'II']);
        break;
      case 'Second Year':
        setSemesterOptions(['III', 'IV']);
        break;
      case 'Third Year':
        setSemesterOptions(['V', 'VI']);
        break;
      case 'Fourth Year':
        setSemesterOptions(['VII', 'VIII']);
        break;
      default:
        setSemesterOptions([]);
        break;
    }

    setSemester('');
  };

  const handleFetchTimetable = async () => {
    if (!year || !semester || !section || !department) {
      toast.warn('⚠️ Please select all fields including Department!');
      return;
    }

    setLoading(true);
    setError('');
    setTimetableData([]);

    try {
      const url = `https://localhost:7244/api/CrossDepartmentAssignments/getCrossTimetable?toDepartment=${encodeURIComponent(
        department.trim()
      )}&year=${encodeURIComponent(year.trim())}&semester=${encodeURIComponent(
        semester.trim()
      )}&section=${encodeURIComponent(section.trim())}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Failed to fetch timetable');
      }

      const normalizedData: TimetableSlot[] = (data.timetable || []).map((entry: any) => ({
        Day: entry.day,
        HourlySlots: Object.fromEntries(
          Object.entries(entry.hourlySlots).map(([key, value]: [string, any]) => [
            key,
            {
              Display: value.display || '---',
              SubjectId: value.subjectId || 0,
            },
          ])
        ),
      }));

      setTimetableData(normalizedData);
      toast.success('✅ Timetable loaded successfully!');
    } catch (err: any) {
      console.error(err);
      const message = err.message || 'Something went wrong';
      setError(message);
      toast.error(`❌ ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto font-sans bg-white">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div className="flex flex-wrap gap-4 justify-around mb-6">
        {userRole === 'ADMIN' && (
          <div className="flex flex-col w-full sm:w-[200px]">
            <label className="text-sm font-bold text-[#003366] mb-1">Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="p-2 text-sm border border-[#003366] rounded text-[#003366]"
            >
              <option value="">Select Department</option>
              {allDepartments.map((dep) => (
                <option key={dep} value={dep}>
                  {dep}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex flex-col w-full sm:w-[200px]">
          <label className="text-sm font-bold text-[#003366] mb-1">Year</label>
          <select
            value={year}
            onChange={handleYearChange}
            className="p-2 text-sm border border-[#003366] rounded text-[#003366]"
          >
            <option value="">Select Year</option>
            <option value="First Year">First Year</option>
            <option value="Second Year">Second Year</option>
            <option value="Third Year">Third Year</option>
            <option value="Fourth Year">Fourth Year</option>
          </select>
        </div>

        <div className="flex flex-col w-full sm:w-[200px]">
          <label className="text-sm font-bold text-[#003366] mb-1">Semester</label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="p-2 text-sm border border-[#003366] rounded text-[#003366]"
          >
            <option value="">Select Semester</option>
            {semesterOptions.map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col w-full sm:w-[200px]">
          <label className="text-sm font-bold text-[#003366] mb-1">Section</label>
          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="p-2 text-sm border border-[#003366] rounded text-[#003366]"
          >
            <option value="">Select Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>

        <button
          onClick={handleFetchTimetable}
          className="bg-[#003366] text-white px-4 py-2 text-base rounded hover:bg-[#002244]"
        >
          📥 View Timetable
        </button>
      </div>

      <div className="text-center mb-4 italic text-[#003366] font-semibold">
        Department: {department || 'Not selected'}
      </div>

      {loading && <p className="text-center text-gray-600">📡 Loading timetable...</p>}
      {error && <p className="text-center text-red-600">❌ {error}</p>}

      <div
        ref={tableRef}
        className="overflow-x-auto border rounded-md shadow-sm bg-white"
      >
        <table className="table-auto border-collapse border border-gray-300 text-center w-full min-w-[700px] text-sm sm:text-base">
          <thead className="bg-[#003366] text-white">
            <tr>
              <th className="border border-gray-300 px-3 py-2">Day</th>
              {periods.map((period) => (
                <th key={period} className="border border-gray-300 px-3 py-2">
                  Period {period}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day) => {
              const row = timetableData.find((slot) => slot.Day === day);
              return (
                <tr key={day} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 bg-[#003366] text-white font-bold">
                    {day}
                  </td>
                  {periods.map((period) => {
                    const cell = row?.HourlySlots?.[period.toString()];
                    return (
                      <td key={`${day}-${period}`} className="border border-gray-300 px-3 py-2">
                        {cell && cell.Display !== '---' ? (
                          <div>{cell.SubjectId}</div>
                        ) : (
                          '---'
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center gap-4 mt-5">
        <button
          onClick={handleExportPDF}
          className="bg-[#003366] text-white px-4 py-2 text-base rounded hover:bg-[#002244]"
        >
          📤 Export to PDF
        </button>
      </div>
    </div>
  );
};

export default ViewTable;
