import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

enum SessionStatus {
  authenticated = "authenticated",
}

interface useAuthData {
  isSignedIn: boolean;
  session: unknown;
}

export const useAuth = () => {
  const session = useSession();
  const isSignedIn = session?.status === SessionStatus.authenticated;

  let useAuth: useAuthData = {
    isSignedIn,
    session,
  };

  useMemo(() => {
    useAuth = {
      isSignedIn,
      session,
    };

    return useAuth;
  }, [isSignedIn, session]);

  return useAuth;
};
