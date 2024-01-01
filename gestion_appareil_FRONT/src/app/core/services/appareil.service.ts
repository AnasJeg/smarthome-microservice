import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Pagination } from '../model/request.model';
import { AppareilModel } from '../model/appareil.model';

@Injectable({
  providedIn: 'root'
})
export class AppareilService {
  private api="http://localhost:8090/api"
  constructor(private http: HttpClient) { }
  
  getAppareils(request?: Pagination): Observable<AppareilModel[]>{
    return this.http.get<AppareilModel[]>(`${this.api}/appareil/list`).pipe(
      catchError((err)=>{
        console.error('Error fetching appareil:', err);
      throw err;
      })
    );
  }

  switchApp(id: number): Observable<AppareilModel[]> {
    console.log("service switch");
    
    return this.http.post<AppareilModel[]>(`${this.api}/appareil/switch?id=${id}`, {}).pipe(
      catchError((error) => {
        console.error('Error switching appareil:', error);
        throw error;
      })
    );
  }

  switchAll(index: number): Observable<AppareilModel[]>{
    return this.http.put<AppareilModel[]>(`${this.api}/appareil/switchAll?index=${index}`,{}).pipe(
      catchError((error) => {
        console.error('Error switching All appareil:', error);
        throw error;
      })
    );
  }
  
}
