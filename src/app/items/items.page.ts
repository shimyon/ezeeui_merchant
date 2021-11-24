import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
tab: string = "vegetables";  
  constructor(private route: Router) { }

  ngOnInit() {
  }

edit_product() {
    this.route.navigate(['./edit-product']);
  } 
add_product() {
    this.route.navigate(['./add-product']);
  } 
}
