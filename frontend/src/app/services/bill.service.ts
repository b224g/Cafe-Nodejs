import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  url = environment.MyapiUrl;

  constructor(private httpClient: HttpClient) { }

  generateReport(data: any){
    return this.httpClient.post(`${this.url}/bill/generateReport`,data);
  }

  getPDF(data: any):Observable<Blob>{
    return this.httpClient.post(`${this.url}/bill/getPDF`,data,{responseType: 'blob'});
  }

  getBills(){
    return this.httpClient.get(`${this.url}/bill/getBills`);
  }

  delete(id: any){
    return this.httpClient.delete(`${this.url}/bill/delete/${id}`);
  }

}
