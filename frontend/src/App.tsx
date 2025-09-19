import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./pages/Layout";
import StaffList from "./pages/staffList";
import AddStaff from "./pages/AddStaff";
import AddSubject from "./pages/AddSubject";
import SubjectList from "./pages/SubjectList";
import ViewTable from "./pages/view_table";
import Login from "./Login/Login";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ username: string; role: string } | null>(
    null
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/protected", {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser({ username: data.user.username, role: data.user.role });
          console.log("Username:", data.user.username);
          console.log("Role:", data.user.role);
        } else {
          setUser(null);
          console.log("No valid token found");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        {!user && <Route path="*" element={<Login />} />}
        {user && (
          <Route path="/" element={<Layout />}>
            <Route index element={<div>Welcome Home</div>} />
            <Route path="/department/stafflist" element={<StaffList />} />
            <Route path="/department/addstaff" element={<AddStaff />} />
            <Route path="/subjects/addsubject" element={<AddSubject />} />
            <Route path="/subjects/subjectList" element={<SubjectList />} />
            <Route path="/viewtimetable/class" element={<ViewTable />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
};

export default App;
