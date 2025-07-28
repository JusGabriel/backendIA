import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routers/authRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

app.use((req, res) => {
  res.status(404).json({ msg: "Endpoint no encontrado" });
});

export default app;
