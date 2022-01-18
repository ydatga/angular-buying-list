import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get users$() {
    return this.http.get<users>('api/show');
  }

  createUser(req: { name: string; id: string; pass: string }) {
    console.log('this is createUser');
    return this.http.post<any>('api/createUser', req);
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
