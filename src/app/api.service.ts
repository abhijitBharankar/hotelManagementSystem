import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './common/data.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'http://localhost:3000/'

  constructor(private httpClient: HttpClient, private router : Router , private ds : DataService) { }

  postApi(formData: any){
    let url = this.url + this.ds.journey 
    return this.httpClient.post(url,formData)
  }

  getApi(){
    let url = this.url + this.ds.journey
    return this.httpClient.get(url)
  }

  deleteApi(id:any){
    let url = this.url + this.ds.journey +'/'+id
    return this.httpClient.delete(url)
  }

  patchApi(id:any, data:any){
    let url = this.url + this.ds.journey
    return this.httpClient.patch(url,data)
  }
}


