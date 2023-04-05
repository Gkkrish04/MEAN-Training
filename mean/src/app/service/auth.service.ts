import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthData } from '../model/auth.model';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../dialog/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: any = 'http://localhost:3000/api/';
  isAuthendicated = false;
   private token: string;
   private tokenTimer: any;
   private authStatus = new Subject<boolean>()
  constructor(private http: HttpClient, public router: Router, public dialog: MatDialog,) {}

  getToken(){
    return this.token;
  }

  getIsAuth(){
    return this.isAuthendicated;
  }

  getAuthStatusListener(){
    return this.authStatus.asObservable();
  }

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
    this.http.post<{token: string, expiresIn: number}>(this.baseUrl + 'user/login', loginData).subscribe(response => {
      this.token = response.token;
      if(this.token){
        const expiresDuration = response.expiresIn;
        this.tokenTimer = setTimeout(() => {
          this.logoutUser();
          this.dialogBox('Session Expired!');
        }, expiresDuration * 1000);
        localStorage.setItem('token', this.token);
        this.isAuthendicated = true;
        this.authStatus.next(true);
        this.router.navigate(['postList']);
      }

    })
  }

  logoutUser(){
    this.token = null;
    this.isAuthendicated = false,
    localStorage.setItem('token', null);
    this.authStatus.next(false);
    clearTimeout(this.tokenTimer);
    this.router.navigate(['postList']);
  }

  dialogBox(msgStr){
    this.dialog.open(ErrorDialogComponent, {
      panelClass: ["animate__animated", "animate__slideInUp"],
      width: "20rem",
      disableClose: false,
      position: { right: "22%" },
      data:msgStr,
    })
  }
}
