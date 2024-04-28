"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

interface User {
  _id?: string;
  username?: string;
  fullname?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface UseClientUserResult {
  loading: boolean;
  user: User | null;
}

const useClientUser = (): UseClientUserResult => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setUser(session.user as User);
      setLoading(false);
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [session]);

  return { loading, user };
};

export default useClientUser;
