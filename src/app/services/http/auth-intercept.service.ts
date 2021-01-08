import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptService implements HttpInterceptor {

  constructor() { }

  intercept(request : HttpRequest<any>, next : HttpHandler){
    
    let Username = "Daniele"
    let Pwd = "admin"

    let AuthHeader = "Basic" + window.btoa(Username + ":" + Pwd);

    request = request.clone({
        setHeaders:
        {
          Authorization : AuthHeader
        }
      })
      return next.handle(request);
  }





}
