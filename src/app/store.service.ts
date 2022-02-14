import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './types';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  public user = {
    id: localStorage.getItem(`${environment.APP_NAME}_user_id`)
      ? parseInt(localStorage.getItem(`${environment.APP_NAME}_user_id`)!)
      : null,
    name: localStorage.getItem(`${environment.APP_NAME}_user_name`),
    token: localStorage.getItem(`${environment.APP_NAME}_token`),
  };
  constructor() {}

  refreshData = () => {
    this.user = {
      id: localStorage.getItem(`${environment.APP_NAME}_user_id`)
        ? parseInt(localStorage.getItem(`${environment.APP_NAME}_user_id`)!)
        : null,
      name: localStorage.getItem(`${environment.APP_NAME}_user_name`),
      token: localStorage.getItem(`${environment.APP_NAME}_token`),
    };
  };
}
