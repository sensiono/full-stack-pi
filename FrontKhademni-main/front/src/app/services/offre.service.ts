import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { Offre } from '../Models/user/offre';


@Injectable({
  providedIn: 'root'
})
export class OffreService {
    private baseUrl = 'http://localhost:8084/offre';

    constructor(private http: HttpClient, private authService: AuthServiceService) { }
  
    private getHeaders(): HttpHeaders {
      const jwt = localStorage.getItem('jwt');
  
      return new HttpHeaders({
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      });
    }
  

  createOffre(offre: Offre): Observable<Offre> {
    return this.http.post<Offre>(`${this.baseUrl}/create`, offre, { headers: this.getHeaders() });
}

  getOffreById(id: number): Observable<Offre> {
    return this.http.get<Offre>(`${this.baseUrl}/${id}`);
  }

  getAllOffres(): Observable<Offre[]> {
    return this.http.get<Offre[]>(`${this.baseUrl}/all`, );
  }

  updateOffre(offre: Offre): Observable<Offre> {
    return this.http.put<Offre>(`${this.baseUrl}/update`, offre);
  }

  deleteOffre(offre: Offre): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete`, { body: offre });
  }
}