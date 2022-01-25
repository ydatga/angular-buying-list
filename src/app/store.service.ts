import { Injectable } from '@angular/core';
import { User } from './types';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  public user: User | null = null;

  constructor() {}
}
