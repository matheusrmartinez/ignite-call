import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { name, username } = req.body;

  const user = await prisma.user.create({
    data: { name, username },
  });

  return res.status(201).json(user);
}
