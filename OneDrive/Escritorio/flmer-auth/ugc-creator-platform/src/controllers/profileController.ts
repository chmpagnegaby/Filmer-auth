
import { Request, Response } from 'express';
import { db } from '../lib/db';

// Obtener perfil según tipo de usuario
export const getProfile = async (req: Request, res: Response) => {
  try {
    const { type, id } = req.params;
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado'
      });
    }
    
    // Verificar acceso (solo admin o propietario pueden ver)
    if (req.user.tipo_usuario !== 'admin' && req.user.id !== parseInt(id)) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para ver este perfil'
      });
    }

    let profileData;
    let query = '';
    
    // Consulta según tipo de usuario
    if (type === 'creador') {
      query = `
        SELECT c.*, u.email 
        FROM creadores c 
        JOIN usuarios u ON c.id_usuario = u.id 
        WHERE c.id = $1
      `;
    } else if (type === 'marca') {
      query = `
        SELECT m.*, u.email 
        FROM marcas m 
        JOIN usuarios u ON m.id_usuario = u.id 
        WHERE m.id = $1
      `;
    } else if (type === 'admin') {
      query = `
        SELECT a.*, u.email 
        FROM administradores a 
        JOIN usuarios u ON a.id_usuario = u.id 
        WHERE a.id = $1
      `;
    } else {
      return res.status(400).json({
        success: false,
        message: 'Tipo de perfil no válido'
      });
    }
    
    profileData = await db.query(query, [id]);
    
    if (profileData.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Perfil no encontrado'
      });
    }
    
    return res.status(200).json({
      success: true,
      profile: profileData.rows[0]
    });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    return res.status(500).json({
      success: false,
      message: 'Error en el servidor'
    });
  }
};

// Actualizar perfil según tipo de usuario
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { type, id } = req.params;
    const profileData = req.body;
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado'
      });
    }
    
    let result;
    
    if (type === 'creador') {
      const { nombre, apellido, pais, ciudad, idiomas, precio, industrias, 
              genero, edad, color_ojos, color_cabello, largo_cabello, altura, complexion } = profileData;
      
      result = await db.query(`
        UPDATE creadores
        SET 
          nombre = COALESCE($1, nombre),
          apellido = COALESCE($2, apellido),
          pais = COALESCE($3, pais),
          ciudad = COALESCE($4, ciudad),
          idiomas = COALESCE($5, idiomas),
          precio = COALESCE($6, precio),
          industrias = COALESCE($7, industrias),
          genero = COALESCE($8, genero),
          edad = COALESCE($9, edad),
          color_ojos = COALESCE($10, color_ojos),
          color_cabello = COALESCE($11, color_cabello),
          largo_cabello = COALESCE($12, largo_cabello),
          altura = COALESCE($13, altura),
          complexion = COALESCE($14, complexion)
        WHERE id = $15
        RETURNING *
      `, [nombre, apellido, pais, ciudad, idiomas, precio, industrias, 
          genero, edad, color_ojos, color_cabello, largo_cabello, altura, complexion, id]);
      
    } else if (type === 'marca') {
      const { nombre, contacto, industria } = profileData;
      
      result = await db.query(`
        UPDATE marcas
        SET 
          nombre = COALESCE($1, nombre),
          contacto = COALESCE($2, contacto),
          industria = COALESCE($3, industria)
        WHERE id = $4
        RETURNING *
      `, [nombre, contacto, industria, id]);
      
    } else if (type === 'admin') {
      const { nombre, rol } = profileData;
      
      result = await db.query(`
        UPDATE administradores
        SET 
          nombre = COALESCE($1, nombre),
          rol = COALESCE($2, rol)
        WHERE id = $3
        RETURNING *
      `, [nombre, rol, id]);
      
    } else {
      return res.status(400).json({
        success: false,
        message: 'Tipo de perfil no válido'
      });
    }
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Perfil no encontrado'
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Perfil actualizado con éxito',
      profile: result.rows[0]
    });
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    return res.status(500).json({
      success: false,
      message: 'Error en el servidor'
    });
  }
};
