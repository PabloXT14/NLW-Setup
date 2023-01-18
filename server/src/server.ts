import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';

const PORT = 3333;
const app = Fastify();
const prisma = new PrismaClient();

app.register(cors);

app.get('/', async (request, response) => {
  const habits = await prisma.habit.findMany();

  return response.status(200).send(habits);
});

app.listen(
  { port: PORT },
  () => console.log(`Server is running on port ${PORT}`)
);