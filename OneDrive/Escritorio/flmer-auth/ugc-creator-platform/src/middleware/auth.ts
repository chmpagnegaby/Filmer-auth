
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { loginSchema, registerSchema } from '../lib/validators';

// Interface para el payload del token
export interface JwtPayload {
  id_user: number;
  id: number;
  tipo_usuario: 'creador' | 'marca' | 'admin';
  iat?: number;
  exp?: number;
}

// Interface para extender Request con el usuario autenticado
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// Middleware para validar datos de login
export const validateLoginData = (req: Request, res: Response, next: NextFunction) => {
  const { error } = loginSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  
  next();
};

// Middleware para validar datos de registro
export const validateRegisterData = (req: Request, res: Response, next: NextFunction) => {
  const { error } = registerSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  
  next();
};

// Middleware principal de autenticación
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.auth_token;
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado: Se requiere autenticación'
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido o expirado'
    });
  }
};

// Middleware adicional para verificar rol de usuario
export const checkRole = (roles: ('creador' | 'marca' | 'admin')[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado: Se requiere autenticación'
      });
    }
    
    if (!roles.includes(req.user.tipo_usuario)) {
      return res.status(403).json({
        success: false,
        message: 'No tiene permiso para acceder a este recurso'
      });
    }
    
    next();
  };
};

// Middleware para verificar la propiedad de un recurso
export const checkOwnership = (resourceIdParam: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado: Se requiere autenticación'
      });
    }

    const resourceId = parseInt(req.params[resourceIdParam], 10);
    
    // Si es admin, permitir acceso sin verificar propiedad
    if (req.user.tipo_usuario === 'admin') {
      return next();
    }
    
    // Para creadores y marcas, verificar que el ID del recurso coincide con su ID
    if (req.user.id !== resourceId) {
      return res.status(403).json({
        success: false,
        message: 'No tiene permiso para acceder a este recurso'
      });
    }
    
    next();
  };
};
