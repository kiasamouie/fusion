import { useLogout, useGetIdentity } from "@refinedev/core";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { User } from "../../types";
import "./Header.css";

export const Header: React.FC = () => {
  const { mutate: logout } = useLogout();
  const { data: identity } = useGetIdentity<User>();
  const { theme, mode, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header
      className="header"
      style={{ backgroundColor: theme.bg.primary, borderBottomColor: theme.border.primary }}
    >
      <div className="header-content">
        <div className="header-logo">
          <h2 style={{ color: theme.accent.primary }}>🎟️ Loyalty Hub</h2>
        </div>

        <div className="header-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
            style={{
              color: theme.text.primary,
              backgroundColor: theme.bg.secondary,
              borderColor: theme.border.primary,
            }}
          >
            {mode === "light" ? "🌙" : "☀️"}
          </button>

          <div className="user-section">
            <button
              className="user-button"
              onClick={() => setShowUserMenu(!showUserMenu)}
              style={{ color: theme.text.primary }}
            >
              👤 {identity?.full_name || identity?.email}
            </button>

            {showUserMenu && (
              <div
                className="user-menu"
                style={{
                  backgroundColor: theme.bg.primary,
                  borderColor: theme.border.primary,
                  boxShadow: theme.shadow,
                }}
              >
                <a href="#profile" style={{ color: theme.text.primary }}>
                  Profile
                </a>
                <a href="#settings" style={{ color: theme.text.primary }}>
                  Settings
                </a>
                <hr style={{ borderColor: theme.border.secondary }} />
                <button
                  onClick={() => {
                    logout();
                    setShowUserMenu(false);
                  }}
                  style={{
                    color: theme.accent.error,
                    width: "100%",
                    textAlign: "left",
                    padding: "8px 12px",
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
