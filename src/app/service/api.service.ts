import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get hello$() {
    return this.http.get<res>('api/show');
  }
}

export interface res {
  users: User[];
}

export interface User {
  name: string;
  pass: string;
  login_id: string;
}
