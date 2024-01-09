import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl,Validators,FormBuilder, AbstractControl} from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
    
    
  });
  // captcha:any;
  submitted= false;
  errorMessage :string="";
  isBtnDisabled = false;
  emailValidateMessage: any
  passValidateMessage: any
  email: any;
  password: any;
  showPassword = false; 
  // public captchaResolved : boolean = false;
 
 

 
  constructor(private fb: FormBuilder,private accountService:AccountService, private http:HttpClient,private router: Router) { }

  ngOnInit(): void {
    this.loginForm= this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8),
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[0-9]{8,10}$")]],
    });

  }
//   checkCaptcha(captchaResponse : any) {
//     this.captchaResolved = (captchaResponse && captchaResponse.length > 0) ? true : false
// }
  get log(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  removeErrorMsg(fieldname: string) {
    
    if (fieldname == "email") {
      this.emailValidateMessage = "";
  }
  if (fieldname == "password") {
    this.passValidateMessage = "";
}
  }
  validateEmailAddress() {
    if (this.email) {
      var lastChars = this.email.lastIndexOf(".");
      var expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        if (!expression.test(String(this.email).toLowerCase()) || this.email.substr(lastChars, 3).length < 3) {
          return 0;
        }
          return 1; 
    } return ;
  }

  
  checkValidationMsg(loginForm: FormGroup) {
    let num: number = 0;
     this.email = loginForm.value.email.trim();
   if (this.email && this.validateEmailAddress() == 0) {
      this.emailValidateMessage = "invalid";
      num += 1;
    }
    if (!this.email) {
      this.emailValidateMessage = "required";
      num += 1;
    }
    console.log("line no 194");
// if (num > 0) {
//   return false;
// }

  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  Loginsub(){
    this.submitted = true;
    this.checkValidationMsg(this.loginForm)
    console.log("params....",this.loginForm.value);
    console.log("email",this.log['email'].value);
    console.log("pswd",this.log['password'].value);

    if(this.log['email'].value!=null && this.log['password'].value!=null){

      this.accountService.login(this.log['email'].value, this.log['password'].value).subscribe((res:any)=>{

        if(res.status=="Success"){
          localStorage.setItem("token",'token');
          this.router.navigate(['/Dashboard'])
        }
        else{
          alert('Wrong Details')
        }
        // localStorage.setItem('form-data', JSON.stringify(this.loginForm.value));
        sessionStorage.setItem('form-data', JSON.stringify(this.loginForm.value));
      })     
}
}
  }

