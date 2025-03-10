import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api';  // URL של ה-API

  constructor(private http: HttpClient) {}

  // פונקציה לרישום משתמש
  registerUser(registerData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register `, registerData);
  }

  // פונקציה לבדוק התחברות של משתמש
  loginUser(loginData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, loginData);
  }
  } 












