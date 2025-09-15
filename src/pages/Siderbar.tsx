import React, { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import '../styles/Sidebar.css';

interface SidebarProps {
  setActivePage: (page: string) => void;
  role: string;
}

const Sidebar: React.FC<SidebarProps> = ({ setActivePage, role }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [pendingLabCount, setPendingLabCount] = useState<number>(0);

  const isAdmin = role?.toUpperCase() === 'ADMIN';

  const toggleMenu = (menuName: string) => {
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

  const handleMenuClick = (page: string) => {
    setActivePage(page);
    setActiveMenu(null);
  };

  // Fetch pending lab requests count for "LAB RECEIVED" red dot badge
  useEffect(() => {
    const fetchPendingLabCount = async () => {
      try {
        const res = await fetch('/api/Lab/pendingLabRequestsCount');
        if (res.ok) {
          const data = await res.json();
          setPendingLabCount(data.pendingLabRequestsCount);
          console.log(pendingLabCount);
        } else {
          console.error('Failed to fetch pending lab requests count');
        }
      } catch (error) {
        console.error('Error fetching pending lab requests count:', error);
      }
    };

    fetchPendingLabCount();

    // Optional: Poll every 60 seconds to update count
    const intervalId = setInterval(fetchPendingLabCount, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return ( 
    <div className="sidebar">
      {/* DEPARTMENT */}
      <div className="menu-item" onClick={() => toggleMenu('department')}>
        <span>DEPARTMENT</span>
        {activeMenu === 'department' ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      {activeMenu === 'department' && (
        <div className="submenu">
          {/* CREATE-DEPARTMENT: Only for ADMIN */}
          {isAdmin && (
            <div className="submenu-item" onClick={() => handleMenuClick('admin')}>
              CREATE-DEPARTMENT
            </div>
          )}
          {/* ADD STAFF: Only for USER */}
          {!isAdmin && (
            <div className="submenu-item" onClick={() => handleMenuClick('Department')}>
              ADD STAFF
            </div>
          )}
          {/* SHOW STAFF: For both */}
          {!isAdmin && (
            <div className="submenu-item" onClick={() => handleMenuClick('viewstaff')}>
              SHOW STAFF
            </div>
          )}
        </div>
      )}

      {/* USER ONLY MENUS */}
      {!isAdmin && (
        <>
          {/* SUBJECT */}
          <div className="menu-item" onClick={() => toggleMenu('subject')}>
            <span>SUBJECT</span>
            {activeMenu === 'subject' ? <FiChevronUp /> : <FiChevronDown />}
          </div>
          {activeMenu === 'subject' && (
            <div className="submenu">
              <div className="submenu-item" onClick={() => handleMenuClick('subject')}>
                ADD SUBJECT
              </div>
              <div className="submenu-item" onClick={() => handleMenuClick('viewSubject')}>
                VIEW SUBJECT
              </div>
            </div>
          )}

          {/* TIMETABLE */}
          <div className="menu-item" onClick={() => handleMenuClick('Table')}>
            TIMETABLE
          </div>

          {/* REQUEST */}
          <div className="menu-item" onClick={() => toggleMenu('request')}>
            <span>REQUEST</span>
            {activeMenu === 'request' ? <FiChevronUp /> : <FiChevronDown />}
          </div>
          {activeMenu === 'request' && (
            <div className="submenu">
              <div className="submenu-item" onClick={() => handleMenuClick('pending')}>
                SEND
              </div>
              <div className="submenu-item" onClick={() => handleMenuClick('received')}>
                RECEIVED
              </div>
              {/* LAB RECEIVED with red dot */}
              <div
                className="submenu-item lab-received"
                onClick={() => handleMenuClick('labReceived')}
                style={{ position: 'relative' }}
              >
                LAB RECEIVED
                {pendingLabCount > 0 && <span className="red-dot" />}
              </div>
            </div>
          )}
        </>
      )}

      {/* VIEW TABLE */}
      <div className="menu-item" onClick={() => toggleMenu('viewTable')}>
        <span>VIEW TABLE</span>
        {activeMenu === 'viewTable' ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      {activeMenu === 'viewTable' && (
        <div className="submenu">
          <div className="submenu-item" onClick={() => handleMenuClick('ViewTable')}>
            CLASS TABLE
          </div>
          <div className="submenu-item" onClick={() => handleMenuClick('Tablestaff')}>
            STAFF TABLE
          </div>
          <div className="submenu-item" onClick={() => handleMenuClick('viewOverallTable')}>
            OVERALL TABLE
          </div>
          <div className="submenu-item" onClick={() => handleMenuClick('LabTable')}>
            LAB TABLE
          </div>
        </div>
      )}

      {/* LAB MANAGEMENT - Different for admin and user */}
      <div className="menu-item" onClick={() => toggleMenu('lab')}>
        <span>LAB</span>
        {activeMenu === 'lab' ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      {activeMenu === 'lab' && (
        <div className="submenu">
          {/* LAB CREATION - Only visible to admin */}
          {isAdmin && (
            <div className="submenu-item" onClick={() => handleMenuClick('labCreation')}>
              LAB CREATION
            </div>
          )}
          {/* VIEW LAB - Visible to both admin and user */}
          <div className="submenu-item" onClick={() => handleMenuClick('viewLab')}>
            VIEW LAB
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

  