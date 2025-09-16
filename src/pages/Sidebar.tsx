import React, { type FC, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUser,
  FaCar,
  FaList,
  FaPlusSquare,
  FaClipboardList,
  FaRoute,
  FaTools,
  FaGasPump,
  FaBell,
  FaChartBar,
  FaShieldAlt,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { BsFillTriangleFill } from "react-icons/bs";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface SidebarMergedProps {
  role: string;
}

const Sidebar: FC<SidebarMergedProps> = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [pendingLabCount, setPendingLabCount] = useState(0);

  const isAdmin = role.toUpperCase() === "ADMIN";

  // Fetch pending lab requests count
  useEffect(() => {
    const fetchPendingLabCount = async () => {
      try {
        const res = await fetch("/api/Lab/pendingLabRequestsCount");
        if (res.ok) {
          const data = await res.json();
          setPendingLabCount(data.pendingLabRequestsCount);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPendingLabCount();
    const intervalId = setInterval(fetchPendingLabCount, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => {
      const newState: { [key: string]: boolean } = {};
      Object.keys(prev).forEach((key) => {
        newState[key] = false;
      });
      newState[menu] = !prev[menu];
      return newState;
    });
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center h-[40px] w-full gap-2 px-2 py-2 rounded-xl transition-all font-poppins font-medium text-[16px] leading-[20px] tracking-[0%] ${
      isActive
        ? "bg-black text-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
        : "text-black hover:bg-gray-50"
    } max-[330px]:text-[14px] max-[330px]:h-[36px]`;

  const menuItemClass =
    "flex items-center justify-between px-2 py-2 cursor-pointer text-company-color hover:text-blue-800 transition-all font-poppins font-medium text-[16px] leading-[20px] tracking-[0%] max-[330px]:text-[14px]";

  const getSubMenuClass = (menu: string) =>
    `ml-4 mt-2 flex flex-col gap-1 font-medium text-[16px] leading-[20px] tracking-[0%] transition-all duration-300 overflow-hidden ${
      openMenus[menu] ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
    } max-[330px]:text-[14px]`;

  const menuData = [
    {
      key: "dashboard",
      icon: <MdDashboard className="w-6 h-6" />,
      label: "Dashboard",
      links: [],
    },
    {
      key: "department",
      icon: <FaUser className="w-5 h-5" />,
      label: "Department",
      links: [
        isAdmin
          ? { to: "/department/create", icon: <FaPlusSquare />, label: "Create Department" }
          : { to: "/department/addstaff", icon: <FaPlusSquare />, label: "Add Staff" },
        !isAdmin
          ? { to: "/department/showstaff", icon: <FaList />, label: "Show Staff" }
          : null,
      ].filter(Boolean),
    },
    !isAdmin
      ? {
          key: "subject",
          icon: <FaClipboardList className="w-5 h-5" />,
          label: "Subject",
          links: [
            { to: "/subject/add", icon: <FaPlusSquare />, label: "Add Subject" },
            { to: "/subject/view", icon: <FaList />, label: "View Subject" },
          ],
        }
      : null,
    !isAdmin
      ? {
          key: "timetable",
          icon: <FaClipboardList className="w-5 h-5" />,
          label: "Timetable",
          links: [{ to: "/timetable", icon: <FaList />, label: "Timetable" }],
        }
      : null,
    !isAdmin
      ? {
          key: "request",
          icon: <FaClipboardList className="w-5 h-5" />,
          label: "Request",
          links: [
            { to: "/request/send", icon: <FaPlusSquare />, label: "Send" },
            { to: "/request/received", icon: <FaList />, label: "Received" },
            {
              to: "/request/labReceived",
              icon: <FaClipboardList />,
              label: "Lab Received",
              badge: pendingLabCount,
            },
          ],
        }
      : null,
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50 z-500">
      {/* Top Header */}
      <div className="fixed top-0 left-0 right-0 w-60 z-50 h-16 bg-company-color flex items-center px-4 max-[330px]:w-[200px]">
        <button
          onClick={() => setIsOpen(true)}
          className={`text-white p-2 xl:hidden mr-4 cursor-pointer ${
            isOpen ? "hidden" : "block"
          }`}
        >
          <BsFillTriangleFill className="w-5 h-5" />
        </button>
        <span className="text-white font-semibold">App Name</span>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 xl:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-white shadow-md px-4 py-6 pt-20 z-40 transition-transform duration-300 ease-in-out max-[330px]:w-[200px] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } xl:translate-x-0 xl:static xl:block overflow-hidden`}
      >
        <nav className="flex flex-col gap-4 text-sm font-medium max-[330px]:text-[14px]">
          {menuData.map(({ key, icon, label, links, ...rest }: any) => (
            <div key={key}>
              <div className={menuItemClass} onClick={() => toggleMenu(key)}>
                <span className="flex items-center gap-2 max-[330px]:gap-1">
                  {icon} {label}
                </span>
                {links && links.length > 0 && (
                  <BsFillTriangleFill
                    className={`transition-transform duration-300 w-[13px] h-[10px] ${
                      openMenus[key] ? "" : "rotate-180"
                    }`}
                  />
                )}
              </div>
              {links && links.length > 0 && (
                <div className={getSubMenuClass(key)}>
                  {links.map(({ to, icon, label, badge }: any) => (
                    <NavLink
                      key={to}
                      to={to}
                      className={linkClass}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="flex items-center gap-2">
                        {icon} {label}
                        {badge && badge > 0 && (
                          <span className="ml-auto bg-red-500 w-2 h-2 rounded-full" />
                        )}
                      </span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
