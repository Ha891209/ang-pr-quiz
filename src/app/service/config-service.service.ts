import { Injectable } from '@angular/core';
import { IMenuItem } from '../model/imenuitem';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  appName: string = 'AngPrQuiz';

  menuItems: IMenuItem[] = [
    { text: 'Home', link: '/home', icon: 'home' },
    { text: 'Admin', link: '/admin' },
  ];

  apiUrl: string = 'http://localhost:3000';
  constructor() { }
}