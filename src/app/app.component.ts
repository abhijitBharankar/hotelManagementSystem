import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './common/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HotelManagementSystem';

  constructor(private router: Router, private ds: DataService){

  }

  admin(){
    this.router.navigateByUrl("/admin/login")
    this.ds.journey = "admin"
  }
  owner(){
    this.router.navigateByUrl("/owner/login")
    this.ds.journey = "owner"
  }
  user(){
    this.router.navigateByUrl("/user/login")
    this.ds.journey = "user"
  }
  home(){
    this.router.navigateByUrl("/home")
    this.ds.journey = ""
  }
}
