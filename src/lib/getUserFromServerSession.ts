import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/options";

const getUser = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    return session?.user;
  }

  return null;
};

export default getUser;
