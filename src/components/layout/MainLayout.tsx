import { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useTheme } from "../../context/ThemeContext";
import "./MainLayout.css";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className="main-layout">
      <Header />
      <div className="layout-container">
        <Sidebar />
        <main
          className="main-content"
          style={{ backgroundColor: theme.bg.secondary }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};
