import type { Session } from "next-auth";
import { SessionContextValue, useSession } from "next-auth/react";
import { useMemo } from "react";

enum SessionStatus {
  authenticated = "authenticated",
}

export const useAuth = () => {
  const session = useSession();
  const isSignedIn = session?.status === SessionStatus.authenticated;

  let useAuth = {
    isSignedIn,
    ...session,
  };

  useMemo(() => {
    useAuth = {
      isSignedIn,
      ...session,
    };

    return useAuth;
  }, [isSignedIn, session]);

  return useAuth;
};
