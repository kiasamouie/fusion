import { useGetIdentity } from "@refinedev/core";
import { User } from "../types";

export const useCompanyContext = () => {
  const { data: identity } = useGetIdentity<User>();

  return {
    companyId: identity?.company_id,
    userId: identity?.id,
    userEmail: identity?.email,
    userRole: identity?.role,
    userName: identity?.full_name,
    isAdmin: identity?.role === "admin",
  };
};
