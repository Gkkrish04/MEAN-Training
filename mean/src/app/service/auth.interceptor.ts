import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  tokenStr:string;

  constructor() {
    this.tokenStr = localStorage.getItem('token');
  }

  //after creating the authInterceptor first we get access to auth service to get token value, then we going to do 'request.clone()' we not only clone the request we can also edit the clone to pass the parameters of headers must be same as the middleware header with token.

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.tokenStr;
    // console.log(authToken);
    const authReq = req.clone({ headers: req.headers.set("Authorization","Bearer "+ authToken) });
    return next.handle(authReq);
  }
}
