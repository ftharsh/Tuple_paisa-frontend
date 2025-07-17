import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Avatar1 from "../../media/images/avatar1.jpeg";
import Avatar2 from "../../media/images/avatar2.jpeg";
import Avatar3 from "../../media/images/avatar3.jpeg";
import Avatar4 from "../../media/images/avatar4.jpeg";
import Avatar5 from "../../media/images/avatar5.jpeg";
import Avatar6 from "../../media/images/avatar6.jpeg";
import {
  LayoutDashboard,
  BarChart2,
  HelpCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { clearToken } from "../utils/authService.js";

const avatars = [Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6];
const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

const UserProfile = ({ username, compact = false }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        compact ? "p-2" : "p-6"
      } text-center bg-gradient-to-b from-blue-50 to-white`}
    >
      <div
        className={`${
          compact ? "w-20 h-20" : "w-40 h-40"
        } rounded-full border-4 border-blue-200 mb-4 overflow-hidden flex items-center justify-center bg-white shadow-lg`}
      >
        <img
          src={randomAvatar}
          alt="Avatar"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="space-y-1">
        <h2
          className={`${
            compact ? "text-base" : "text-xl"
          } font-bold tracking-wide text-blue-900`}
        >
          WELCOME
        </h2>
        <p
          className={`${
            compact ? "text-lg" : "text-2xl"
          } font-medium tracking-wider text-blue-700`}
        >
          {username || "username"}
        </p>
      </div>
    </div>
  );
};

const MenuItem = ({ icon, label, isActive, onClick }) => {
  const baseClasses =
    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 cursor-pointer";
  const activeClasses = "text-blue-700 bg-blue-100 hover:bg-blue-200";
  const inactiveClasses = "text-blue-600 hover:bg-blue-50";

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {icon}
      <span className={isActive ? "font-medium" : ""}>{label}</span>
    </div>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState({ username: "" });
  const [activeItem, setActiveItem] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/dashboard") setActiveItem("Dashboard");
    else if (path === "/analytics") setActiveItem("Analytics");
    else {
      const pathName = path.substring(1);
      if (pathName) {
        setActiveItem(pathName.charAt(0).toUpperCase() + pathName.slice(1));
      }
    }

    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setUserData({ username });
    }
  }, []);

  const handleLogout = () => {
    clearToken();
    navigate("/");
  };

  const handleItemClick = (label, path) => {
    setActiveItem(label);
    if (path) {
      navigate(path);
    }
  };

  const mainMenuItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      path: "/dashboard",
    },
    { icon: <BarChart2 size={20} />, label: "Analytics", path: "/analytics" },
  ];

  const otherMenuItems = [
    { icon: <HelpCircle size={20} />, label: "Help", path: "/help" },
    { icon: <LogOut size={20} />, label: "Logout", onClick: handleLogout },
  ];

  const renderSidebar = () => (
    <>
      {/* User Profile - Only shown in desktop view */}
      {!isMobile && (
        <UserProfile username={userData.username} compact={false} />
      )}

      <div className="flex-1 flex flex-col justify-between">
        <nav className="flex-1">
          {/* Main Menu */}
          <div className="px-3 py-2">
            <div className="flex flex-col gap-1">
              {mainMenuItems.map((item) => (
                <MenuItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  isActive={activeItem === item.label}
                  onClick={() => handleItemClick(item.label, item.path)}
                />
              ))}
            </div>
          </div>

          {/* Other Menu */}
          <div className="px-3 py-2">
            <p className="px-3 py-2 text-xs font-semibold text-blue-400">
              OTHER MENU
            </p>
            <div className="flex flex-col gap-1">
              {otherMenuItems.map((item) => (
                <MenuItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  isActive={activeItem === item.label}
                  onClick={
                    item.onClick ||
                    (() => handleItemClick(item.label, item.path))
                  }
                />
              ))}
            </div>
          </div>
        </nav>
        <div className="flex-1"></div>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <div className="fixed z-50 w-full">
        {/* Mobile Header */}
        <div className="bg-white shadow-md p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-blue-600 hover:text-blue-800"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <span className="text-lg font-medium text-blue-700">
              Welcome {userData.username || "User"}
            </span>
          </div>
        </div>

        {/* Mobile Slide-out Menu */}
        <div
          className={`
          fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          {renderSidebar()}
        </div>

        {/* Overlay when menu is open */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}
      </div>
    );
  }

  // Desktop Sidebar
  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 border-r border-blue-100 flex flex-col shadow-lg">
      {renderSidebar()}
    </div>
  );
};

export default Sidebar;
