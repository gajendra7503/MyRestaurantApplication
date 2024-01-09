import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import{userinfo} from 'src/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

baseurl = 'http://localhost:3000';
 errorMessage :string="";

  constructor( private router: Router, private http: HttpClient) { }

register(user:any) {
    let API_URL = `${this.baseurl}/user/register`;
    return this.http.post(API_URL, user)
  }
     
login(email: any, password: any)  {
  let API_URL = `${this.baseurl}/login/logins`;
  return this.http.post(API_URL, {email,password})
}

setToken(token: string): void {
  localStorage.setItem('token', token);
}
setDataInLocalStorage(variableName: string, data: string) {
  localStorage.setItem(variableName, data);
}
getToken(): string | null {
  return localStorage.getItem('token');
}

isLoggedIn() {
return this.getToken() !== null;
}

logout() {
  localStorage.removeItem('token');
  this.router.navigate(['login']);
}

}
