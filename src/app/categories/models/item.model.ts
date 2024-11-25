export interface User {
  nombre: string;
  telefono: string;
  profile_picture_url: string; // Nueva propiedad para la URL de imagen
}

export interface Item {
  id_articulo: number;
  nombre_articulo: string;
  descripcion: string;
  precio: number;
  usuario_id: number;
  url_imagen?: string;
  userName?: string;
  userPhone?: string;
  user?: User;
  profile_picture_url: string; // Nueva propiedad para la URL de imagen
}
