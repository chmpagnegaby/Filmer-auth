
import express from 'express';
import { authenticate, checkRole, checkOwnership } from '../middleware/auth';
import { getProfile, updateProfile } from '../controllers/profileController';

const router = express.Router();

// Obtener perfil (protegido)
router.get('/:type/:id', authenticate, (req, res, next) => {
  getProfile(req, res, next);
});

// Actualizar perfil (protegido + verificación de rol y propiedad)
router.put('/:type/:id', authenticate, checkRole(['creador', 'marca', 'admin']), checkOwnership('id'), (req, res, next) => {
  updateProfile(req, res, next);
});

export default router;
