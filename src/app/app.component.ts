import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HotelManagementSystem';

  constructor(private router: Router){

  }

  admin(){
    this.router.navigateByUrl("/admin/login")
  }
  owner(){
    this.router.navigateByUrl("/owner/login")
  }
  user(){
    this.router.navigateByUrl("/user/login")
  }
  home(){
    this.router.navigateByUrl("/home")
  }
}
