import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.scss'],
})
export class DocumentDetailsComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {}

  register() {
    this.route.navigate(['./phone-number/view-registration']);
  }

}
