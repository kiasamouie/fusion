import { useTheme } from "../../context/ThemeContext";
import "./StatCard.css";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "primary" | "secondary" | "success" | "warning" | "error";
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  color = "primary",
}) => {
  const { theme } = useTheme();

  const colorMap = {
    primary: theme.accent.primary,
    secondary: theme.accent.secondary,
    success: theme.accent.success,
    warning: theme.accent.warning,
    error: theme.accent.error,
  };

  return (
    <div
      className="stat-card"
      style={{
        backgroundColor: theme.bg.primary,
        borderColor: theme.border.primary,
        boxShadow: theme.shadow,
      }}
    >
      <div
        className="stat-icon"
        style={{
          backgroundColor: colorMap[color] + "15",
          color: colorMap[color],
        }}
      >
        {icon}
      </div>

      <div className="stat-content">
        <p className="stat-title" style={{ color: theme.text.secondary }}>
          {title}
        </p>
        <h3 className="stat-value" style={{ color: theme.text.primary }}>
          {value}
        </h3>

        {trend && (
          <p
            className="stat-trend"
            style={{
              color: trend.isPositive ? theme.accent.success : theme.accent.error,
            }}
          >
            {trend.isPositive ? "↑" : "↓"} {trend.value}% from last month
          </p>
        )}
      </div>
    </div>
  );
};
