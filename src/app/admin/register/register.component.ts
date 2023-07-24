import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ApiService } from 'src/app/api.service';
import { DataService } from 'src/app/common/data.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})



export class RegisterComponent {

  signupForm! : FormGroup
  passwordMatched : boolean = false;
  passwordInputType:string = "password"
  confirmPasswordInputType:string = "password"
  password_visibility_hide : boolean = true
  confirm_visibility_hide : boolean = true
  password_visibility_off_hide : boolean = false
  confirm_visibility_off_hide : boolean = false

  // data = {
  //   firstName : this.signupForm.value.firstName,
  //   lastName : this.signupForm.value.lastName,
  //   username : this.signupForm.value.username,
  //   password : this.signupForm.value.password,
  //   mobile : this.signupForm.value.mobile
  // }

  constructor(private fb : FormBuilder, private ds : DataService, private apiService: ApiService){

  }

  ngOnInit(){
    this.signupFormControl()
  }

  matcher = new MyErrorStateMatcher();


  signupFormControl(){
    this.signupForm = this.fb.group({
      firstName : ['',[Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z]*')]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z]*')]],
      username: ['',[Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z0-9]*')]],
      city: ['',[Validators.required, Validators.minLength(2)]],
      email : ['',[Validators.required, Validators.email]],
      password : ['',[Validators.required, Validators.minLength(6)]],
      confirmPassword : ['',[Validators.required, Validators.minLength(6)]],
      mobile: ['',[Validators.required, Validators.pattern('[0-9]*'),Validators.minLength(10)]]
    })
  }

  login(){
    this.ds.goToLogin('admin')
  }

  register(){
    this.apiService.postApi('admin',this.signupForm.value).subscribe(resp=>{
      console.log(resp);
      
    })

    // console.log(this.apiService.url);
    
  }

  confirmPassword(){
    if(this.signupForm.value.confirmPassword === this.signupForm.value.confirmPassword){
      
    }
  }
  
  visibility(key:string){
    // console.log(this.signupForm.get('password'));
    if(key=="password"){
      this.passwordInputType = 'text'
      this.password_visibility_off_hide = true
      this.password_visibility_hide = false
    }else if(key=="confirmPassword"){
      this.confirmPasswordInputType = 'text'
      this.confirm_visibility_off_hide = true
      this.confirm_visibility_hide = false
    }
  }
  
  visibility_off(key:string){
    // console.log(this.signupForm.get('password'));
    if(key=="password"){
      this.passwordInputType = 'password'
      this.password_visibility_hide = true
      this.password_visibility_off_hide = false
    }else if(key=="confirmPassword"){
      this.confirmPasswordInputType = 'password'
      this.confirm_visibility_hide = true
      this.confirm_visibility_off_hide = false
    }
  }

}

