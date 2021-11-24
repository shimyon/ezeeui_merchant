import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
})
export class AccountDetailsComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {}

  register() {
    this.route.navigate(['./phone-number/document-details']);
  }

}
