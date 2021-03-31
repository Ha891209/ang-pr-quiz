import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigServiceService {
  apiUrl: string = 'http://localhost:3000';

  constructor() { }
}