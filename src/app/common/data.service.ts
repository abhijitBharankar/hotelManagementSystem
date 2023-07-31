import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  journey!: string
  ownerUsername : any
  ownerMobile: any;
  ownerPassword : any
  editHotel! :any
  hotelUpdate : any;
  updateHotelId! :any
  constructor(private router : Router) { }
  
  goToLogin(){
    // this.journey = endpoint
    this.router.navigateByUrl('/'+this.journey+'/login')
  }
  goRegister(){
    // this.journey = endpoint
    this.router.navigateByUrl('/'+this.journey+'/register')
  }
  goHome(){
    // this.journey = endpoint
    this.router.navigateByUrl('/'+this.journey+'/home')
  }
}
