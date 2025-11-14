import { useLogout, useGetIdentity, useMenu } from "@refinedev/core";
import { ReactNode, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  CreditCardOutlined,
  TeamOutlined,
  GiftOutlined,
  WalletOutlined,
  UserOutlined,
  SunOutlined,
  MoonOutlined,
} from "@ant-design/icons";
import "./Layout.css";

interface LayoutProps {
  children: ReactNode;
  onThemeToggle?: (isDark: boolean) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  dashboard: <DashboardOutlined />,
  cards: <CreditCardOutlined />,
  customers: <TeamOutlined />,
  stamps: <GiftOutlined />,
  wallets: <WalletOutlined />,
};

export default function Layout({ children, onThemeToggle }: LayoutProps) {
  const navigate = useNavigate();
  const { mutate: logout } = useLogout();
  const { data: user } = useGetIdentity();
  const { menuItems } = useMenu();
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem("theme");
    const dark = savedTheme ? savedTheme === "dark" : true;
    setIsDarkMode(dark);
  }, []);

  const handleLogout = () => {
    logout();
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleThemeToggle = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
    if (onThemeToggle) {
      onThemeToggle(newDarkMode);
    }
    // Trigger a custom event for the app to listen to
    window.dispatchEvent(new CustomEvent("themeChange", { detail: { isDark: newDarkMode } }));
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <h2>📊 FusionPos</h2>
          </div>
          <div className="user-menu">
            <button
              onClick={handleThemeToggle}
              className="theme-toggle-btn"
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0 8px",
                color: "#a0a0a0",
                fontSize: 16,
                transition: "color 0.3s ease",
              }}
            >
              {isDarkMode ? <SunOutlined /> : <MoonOutlined />}
            </button>
            <button
              onClick={handleProfileClick}
              className="user-email"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0 8px",
                color: "#a0a0a0",
                fontSize: 14,
                transition: "color 0.3s ease",
              }}
              title="Click to view profile"
            >
              <UserOutlined style={{ marginRight: 8 }} />
              {user?.name}
            </button>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="layout-container">
        <aside className="sidebar">
          <nav className="sidebar-nav">
            {menuItems.map((item) => (
              <Link
                key={item.key}
                to={item.route || "/"}
                className="sidebar-link"
              >
                <span className="sidebar-icon">
                  {iconMap[item.name as keyof typeof iconMap] || "•"}
                </span>
                <span className="sidebar-label">{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="main-content">
          {children}
        </main>
      </div>

      <footer className="footer">
        <p>&copy; 2025 FusionPos. All rights reserved.</p>
      </footer>
    </div>
  );
}
