import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProtectedRoute from "./service/ProtectedRoute";

import Layout from "./pages/Layout";
import StaffList from "./pages/staffList";
import AddStaff from "./pages/AddStaff";
import AddSubject from "./pages/AddSubject";
import SubjectList from "./pages/SubjectList";
import ViewTable from "./pages/view_table";
import Login from "./Login/Login";
import api from "./service/api";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ username: string; role: string } | null>(
    null
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/protected");
        setUser({ username: res.data.user.username, role: res.data.user.role });
        console.log("Username:", res.data.user.username);
        console.log("Role:", res.data.user.role);
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
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <ProtectedRoute user={user}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <div>Welcome {user?.role === "admin" ? "Admin" : "User"}</div>
            }
          />

          <Route
            path="/department/stafflist"
            element={
              <ProtectedRoute user={user} allowedRoles={["admin"]}>
                <StaffList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/department/addstaff"
            element={
              <ProtectedRoute user={user} allowedRoles={["admin"]}>
                <AddStaff />
              </ProtectedRoute>
            }
          />
          <Route
            path="/subjects/addsubject"
            element={
              <ProtectedRoute user={user} allowedRoles={["admin"]}>
                <AddSubject />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute user={user} allowedRoles={["user"]}>
                <div>User Dashboard</div>
              </ProtectedRoute>
            }
          />

          {/* Shared routes accessible to both */}
          <Route path="/subjects/subjectList" element={<SubjectList />} />
          <Route path="/viewtimetable/class" element={<ViewTable />} />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
