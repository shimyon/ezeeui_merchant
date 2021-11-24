import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-registration-details',
  templateUrl: './view-registration-details.component.html',
  styleUrls: ['./view-registration-details.component.scss'],
})
export class ViewRegistrationDetailsComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {}

  register() {
    this.route.navigate(['./tabs']);
  }

}
