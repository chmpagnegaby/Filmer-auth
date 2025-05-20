
export interface User {
  id: number;
  email: string;
  tipo_usuario: 'creador' | 'marca' | 'admin';
}

export interface Creador {
  id: number;
  nombre?: string;
  apellido?: string;
  pais?: string;
  ciudad?: string;
  idiomas?: string[];
  precio?: number;
  fecha_registro?: string;
  industrias?: string[];
  genero?: string;
  edad?: number;
  color_ojos?: string;
  color_cabello?: string;
  largo_cabello?: string;
  altura?: number;
  complexion?: string;
  id_usuario?: number;
}

export interface Marca {
  id: number;
  nombre?: string;
  contacto?: string;
  industria?: string[];
  id_usuario?: number;
}

export interface Administrador {
  id: number;
  nombre?: string;
  rol?: string;
  id_usuario?: number;
}

export interface AuthForm {
  email: string;
  password: string;
}

export interface RegisterForm extends AuthForm {
  userType: 'creador' | 'marca' | 'admin';
}
