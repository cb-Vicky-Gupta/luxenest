import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface AuthOptions {
  redirectTo?: string;
  requireAuth?: boolean;
}

const useAuth = ({
  redirectTo = "/login",
  requireAuth = true,
}: AuthOptions = {}) => {
  const [user, setUser] = useState<null | {
    id: string;
    name: string;
    role: string;
  }>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setUser({ id: "123", name: "John Doe", role: "admin" });
      } else if (requireAuth) {
        router.push(redirectTo);
      }
    };

    checkAuth();
  }, [router, requireAuth, redirectTo]);

  return user;
};

export default useAuth;
