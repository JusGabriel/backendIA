import dotenv from 'dotenv';
import app from './server.js';
import { connectDB } from './database.js';

dotenv.config();

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
};

startServer();
