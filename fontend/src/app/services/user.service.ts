import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.MyapiUrl;

  constructor(private httpClient: HttpClient) { }

  signup(data: any) {
    return this.httpClient.post(this.url +
      "/user/sigup", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  forgotPassword(data:any){
    return this.httpClient.post(this.url+
      "/user/forgotPassword/",data,{
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  login(data:any){
    return this.httpClient.post(this.url+
      "/user/login/",data,{
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }
}
