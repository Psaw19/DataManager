import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials: any): Promise<any> {
        const { email, password } = credentials;
        try {
          await dbConnect();
          const user = await UserModel.findOne({ email });
          if (!user) {
            throw new Error("No user found");
          }

          const verifiedPassword = await bcrypt.compare(
            password,
            user?.password
          );

          if (!verifiedPassword) {
            throw new Error("Invalid Password");
          }
          return user;
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.name = user.name;
        token.email = user.email;
      }

      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user._id = token._id;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      // console.log({ session });
      // console.log({ SessionToken: token });
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
