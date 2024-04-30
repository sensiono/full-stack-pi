import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = ['http://localhost:8084/'];

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private http: HttpClient) {}
  register(signRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'api/v1/auth/register', signRequest);
  }
  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'api/v1/auth/authenticate', loginRequest);
  }
  logout(): Observable<any> {
    return this.http.post(BASE_URL + 'api/v1/auth/logout', null);
  }

  getDecodedJwtData(): any {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      const jwtData = jwt.split('.')[1];
      const decodedJwtJsonData = window.atob(jwtData);
      return JSON.parse(decodedJwtJsonData);
    }

    return null;
  }

}
