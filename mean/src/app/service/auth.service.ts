import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthData } from '../model/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: any = 'http://localhost:3000/api/';

  constructor(private http: HttpClient, public router: Router) {}

  createUser(name: string, email: string, password: string) {
    const authData: AuthData = { name: name, email: email, password: password };
    this.http
      .post(this.baseUrl + 'user/signup', authData)
      .subscribe((response) => {
        console.log(response);
      });
  }

  loginUser(email: string, password: string) {
    const loginData = {email:email, password:password};
    this.http.post(this.baseUrl + 'user/login', loginData).subscribe(response => {
      console.log(response);
    })
  }
}
