import Fastify from 'fastify';

const app = Fastify();
const PORT = 3333;

app.get('/', (request, response) => {
  return response.status(200).send("Hello, world!");
});

app.listen({
  port: PORT,
}, () => console.log(`Server is running on port ${PORT}`));