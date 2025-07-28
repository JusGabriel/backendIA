import { Router } from 'express';
import { registro, login, logout } from '../controllers/authController.js';

const router = Router();

router.post('/registro', registro);
router.post('/login', login);
router.post('/logout', logout);

export default router;
