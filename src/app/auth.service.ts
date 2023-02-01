import { Injectable } from '@angular/core';
import { User } from './_models/user';

@Injectable({
  providedIn: 'root'
})


export class AuthService {



  public signIn(userData: User) {


    localStorage.setItem('ACCESS_TOKEN', "access_token");
  }
  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }
  public logout() {
    localStorage.removeItem('ACCESS_TOKEN');
  }
}