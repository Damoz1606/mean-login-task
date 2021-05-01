import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../interfaces/User';
import { DataServiceService } from './data-service.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL: string = "http://localhost:3000/api/user"

  constructor(private http: HttpClient, private router: Router, private dataService: DataServiceService, private cookies: CookieService) { }

  signIn(user: User){
    return this.http.post<any>(`${this.URL}/signin`, user);
  }

  signUp(user: User){
    return this.http.post<any>(`${this.URL}/signup`, user);
  }

  loggedIn(): boolean{
    return !! this.cookies.get('token');
  }

  getToken() {
    return this.cookies.get('token');
  }

  logOut() {
    this.cookies.delete('token');
    this.cookies.delete('user');
    this.dataService.changeID("");
    this.router.navigate(['/signin']);
  }
}
