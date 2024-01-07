import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../model/request.model';
import { AppareilModel } from '../model/appareil.model';
import { Observable, catchError } from 'rxjs';
import { CategorieModel } from '../model/categorie.model';

@Injectable({
  providedIn: 'root'
})
export class AppareilService {
  private api="http://localhost:8888/USERS-APPAREIL/api/appareils"
  constructor(private http:HttpClient) { }

  getAppareils(request?: Pagination): Observable<AppareilModel[]> {
    console.log("request", request);
    const params: any = {
      page: request?.page,
      size: request?.size
    };

    return this.http.get<AppareilModel[]>(`${this.api}/`).pipe(
      catchError((err) => {
        console.error('Error fetching appareil:', err);
        throw err;
      })
    );
  }

  getCategorie(request?: Pagination): Observable<CategorieModel[]>{
    return this.http.get<CategorieModel[]>(`${this.api}/categorie/list`).pipe(
      catchError((err)=>{
        console.error('Error fetching appareil:', err);
      throw err;
      })
    );
  }

  addAppareil(appareil: AppareilModel ): Observable<AppareilModel[]>{
    return this.http.post<AppareilModel[]>(`${this.api}/save`, appareil).pipe(
      catchError((err)=>{
        console.error('Error add appareil:', err);
      throw err;
      })
    );
  }
  updateAppareil(appareil: AppareilModel ): Observable<AppareilModel[]>{
    return this.http.put<AppareilModel[]>(`${this.api}/update`, appareil).pipe(
      catchError((err)=>{
        console.error('Error update appareil:', err);
      throw err;
      })
    );
  }
  deleteApp(id: number): Observable<AppareilModel[]>{
    return this.http.delete<AppareilModel[]>(`${this.api}/delete?id=${id}`).pipe(
      catchError((err)=>{
        console.error('Error delete appareil:', err);
      throw err;
      })
    );
  }
  switchApp(id: number): Observable<AppareilModel[]> {
    console.log("service switch");

    return this.http.put<AppareilModel[]>(`${this.api}/switch?id=${id}`, {}).pipe(
      catchError((error) => {
        console.error('Error switching appareil:', error);
        throw error;
      })
    );
  }

  switchAll(index: number): Observable<AppareilModel[]>{
    return this.http.put<AppareilModel[]>(`${this.api}/switchAll?index=${index}`,{}).pipe(
      catchError((error) => {
        console.error('Error switching All appareil:', error);
        throw error;
      })
    );
  }
}
