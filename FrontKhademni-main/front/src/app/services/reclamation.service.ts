import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Reclamation } from "../Models/reclamation/reclamation";
import { AuthServiceService } from "./auth-service.service"; 

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  private baseUrl = 'http://localhost:8084/reclamation';

  constructor(
    private http: HttpClient,
    private authService: AuthServiceService
  ) {}

  private getHeaders(): HttpHeaders {
    const jwt = localStorage.getItem('jwt'); // Retrieve JWT token
    if (!jwt) {
      console.warn("JWT token is missing");
    }

    return new HttpHeaders({
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json'
    });
  }

  getAllReclamations(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`${this.baseUrl}/allRec`, { headers: this.getHeaders() });
  }

  getReclamationById(id: number): Observable<Reclamation> {
    return this.http.get<Reclamation>(`${this.baseUrl}/getRec/${id}`, { headers: this.getHeaders() });
  }

  saveReclamation(reclamation: Reclamation): Observable<Reclamation> {
    return this.http.post<Reclamation>(`${this.baseUrl}/addRec`, reclamation, { headers: this.getHeaders() });
  }

  deleteReclamation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteRec/${id}`, { headers: this.getHeaders() });
  }

  updateReclamation(reclamation: Reclamation): Observable<Reclamation> {
    return this.http.put<Reclamation>(`${this.baseUrl}/updateRec`, reclamation, { headers: this.getHeaders() });
  }

  sendPDF(pdfBlob: Blob, filename: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', pdfBlob, filename);
    return this.http.post(`${this.baseUrl}/sendPDF`, formData, { headers: this.getHeaders() });
  }
}
