import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../../header/component/header/header.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.http.get('http://127.0.0.1:8000/users/users/users', {
      headers: { 'Cache-Control': 'no-cache' }
    }).subscribe(
      (response: any) => {
        console.log('Respuesta del backend:', response);
        if (response.data && Array.isArray(response.data)) {
          this.users = response.data;
        } else {
          console.error('Estructura de datos inesperada:', response);
        }
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar los usuarios',
          text: 'Hubo un problema al obtener los usuarios.',
        });
      }
    );
  }
  
  
  deleteUser(userId: number | undefined): void {
    console.log('Intentando eliminar usuario con ID:', userId); // Agregar depuración
    if (!userId) {
      Swal.fire('Error', 'No se pudo identificar al usuario', 'error');
      return;
    }
    this.http.delete(`http://127.0.0.1:8000/users/users/${userId}`).subscribe(
      () => {
        this.users = this.users.filter(user => user.id_usuario !== userId);
        Swal.fire('Eliminado', 'El usuario ha sido eliminado', 'success');
      },
      (error) => {
        Swal.fire('Error', 'No se pudo eliminar al usuario', 'error');
        console.error(error);
      }
    );
  }  
}