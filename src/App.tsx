// App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./pages/Layout";
import StaffList from "./pages/staffList";
import AddStaff from "./pages/AddStaff"
import AddSubject from "./pages/AddSubject";
import SubjectList from "./pages/SubjectList";
import ViewTable from "./pages/view_table";
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Layout with nested routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<div>Welcome Home</div>} />
          <Route path="/department/stafflist" element={<StaffList />} />
          <Route path="/department/addstaff" element={<AddStaff/>}/>
          <Route path="/subjects/addsubject" element={<AddSubject/>}/>
          <Route path="/subjects/subjectList" element={<SubjectList/>}/>
          <Route path="/viewtimetable/class" element={<ViewTable />} />
        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
