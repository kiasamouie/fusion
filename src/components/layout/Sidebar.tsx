import { useMenu } from "@refinedev/core";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import "./Sidebar.css";

export const Sidebar: React.FC = () => {
  const { menuItems } = useMenu();
  const { theme } = useTheme();

  const menuIcons: Record<string, string> = {
    dashboard: "📊",
    customers: "👥",
    cards: "🎟️",
    stamps: "⭐",
    wallets: "📱",
    company: "🏢",
    settings: "⚙️",
  };

  return (
    <aside
      className="sidebar"
      style={{
        backgroundColor: theme.bg.secondary,
        borderRightColor: theme.border.primary,
      }}
    >
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const key = item.key || item.name || "";
          const icon = menuIcons[key] || "📄";

          return (
            <Link
              key={key}
              to={item.route || "#"}
              className="sidebar-link"
              style={{ color: theme.text.primary }}
            >
              <span className="sidebar-icon">{icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
