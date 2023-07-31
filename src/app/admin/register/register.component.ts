import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';
import { DataService } from 'src/app/common/data.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})



export class RegisterComponent {

  signupForm!: FormGroup
  passwordMatched: boolean = false;
  passwordInputType: string = ""
  confirmPasswordInputType: string = ""

  password_visibility_hide: boolean = true
  confirm_visibility_hide: boolean = true
  
  password_visibility_off_hide: boolean = false
  confirm_visibility_off_hide: boolean = false
  
  passwordValue!:any;
  confirmPasswordValue! :any;


  constructor(private fb: FormBuilder, private ds: DataService, private apiService: ApiService, private router: Router, private toastr: ToastrService) {

  }
  
  ngOnInit() {
    this.signupFormControl()
  }
  



  signupFormControl() {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z]*')]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z]*')]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z0-9]*')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      // name:['', this.nameValidation],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10)]],
      passwordNew: ['newPass',[this.passwordValidation]]
    })
  }

  passwordValidation(inp:any){
    console.log(inp.value);
    // console.log(this.signupForm.value.confirmPassword);

    // if(this.signupForm.value.confirmPassword){
    //   this.confirmPasswordValue = this.signupForm.value.confirmPassword
    // }
    // console.log(this.passwordValue);
    // var isErr = false
    // if(this.passwordValue !== inp.value){
    //   isErr = true
    // }
    // return isErr ? {Err: true} : null
    // this.passwordValue = inp.value
  }

  // confirmPasswordValidation(inp:any){
  //   console.log(inp.value)
  //   var isErr
  //   if(this.signupForm.value.password == inp.value){
  //      isErr = false 
  //     }
  //     return isErr ? {Err: true} : null
  //   // this.confirmPasswordValue = inp.value
  //   // console.log(this.signupForm.value.password)
  //   // let data = inp.value?.toLowerCase();
  //   // let isErr = data.includes('copy')
  //   // return isErr ? {Err : true} : null;
  // }

  login() {
    this.ds.goToLogin()
  }

  register() {
    this.apiService.postApi(this.signupForm.value).subscribe(resp => {
      console.log(resp);
      this.signupForm.reset()
      this.ds.goToLogin()
      this.toastr.success('Registration Successful', 'Congratulation!')
    })

    // console.log(this.apiService.url);

  }

  // confirmPassword(inp: any) {
  //   console.log(inp.value)
  //   // if(this.signupForm.value.confirmPassword === this.signupForm.value.confirmPassword){
  //   // }


  //   let data = inp.value?.toLowerCase();
  //   let isErr = data.includes('ABHIJIT')
  //   return isErr ? { Err: true } : null;
  // }

  visibility(key: string) {
    // console.log(this.signupForm.get('password'));
    if (key == "password") {
      this.passwordInputType = 'text'
      this.password_visibility_off_hide = true
      this.password_visibility_hide = false
    } else if (key == "confirmPassword") {
      this.confirmPasswordInputType = 'text'
      this.confirm_visibility_off_hide = true
      this.confirm_visibility_hide = false
    }
  }

  visibility_off(key: string) {
    // console.log(this.signupForm.get('password'));
    if (key == "password") {
      this.passwordInputType = 'password'
      this.password_visibility_hide = true
      this.password_visibility_off_hide = false
    } else if (key == "confirmPassword") {
      this.confirmPasswordInputType = 'password'
      this.confirm_visibility_hide = true
      this.confirm_visibility_off_hide = false
    }
  }

}

