import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent implements OnInit {

  phoneNumber = "";
  termsandcondition = false;

  constructor(
    private route: Router,
     ) { }

  ngOnInit() {
   
  }

  register() {
    this.route.navigate(['./phone-number/otp']);
    
  }

  updatetimeValue(){
    this.route.navigate(['./phone-number/otp']);
  }

  numberOnlyValidation(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
      
    }
  }
  
   
  
 
  
}
