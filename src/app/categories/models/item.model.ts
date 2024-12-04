export interface User {
  nombre: string;
  telefono: string;
  correo_electronico: string;  // Nueva propiedad para el correo
  profile_picture_url: string; // URL de la imagen de perfil
}

export interface Item {
  userEmail: string;
  id_articulo: number;
  nombre_articulo: string;
  descripcion: string;
  precio: number;
  usuario_id: number;
  url_imagen?: string;
  userName?: string;
  userPhone?: string;
  user?: User;
  profile_picture_url: string; // URL de la imagen de perfil
}
export interface ItemUpdate {
  nombre_articulo: string;
  descripcion: string;
  precio: number;
}
