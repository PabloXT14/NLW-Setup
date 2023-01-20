import { FastifyInstance } from "fastify";
import { prisma } from "./lib/prisma";
import { z } from 'zod';
import dayjs from 'dayjs';

export async function appRoutes(app: FastifyInstance) {
  app.post("/habits", async (request, response) => {
   const createHabitBody = z.object({
    title: z.string(),
    weekDays: z.array(
      z.number().min(0).max(6),
    )
   })

   const { title, weekDays } = createHabitBody.parse(request.body);

   // startOf -> zera as horas da data informada
   const today = dayjs().startOf('day').toDate();

   await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map(weekDay => {
            return {
              week_day: weekDay,
            }
          })
        }
      }
   })
  })

  app.get("/day", async (request, response) => {
    const getDayParams = z.object({
      date: z.coerce.date()// converte o parâmetro recebido para o formato de data
    })

    const { date } = getDayParams.parse(request.query);

    // pegando dia da semana da data informada
    const parsedDate = dayjs(date).startOf('day');
    const weekDay = parsedDate.get('day');

    // VAMOS BUSCAR:
    // 1. todos os habitos possíveis do dia
    // 2. todos os hábitos que já foram completados no dia

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date // lte = menor ou igual 
        },
        weekDays: {
          some: {// some = pelo menos um registro
            week_day: weekDay,
          }
        }
      }
    })

    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate(),
      },
      include: {
        dayHabits: true,
      }
    })

    const completedHabits = await day?.dayHabits.map(dayHabit => {
      return dayHabit.habit_id;// retornando somente o id dos hábitos completados no dia
    })

    return { 
      possibleHabits,
      completedHabits,
    }
  })
}