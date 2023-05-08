import { getGoogleOAuthToken } from '@/lib/google'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { google } from 'googleapis'
import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.status(405).end()
  }

  const username = String(req.query.username)

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return res.status(400).json({ message: 'User does not exist' })
  }

  const createScheduling = z.object({
    name: z.string(),
    email: z.string().email(),
    remarks: z.string(),
    date: z.coerce.date(),
  })

  const { name, email, remarks, date } = createScheduling.parse(req.body)

  const schedulingDate = dayjs(date).startOf('hour')

  if (schedulingDate.isBefore(new Date())) {
    return res.status(400).json({
      message: 'Data está no passado.',
    })
  }

  const conflictingScheduling = await prisma.scheduling.findFirst({
    where: {
      user_id: user.id,
      date: schedulingDate.toDate(),
    },
  })

  if (conflictingScheduling) {
    return res.status(400).json({
      message: 'Já existe um agendamento marcado para o dia/horário escolhido.',
    })
  }

  const scheduling = await prisma.scheduling.create({
    data: {
      name,
      email,
      remarks,
      date: schedulingDate.toDate(),
      user_id: user.id,
    },
  })

  let calendar

  try {
    calendar = google.calendar({
      version: 'v3',
      auth: await getGoogleOAuthToken(user.id),
    })
  } catch (error) {
    console.log('Failed to fetch refresh token')
    res.status(400).json({
      message: 'Failed to fetch refresh token',
    })
  }

  if (!calendar) return

  try {
    await calendar.events.insert({
      calendarId: 'primary',
      conferenceDataVersion: 1,
      requestBody: {
        summary: `Ignite Call: ${name}`,
        description: remarks,
        start: {
          dateTime: schedulingDate.format(),
        },
        end: {
          dateTime: schedulingDate.add(1, 'hour').format(),
        },
        attendees: [{ email, displayName: name }],
        conferenceData: {
          createRequest: {
            requestId: scheduling.id,
            conferenceSolutionKey: {
              type: 'hangoutsMeet',
            },
          },
        },
      },
    })
  } catch (error) {
    res.status(400).json({
      message: 'Falha ao inserir o novo evento no google calendar.',
    })
  }

  return res.status(201).end()
}
