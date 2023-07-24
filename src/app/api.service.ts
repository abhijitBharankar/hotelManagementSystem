import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'http://localhost:3000/'

  constructor(private httpClient: HttpClient, private router : Router ) { }

  postApi(endpoint:any,formData: any){
    let url = this.url + endpoint
    return this.httpClient.post(url,formData)
  }

  getApi(endpoint:any){
    let url = this.url + endpoint
    return this.httpClient.get(url)
  }

  deleteApi(endpoint:any){
    let url = this.url + endpoint
    return this.httpClient.delete(url)
  }
}


