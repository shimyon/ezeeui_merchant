import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-details',
  templateUrl: './registration-details.component.html',
  styleUrls: ['./registration-details.component.scss'],

})
export class RegistrationDetailsComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {}

  register() {
    this.route.navigate(['./phone-number/account-details']);
  }

}
