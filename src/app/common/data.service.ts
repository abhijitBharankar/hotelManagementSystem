import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  journey!: string
  constructor(private router : Router) { }

  goToLogin(endpoint: any){
    this.journey = endpoint
    if(endpoint === 'admin'){
      this.router.navigateByUrl('/admin/login')
    } else if(endpoint === 'owner'){
      this.router.navigateByUrl('/owner/login')
    } else if(endpoint === 'user'){
      this.router.navigateByUrl('/user/login')
    }
  }
  goRegister(endpoint: any){
    this.journey = endpoint
    if(endpoint === 'admin'){
      this.router.navigateByUrl('/admin/register')
    } else if(endpoint === 'owner'){
      this.router.navigateByUrl('/owner/register')
    } else if(endpoint === 'user'){
      this.router.navigateByUrl('/user/register')
    }
  }
}
