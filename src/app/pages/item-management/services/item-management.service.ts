import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,tap } from 'rxjs';
import { Item, ItemUpdate } from '../../../categories/models/item.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ItemManagementService {

  constructor(private http:HttpClient) { }
  getAllItems(id_user:number): Observable<any>{
    return this.http.get(`http://127.0.0.1:8000/items/by_user/${id_user}`);
  }
  updateItem(item_id:number, item:ItemUpdate):Observable<any>{
    return this.http.put(`http://127.0.0.1:8000/items/${item_id}`,item).pipe(tap({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error(error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo actualizar el item, intente de nuevo.',
          icon: 'error'
        })
      }
    }))
    ;
  }
  deleteItem(id_item:number):Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/items/${id_item}`).pipe(tap({
      next: (data) => {
        console.log(data);
        Swal.fire({
          title: 'Item eliminado',
          text: 'El item ha sido eliminado correctamente.',
          icon:'success'
        })
      },
      error: (error) => {
        console.error(error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo eliminar el item, intente de nuevo.',
          icon: 'error'
        })
      }
    }))
    ;
  }
  
}
