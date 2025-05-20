
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Definir la estructura del usuario autenticado
interface AuthUser {
  id: number;
  email: string;
  tipo_usuario: 'creador' | 'marca' | 'admin';
  profileId: number | null;
}

// Definir la estructura del contexto de autenticación
interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, userType: 'creador' | 'marca' | 'admin') => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// URL base para las peticiones API - usando import.meta.env en lugar de process.env
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Proveedor del contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Configurar axios para incluir cookies en las solicitudes
  axios.defaults.withCredentials = true;

  // Comprobar si hay un usuario autenticado al cargar
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${API_URL}/auth/me`);
        if (response.data.success) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Función para iniciar sesión
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      
      if (response.data.success) {
        setUser(response.data.user);
      } else {
        throw new Error(response.data.message || 'Error de inicio de sesión');
      }
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Función para registrarse
  const register = async (email: string, password: string, userType: 'creador' | 'marca' | 'admin') => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/register`, { email, password, userType });
      
      if (response.data.success) {
        setUser(response.data.user);
      } else {
        throw new Error(response.data.message || 'Error de registro');
      }
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    setIsLoading(true);
    try {
      await axios.post(`${API_URL}/auth/logout`);
      setUser(null);
    } catch (error) {
      console.error('Error en logout:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Función para actualizar datos del usuario
  const refreshUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`);
      
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Error al actualizar datos del usuario:', error);
      setUser(null);
    }
  };

  // Valores para el contexto
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    refreshUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  
  return context;
};
