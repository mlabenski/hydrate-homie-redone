import { Component, OnInit } from '@angular/core';
import { APIService } from '../API.service';
import { Order } from '../models/order.model';
import { Auth } from 'aws-amplify';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  orders: Array<any>;

  constructor(private apiService: APIService) { }

  ngOnInit() {
    this.apiService.ListOrders().then((evt) => {
      this.orders = evt.items;
      console.log("you can view this page!");
    })
  }


}
