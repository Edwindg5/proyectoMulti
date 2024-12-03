import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MysolicitsService {

  constructor(private http: HttpClient) { }
  private url = "http://127.0.0.1:8000/"

  getMySolicits(id:number):Observable<any>{
    return this.http.get(`${this.url}trades/user/${id}/trades_as_solicitant`);

  }
}
