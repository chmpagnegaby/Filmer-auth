
import express from 'express';
import { authenticate, validateLoginData, validateRegisterData } from '../middleware/auth';
import { login, register, logout, me } from '../controllers/authController';

const router = express.Router();

// Rutas públicas
router.post('/login', validateLoginData, (req, res, next) => {
  login(req, res, next);
});
router.post('/register', validateRegisterData, (req, res, next) => {
  register(req, res, next);
});
router.post('/logout', (req, res) => {
  logout(req, res);
});

// Rutas protegidas
router.get('/me', authenticate, (req, res, next) => {
  me(req, res, next);
});

export default router;
