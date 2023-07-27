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

  loginForm !: FormGroup
  adminsData!: any
  validAdmin: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private ds: DataService, private apiService: ApiService, private toastr: ToastrService) {

  }
  ngOnInit() {
    this.loginFormControl()
  }

  loginFormControl() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }



  register() {
    this.ds.goRegister()
  }


  login() {
    this.apiService.getApi().subscribe(resp => {

      this.adminsData = resp
    })

    if (this.adminsData) {
      this.isValidUser()
      if (this.validAdmin) {
        this.toastr.success("Successfully Logged in")
        this.router.navigateByUrl("/admin/home")
      } else {
        this.toastr.error("invalid username or password")
        this.router.navigateByUrl("/admin/login")
      } 
    }
  }

  isValidUser() {
    this.adminsData.forEach((element: any) => {
      // console.log(element.username, element.password);
      if (element.username === this.loginForm.value.username && element.password === this.loginForm.value.password) {
        this.validAdmin = true
      }
    });
    return
  }
}
