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

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Layout with nested routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<div>Welcome Home</div>} />
          <Route path="staff" element={<StaffList />} />
          <Route path="addstaff" element={<AddStaff/>}/>
        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
