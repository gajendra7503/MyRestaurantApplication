import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { MustMatch } from '../mustmatch.validator';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  mobStartRegx = /^[0-5].*$/;
  submitted = false
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    mobile: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false),
    
  });
  nameValidateMessage: any;
  emailValidateMessage: any;
  mobileValidateMessage: any;
  name: any;
  email: any;
  mobile: any;
  isPasswordVisible = false;
  // isCnPasswordVisible = false;
  
  
  
  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    //localStorage.clear();
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      mobile:['',[Validators.required,Validators.pattern("^[0-9]*$") ]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      // Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[0-9]{8,10}$")]],
      //Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$")
      confirmPassword: ['', [Validators.required,Validators.minLength(8)]],
      acceptTerms: [false, Validators.requiredTrue]
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }
  get register(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }
   alphaOnly(event:any) {
    var reg = /^[a-zA-Z ]*$/;
    return (reg.test(event.key));
  };
  numbersOnly(event:any) {
    var reg = /^[0-9]+$/;
      return (reg.test(event.key));
  };


  removeErrorMsg(fieldname: string) {
    if (fieldname == "name") {
      this.nameValidateMessage = "";
    }
    if (fieldname == "email") {
      this.emailValidateMessage = "";
    }
    if (fieldname == "mobile") {
      this.mobileValidateMessage = "";
    }
  }

  isMobileWrong() {
    let firstDigit = this.mobile.substr(0, 1);
    if (firstDigit != '6' && firstDigit != '7' && firstDigit != '8' && firstDigit != '9') {
      return 0;
    }
    else if (this.mobile.match(/^(\d)\1+$/g)) {
      return 0;
    }
    else {
      return 1;
    }
  }
  validateEmailAddress() {
    if (this.email) {
      var lastChars = this.email.lastIndexOf(".");
      var expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
      if (!expression.test(String(this.email).toLowerCase()) || this.email.substr(lastChars, 3).length < 3) {
        return 0;
      }
      else {
        return 1;
      }
    } return
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
}

// toggleCnPasswordVisibility() {
//   this.isCnPasswordVisible = !this.isCnPasswordVisible;
// }

  checkValidationMsg(registerForm: FormGroup) {
    let num: number = 0;
    this.name = registerForm.value.name.trim();
    this.email = registerForm.value.email.trim();
    this.mobile = registerForm.value.mobile.trim();
   

    if (this.name && this.name.length < 3) {
      this.nameValidateMessage = "lengthError";
      num += 1;
    }
    if (!this.name) {
      this.nameValidateMessage = "required";
      num += 1;
    }
    if (this.email && this.validateEmailAddress() == 0) {
      this.emailValidateMessage = "invalid";
      num += 1;
    }
    if (!this.email) {
      this.emailValidateMessage = "required";
      num += 1;
    }
    if (this.isMobileWrong() == 0) {
      this.mobileValidateMessage = "invalid";
      num += 1;
    }
    if (!this.mobile) {
      this.mobileValidateMessage = "required";
      num += 1;
    }
    if (this.mobile && this.mobile.length != 10) {
      this.mobileValidateMessage = "lengthError";
      num += 1;
    }
console.log("line no 194");

  }

 

  onSubmit() {
    this.submitted = true;
    //this.MobileDisplayLabel(this.mobile);
    this.checkValidationMsg(this.registerForm)
    console.warn(this.registerForm.value)
    if(this.registerForm.valid){
      this.accountService.register(this.registerForm.value).subscribe((response:any) => {
        this.router.navigate(['/login']);
        console.log("59.....",this.registerForm);
        alert("Registration successful");
        // localStorage.setItem('form-data', JSON.stringify(this.registerForm.value));
        sessionStorage.setItem('form-data', JSON.stringify(this.registerForm.value));
      })
    }
   
    console.log(sessionStorage.getItem('form-data'));

  }
}


