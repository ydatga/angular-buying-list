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

  async getLists(user_id: number) {
    return this.http.get<any>(`api/get-buying-lists/${user_id}`);
  }

  async deleteUser(id: number) {
    return this.http.get<any>(`api/delete-user/${id}`);
  }

  async getList(id: number) {
    return this.http.get<any>(`api/get-list/${id}`);
  }

  async createList(req: {
    user_id: number;
    name: string;
    place: string;
    deadline: string;
  }) {
    return this.http.post<any>('api/create-list', req, httpOptions);
  }

  async login(login_id: string, password: string) {
    return this.http.get<any>(`api/login`, { params: { login_id, password } });
  }
}

export interface users {
  users: User[];
}
