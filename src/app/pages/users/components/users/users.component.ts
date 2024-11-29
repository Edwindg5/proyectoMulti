import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
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
    this.http.get('http://127.0.0.1:8000/users/users').subscribe(
      (response: any) => {
        this.users = response.data; // Suponemos que la respuesta tiene la lista de usuarios
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

  deleteUser(userId: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'El usuario será eliminado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`http://127.0.0.1:8000/users/users/${userId}`).subscribe(
          () => {
            Swal.fire('Eliminado', 'El usuario ha sido eliminado', 'success');
            this.loadUsers(); // Recargar la lista después de eliminar
          },
          (error) => {
            Swal.fire('Error', 'No se pudo eliminar al usuario', 'error');
          }
        );
      }
    });
  }
}