import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@bluebits/product';
import { UsersService } from '@bluebits/users';
import { combineLatest } from 'rxjs';
import {  OrderService } from '@bluebits/orders';
@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  statistics = [];
  constructor(

    private userService: UsersService,
    private productService: ProductsService,
    private ordersService: OrderService

  ) { }

  ngOnInit(): void {
    combineLatest([
       this.ordersService.getOrdersCount(),
      this.productService.getProductsCount(),
     // this.userService.getUsersCount(),
      this.ordersService.getTotalSales()
    ]).subscribe((values) => {
      this.statistics = values;
    });
  }

}
