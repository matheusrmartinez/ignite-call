import { AuthScope, Scope } from "@/enums/authScopes";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Routes } from "@/enums/routes";
import { PrismaAdapter } from "@/lib/auth/prisma-adapter";
import { NextApiRequest, NextApiResponse } from "next";

const scopes = {
  email: AuthScope.email,
  profile: AuthScope.profile,
  calendar: AuthScope.calendar,
};

export const buildNextAuthOptions = (
  req: NextApiRequest,
  res: NextApiResponse
): NextAuthOptions => {
  return {
    adapter: PrismaAdapter(req, res),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        authorization: {
          params: {
            scope: Object.values(scopes).join(" "),
          },
        },
      }),
    ],
    callbacks: {
      async signIn({ account }) {
        if (!account?.scope?.includes(scopes[Scope.calendar])) {
          return `${Routes.connectCalendar}/?error=permissions`;
        }

        return true;
      },
    },
  };
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, buildNextAuthOptions(req, res));
}
