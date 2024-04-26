import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';//à verifier 
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url = environment.MyapiUrl;

  constructor(private httpClient:HttpClient) { }

  getDetails(){
    return this.httpClient.get(this.url+"/dashboard/details/");
  }
}
