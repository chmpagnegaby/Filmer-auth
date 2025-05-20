
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Configuración de la conexión a la base de datos usando import.meta.env en entorno de desarrollo
const isProduction = import.meta.env.PROD;
const getEnv = (key: string, defaultValue: string) => {
  if (isProduction) {
    return process.env[key] || defaultValue;
  }
  return import.meta.env[`VITE_${key}`] || defaultValue;
};

// Configuración de la conexión a la base de datos
export const db = new Pool({
  host: getEnv('DB_HOST', 'localhost'),
  port: parseInt(getEnv('DB_PORT', '5432')),
  database: getEnv('DB_NAME', 'ugc_platform'),
  user: getEnv('DB_USER', 'postgres'),
  password: getEnv('DB_PASSWORD', 'postgres'),
});

// Verificar la conexión
db.connect()
  .then(() => console.log('Conexión exitosa a la base de datos'))
  .catch(err => console.error('Error de conexión a la base de datos:', err));
