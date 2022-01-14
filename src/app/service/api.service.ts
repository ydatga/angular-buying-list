import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get users$() {
    return this.http.get<users>('api/show');
  }
}

export interface users {
  users: User[];
}

export interface User {
  name: string;
  pass: string;
  login_id: string;
}
