import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  verifyToken(token: string) {
    return this.http.post<{ user: any; role: string }>('http://localhost:3080//verify-token', { token });
  }
}