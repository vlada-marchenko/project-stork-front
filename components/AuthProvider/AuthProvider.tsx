"use client";

import { getUser, refresh } from "@/lib/api/apiClient";
import { useAuth } from "@/lib/store/authStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const setUser = useAuth((state) => state.setUser);
  const clearIsAuthenticated = useAuth((state) => state.clearIsAuthenticated);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await refresh();
        await new Promise((resolve) => setTimeout(resolve, 100));
        const res = await getUser();
        if (res) setUser(res);
      } catch {
        clearIsAuthenticated();
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AuthProvider;
