"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import { User } from "@/types";

interface UseClientUserResult {
  loading: boolean;
  user: User | null;
}

const useClientUser = (): UseClientUserResult => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  const { data: session } = useSession();

  useEffect(() => {
    session?.user ? setUser(session?.user) : null;
    setLoading(false);
  }, [session]);

  return { loading, user };
};

export default useClientUser;
