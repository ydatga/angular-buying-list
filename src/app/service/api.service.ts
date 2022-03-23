import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { User } from '../types';
import { identifierModuleUrl } from '@angular/compiler';
import { Observable, of } from 'rxjs';

type AuthInfo = {
  user_id: number;
  token: string;
};

export type BuyingList = {
  name: string;
  place: string;
  deadline: string;
  finished: boolean;
  id: number;
  items: Item[];
  user_id: number;
};

export type Item = {
  id: number;
  list_id: number;
  check: boolean;
  name: string;
  price: number;
  count: number;
};

type CreateListParams = {
  list_id: number;
  name: string;
  price: number;
  count: number;
};

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

  async getLists(
    user_id: number,
    token: String,
    search?: String,
    keyword?: String
  ) {
    return this.http.post<any>(
      `api/get-buying-lists/${user_id}`,
      { token, search, keyword },
      httpOptions
    );
  }

  async deleteUser(id: number) {
    return this.http.get<any>(`api/delete-user/${id}`);
  }

  async getList(id: number, authInfo: AuthInfo) {
    return this.http.post<any>(
      `api/get-buying-list/${id}`,
      { authInfo },
      httpOptions
    );
  }

  async createList(req: {
    createinfo: {
      user_id: number;
      name: string;
      place: string;
      deadline: string;
    };
    authInfo: AuthInfo;
  }) {
    return this.http.post<any>('api/create-list', req, httpOptions);
  }

  async createThing(req: {
    create_info: CreateListParams;
    authInfo: AuthInfo;
  }) {
    return this.http.post<any>(`api/create-thing`, req, httpOptions);
  }

  async login(login_id: string, password: string) {
    return this.http.get<any>(`api/login`, { params: { login_id, password } });
  }

  async auth(req: { user_id: number; token: string }) {
    let success!: boolean;
    await this.http
      .post<any>('api/auth', req, httpOptions)
      .subscribe((value) => {
        success = value.success;
      });
    return success;
  }

  async toggle(req: { id: number; token: string }) {
    return this.http.post('api/toggle-thing', req, httpOptions);
  }

  async deleteThing(req: { id: number; token: string }) {
    return this.http.post('api/delete-thing', req, httpOptions);
  }

  async deleteList(req: { id: number; token: string }) {
    return this.http.post('api/delete-list', req, httpOptions);
  }

  async updateList(req: {
    id: number;
    token: string;
    updateInfo: { name?: string; place?: string; deadline?: string };
  }) {
    return this.http.post('api/update-list', req, httpOptions);
  }
}

export interface users {
  users: User[];
}
