import { Refine } from "@refinedev/core";
import routerBindings, {
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { ConfigProvider, theme } from "antd";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { useState, useEffect } from "react";

import { ErrorComponent } from "@refinedev/antd";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { supabaseClient } from "./supabaseClient";
import { authProvider } from "./authProvider";
import { dataProvider } from "@refinedev/supabase";

import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import CardsListPage from "./pages/cards/List";
import CardsShowPage from "./pages/cards/Show";
import CardsCreatePage from "./pages/cards/Create";
import CardsEditPage from "./pages/cards/Edit";
import CustomersListPage from "./pages/customers/List";
import CustomersShowPage from "./pages/customers/Show";
import CustomersCreatePage from "./pages/customers/Create";
import CustomersEditPage from "./pages/customers/Edit";
import StampsListPage from "./pages/stamps/List";
import StampsShowPage from "./pages/stamps/Show";
import StampsCreatePage from "./pages/stamps/Create";
import WalletsListPage from "./pages/wallets/List";
import WalletsShowPage from "./pages/wallets/Show";
import WalletsCreatePage from "./pages/wallets/Create";
import ProfilePage from "./pages/profile/ProfilePage";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true;
  });

  useEffect(() => {
    const handleThemeChange = (event: CustomEvent) => {
      setIsDarkMode(event.detail.isDark);
      document.documentElement.setAttribute("data-theme", event.detail.isDark ? "dark" : "light");
    };

    window.addEventListener("themeChange", handleThemeChange as EventListener);
    
    // Set initial theme
    document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
    
    return () => {
      window.removeEventListener("themeChange", handleThemeChange as EventListener);
    };
  }, [isDarkMode]);
  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            colorPrimary: "#6366f1",
          },
        }}
      >
        <Refine
          dataProvider={dataProvider(supabaseClient)}
          routerProvider={routerBindings}
          authProvider={authProvider}
          resources={[
            {
              name: "dashboard",
              list: "/dashboard",
              meta: {
                canDelete: false,
                label: "Dashboard",
              },
            },
            {
              name: "cards",
              list: "/cards/list",
              create: "/cards/create",
              edit: "/cards/:id/edit",
              show: "/cards/:id/show",
              meta: {
                label: "Loyalty Cards",
              },
            },
            {
              name: "customers",
              list: "/customers/list",
              create: "/customers/create",
              edit: "/customers/:id/edit",
              show: "/customers/:id/show",
              meta: {
                label: "Customers",
              },
            },
            {
              name: "stamps",
              list: "/stamps/list",
              create: "/stamps/create",
              show: "/stamps/:id/show",
              meta: {
                label: "Stamps",
              },
            },
            {
              name: "wallets",
              list: "/wallets/list",
              create: "/wallets/create",
              show: "/wallets/:id/show",
              meta: {
                label: "Wallets",
              },
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
        >
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              element={
                <ProtectedRoute>
                  <Layout>
                    <Outlet />
                  </Layout>
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/cards/list" element={<CardsListPage />} />
              <Route path="/cards/create" element={<CardsCreatePage />} />
              <Route path="/cards/:id/edit" element={<CardsEditPage />} />
              <Route path="/cards/:id/show" element={<CardsShowPage />} />
              <Route path="/customers/list" element={<CustomersListPage />} />
              <Route path="/customers/create" element={<CustomersCreatePage />} />
              <Route path="/customers/:id/edit" element={<CustomersEditPage />} />
              <Route path="/customers/:id/show" element={<CustomersShowPage />} />
              <Route path="/stamps/list" element={<StampsListPage />} />
              <Route path="/stamps/create" element={<StampsCreatePage />} />
              <Route path="/stamps/:id/show" element={<StampsShowPage />} />
              <Route path="/wallets/list" element={<WalletsListPage />} />
              <Route path="/wallets/create" element={<WalletsCreatePage />} />
              <Route path="/wallets/:id/show" element={<WalletsShowPage />} />
              <Route path="/" element={<NavigateToResource resource="dashboard" />} />
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>

          <UnsavedChangesNotifier />
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
