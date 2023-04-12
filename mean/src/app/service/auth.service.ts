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
   private userId:string;
   userName:any;
   public name = new Subject<any>();
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

  getUserId(){
    return this.userId;
  }

  createUser(name: string, email: string, password: string) {
    const authData: AuthData = { name: name, email: email, password: password };
    this.http
      .post(this.baseUrl + 'user/signup', authData)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['login']);
      });
  }

  loginUser(email: string, password: string) {
    const loginData = {email:email, password:password};
    this.http.post<{token: string, expiresIn: number, userName:any, userId: string}>(this.baseUrl + 'user/login', loginData).subscribe(response => {
      this.token = response.token;
      if(this.token){
        const expiresDuration = response.expiresIn;
        this.setAuthTimer(expiresDuration);
        this.isAuthendicated = true;
        this.userId = response.userId;
        this.authStatus.next(true);
        const now = new Date();
        const expireDate = new Date(now.getTime() + expiresDuration * 1000);
        this.saveAuthData(this.token, expireDate, response.userName, response.userId);
        this.router.navigate(['postList']);
      }

    })
  }

  setAuthTimer(duration:number){
    this.tokenTimer = setTimeout(()=> {
      this.logoutUser();
      this.dialogBox('Session Expired!');
    }, duration * 1000);
  }

  autoAuthUser(){
    const authInfo = this.getAuthData();
    if(authInfo == null){
      return;
    }
    const now = new Date();
    const expireIn = authInfo.expireData.getTime() - now.getTime();
    if(expireIn > 0){
      this.token = authInfo.token;
      this.isAuthendicated = true;
      this.userId = authInfo.userId;
      this.setAuthTimer(expireIn / 1000);
      this.authStatus.next(true);
    }
  }

  saveAuthData(token:string, expireData: Date, user:any, userId:string){
    localStorage.setItem('token', token);
    localStorage.setItem('expireData', expireData.toISOString());
    localStorage.setItem('username', user);
    localStorage.setItem('userId', userId);
  }

  clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expireData');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
  }

  logoutUser(){
    this.token = null;
    this.isAuthendicated = false,
    this.authStatus.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['postList']);
  }

  getAuthData(){
    const token = localStorage.getItem('token');
    const expireData = localStorage.getItem('expireData');
    const userId = localStorage.getItem('userId');

    if(!token || !expireData){
      return null;
    }

    return {
      token:token,
      expireData: new Date(expireData),
      userId: userId,
    }
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

  getTestPost(){
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }
}
