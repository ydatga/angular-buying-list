import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { User } from '../types';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get users$() {
    return this.http.get<users>('api/show');
  }

  async createUser(req: { name: string; login_id: string; pass: string }) {
    console.log('this is createUser');
    return this.http.post<any>('api/createUser', req, httpOptions);
  }

  async deleteUser(id: number) {
    return this.http.get<any>(`api/delete-user/${id}`);
  }
}

export interface users {
  users: User[];
}
