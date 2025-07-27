// server.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

// Importar rutas
import estudiantesRoutes from './routes/estudiantes_routes.js';
import chatRoutes from './routes/respuestas_routes.js';
import conversacionRoutes from './routes/conversaciones_routes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Servidor ON');
});

// Rutas
app.use('/api/estudiante', estudiantesRoutes);
app.use('/api', chatRoutes);
app.use('/api/conversaciones', conversacionRoutes);

// Ruta para endpoints no encontrados
app.use((req, res) => {
  res.status(404).send('Endpoint no encontrado');
});

export default app;
