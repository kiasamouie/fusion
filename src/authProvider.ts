import { AuthProvider } from "@refinedev/core";
import { supabaseClient } from "./supabaseClient";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          error: {
            name: "LoginError",
            message: error.message,
          },
        };
      }

      if (data?.user) {
        return {
          success: true,
          redirectTo: "/dashboard",
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error: {
          name: "LoginError",
          message: error?.message || "Login failed",
        },
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Login failed",
      },
    };
  },

  register: async ({ email, password }) => {
    try {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          error: {
            name: "RegisterError",
            message: error.message,
          },
        };
      }

      if (data?.user) {
        return {
          success: true,
          redirectTo: "/login",
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error: {
          name: "RegisterError",
          message: error?.message || "Registration failed",
        },
      };
    }

    return {
      success: false,
      error: {
        name: "RegisterError",
        message: "Registration failed",
      },
    };
  },

  logout: async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      return {
        success: false,
        redirect: false,
      };
    }

    return {
      success: true,
      redirect: true,
      redirectTo: "/login",
    };
  },

  check: async () => {
    try {
      const { data, error } = await supabaseClient.auth.getSession();

      const { session } = data;

      if (!session) {
        return {
          authenticated: false,
          redirect: "/login",
          logout: true,
          error: {
            name: "NotAuthenticated",
            message: "User is not authenticated",
          },
        };
      }

      return {
        authenticated: true,
      };
    } catch (error) {
      return {
        authenticated: false,
        redirect: "/login",
        logout: true,
        error: {
          name: "CheckError",
          message: "Failed to check authentication",
        },
      };
    }
  },

  onError: async (error) => {
    console.error(error);
    return { logout: true };
  },

  getPermissions: async () => {
    const { data } = await supabaseClient.auth.getUser();

    if (data?.user) {
      return null;
    }

    return null;
  },

  getIdentity: async () => {
    const { data } = await supabaseClient.auth.getUser();

    if (!data?.user) {
      return null;
    }

    // Fetch full profile from database
    const { data: profile, error } = await supabaseClient
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single();

    if (error || !profile) {
      // Fallback to auth user data
      return {
        id: data.user.id,
        email: data.user.email,
        name: data.user.email,
        avatar: data.user.user_metadata?.avatar_url,
      };
    }

    return {
      id: profile.id,
      email: profile.email || data.user.email,
      name: profile.full_name || profile.email || data.user.email,
      avatar: profile.avatar_url,
      company_id: profile.company_id,
      phone: profile.phone,
      full_name: profile.full_name,
      role: profile.role,
    };
  },
};
