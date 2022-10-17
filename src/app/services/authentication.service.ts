import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor( private storage : Storage )  {
    this.loadToken();
   } 
   
   
  async loadToken() {
    const token = await this.storage.get(TOKEN_KEY); 
    if (token) {
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  async login(credentials: {username, password}){
    const users = await this.storage.get("users"); 
    return new Promise((resolve, reject) => {
      let jsonData = JSON.parse(users);
      if(credentials.username === jsonData.username && credentials.password === jsonData.password){
        this.storage.set(TOKEN_KEY,credentials.username);
        resolve('success')
      }
      else{
        reject('error')
      }
    });   
  }

  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    this.storage.remove(TOKEN_KEY);
    return this.storage.remove(TOKEN_KEY);
  }
}
