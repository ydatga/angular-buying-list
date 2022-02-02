import { Injectable } from '@angular/core';
import { User } from './types';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  public user = { name: null, id: null };

  constructor() {}
}
