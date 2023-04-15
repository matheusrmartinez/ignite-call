import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { buildNextAuthOptions } from "../auth/[...nextauth].api";
import { prisma } from "@/lib/prisma";

interface IntervalProps {
  intervals: {
    weekDay: number;
    startTimeInMinutes: number;
    endTimeInMinutes: number;
  }[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).end();
  }

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res)
  );

  if (!session) {
    return res.status(401).end();
  }

  const { intervals }: IntervalProps = req.body || {};

  //TO-DO: Unfortunately the SQL Lite does not support createMany method.
  await Promise.all(
    intervals.map((interval) => {
      return prisma.userTimeInterval.create({
        data: {
          user_id: session.user.id,
          time_start_in_minutes: interval.startTimeInMinutes,
          time_end_in_minutes: interval.endTimeInMinutes,
          week_day: interval.weekDay,
        },
      });
    })
  );

  return res.status(201).end();
}
