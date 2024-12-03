import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SolicitService {

  constructor(private http:HttpClient) { }
  private url = "http://127.0.0.1:8000/"
  getSolicitudes(id_ofert: number) : Observable<any>{
    return this.http.get(`${this.url}trades/user/${id_ofert}/trades`);
  }
  updateStatusSolicit(id_trade: number, status: string) : Observable<any> {
    //tradesupdateStatus/?trade_id=25&status=COMPLETED
    return this.http.put(`${this.url}tradesupdateStatus/?trade_id=${id_trade}&status=${status}`,null);
  }
  
}
