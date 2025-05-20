
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from '../lib/db';
import { JwtPayload } from '../middleware/auth';

// Duración del token: 7 días
const TOKEN_DURATION = 60 * 60 * 24 * 7;

// Configuración de la cookie
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  maxAge: TOKEN_DURATION * 1000, // en milisegundos
  sameSite: 'strict' as const
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email
    const user = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    
    if (user.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales incorrectas'
      });
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales incorrectas'
      });
    }

    // Obtener información adicional según tipo de usuario
    let profileId = null;
    const tipo_usuario = user.rows[0].tipo_usuario;
    
    if (tipo_usuario === 'creador') {
      const creador = await db.query('SELECT id FROM creadores WHERE id_usuario = $1', [user.rows[0].id]);
      profileId = creador.rows[0]?.id || null;
    } else if (tipo_usuario === 'marca') {
      const marca = await db.query('SELECT id FROM marcas WHERE id_usuario = $1', [user.rows[0].id]);
      profileId = marca.rows[0]?.id || null;
    } else if (tipo_usuario === 'admin') {
      const admin = await db.query('SELECT id FROM administradores WHERE id_usuario = $1', [user.rows[0].id]);
      profileId = admin.rows[0]?.id || null;
    }

    // Crear payload para el token
    const payload: JwtPayload = {
      id_user: user.rows[0].id,
      id: profileId || 0,
      tipo_usuario: tipo_usuario,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + TOKEN_DURATION
    };

    // Generar token
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'default_secret');

    // Enviar token como cookie
    res.cookie('auth_token', token, cookieOptions);

    // Responder con éxito
    return res.status(200).json({
      success: true,
      message: 'Inicio de sesión exitoso',
      user: {
        id: user.rows[0].id,
        email: user.rows[0].email,
        tipo_usuario: user.rows[0].tipo_usuario,
        profileId
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({
      success: false,
      message: 'Error en el servidor'
    });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, userType } = req.body;

    // Verificar si el email ya existe
    const existingUser = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    
    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'El email ya está registrado'
      });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar nuevo usuario
    const newUser = await db.query(
      'INSERT INTO usuarios (email, password, tipo_usuario) VALUES ($1, $2, $3) RETURNING id, email, tipo_usuario',
      [email, hashedPassword, userType]
    );

    // Crear perfil según tipo de usuario
    let profileId = null;
    
    if (userType === 'creador') {
      const creador = await db.query(
        'INSERT INTO creadores (id_usuario) VALUES ($1) RETURNING id',
        [newUser.rows[0].id]
      );
      profileId = creador.rows[0].id;
    } else if (userType === 'marca') {
      const marca = await db.query(
        'INSERT INTO marcas (id_usuario) VALUES ($1) RETURNING id',
        [newUser.rows[0].id]
      );
      profileId = marca.rows[0].id;
    } else if (userType === 'admin') {
      const admin = await db.query(
        'INSERT INTO administradores (id_usuario) VALUES ($1) RETURNING id',
        [newUser.rows[0].id]
      );
      profileId = admin.rows[0].id;
    }

    // Crear payload para el token
    const payload: JwtPayload = {
      id_user: newUser.rows[0].id,
      id: profileId || 0,
      tipo_usuario: userType,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + TOKEN_DURATION
    };

    // Generar token
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'default_secret');

    // Enviar token como cookie
    res.cookie('auth_token', token, cookieOptions);

    // Responder con éxito
    return res.status(201).json({
      success: true,
      message: 'Registro exitoso',
      user: {
        id: newUser.rows[0].id,
        email: newUser.rows[0].email,
        tipo_usuario: newUser.rows[0].tipo_usuario,
        profileId
      }
    });
  } catch (error) {
    console.error('Error en registro:', error);
    return res.status(500).json({
      success: false,
      message: 'Error en el servidor'
    });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    // Eliminar la cookie
    res.clearCookie('auth_token');
    
    return res.status(200).json({
      success: true,
      message: 'Sesión cerrada con éxito'
    });
  } catch (error) {
    console.error('Error en logout:', error);
    return res.status(500).json({
      success: false,
      message: 'Error en el servidor'
    });
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado'
      });
    }

    // Obtener datos del usuario
    const user = await db.query(
      'SELECT id, email, tipo_usuario FROM usuarios WHERE id = $1',
      [req.user.id_user]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user.rows[0].id,
        email: user.rows[0].email,
        tipo_usuario: user.rows[0].tipo_usuario,
        profileId: req.user.id
      }
    });
  } catch (error) {
    console.error('Error en me:', error);
    return res.status(500).json({
      success: false,
      message: 'Error en el servidor'
    });
  }
};
