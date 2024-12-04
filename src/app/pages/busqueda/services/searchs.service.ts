import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class SearchsService {

  constructor(private http:HttpClient) { }
  private url = "http://127.0.0.1:8000/"

  getItemsByName(name:string): Observable<any>{
    return this.http.get(`${this.url}items/search_by_name?name=${name}`)
    .pipe(tap({
      next: (data) => {

      },
      error: (err) =>{
       Swal.fire({
         title: 'Error',
         text: 'Ha habido un error en la busqueda, intente de nuevo.',
         icon: 'error',
         confirmButtonText: 'Aceptar'
       })
      } 
    }))
    ;
  }
}
