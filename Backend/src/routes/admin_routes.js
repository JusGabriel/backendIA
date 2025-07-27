// routes/admin_routes.js
import express from 'express';
import { registrarAdministrador } from '../controllers/administradorController.js';

const router = express.Router();

// POST /api/admin/registro
router.post('/registro', registrarAdministrador);

export default router;
