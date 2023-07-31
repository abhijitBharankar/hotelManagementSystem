import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';
import { DataService } from 'src/app/common/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  loginForm !: FormGroup;
  ownersData!: any;
  validOwner: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private ds: DataService, private apiService: ApiService, private toastr: ToastrService) {

  }
  ngOnInit() {
    this.loginFormControl();
  }

  loginFormControl() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }



  register() {
    this.ds.goRegister();
  }


  login() {
    this.apiService.getApi().subscribe(resp => {
      this.ownersData = resp;
    })
    if (this.ownersData) {
      this.isValidOwner();
      if (this.validOwner) {
        this.toastr.success("Successfully Logged in");
        this.router.navigateByUrl("/owner/home");
      } else {
        this.toastr.error("Invalid Username or Password");
        this.router.navigateByUrl("/owner/login");
      } 
    }
  }

  isValidOwner() {
    this.ownersData.forEach((element: any) => {
      if (element.username === this.loginForm.value.username && element.password === this.loginForm.value.password) {
        this.validOwner = true;
        this.ds.ownerUsername = element.username;
        this.ds.ownerPassword = element.password;
        this.ds.ownerMobile = element.mobile;
      }
    });
    return
  }
}
