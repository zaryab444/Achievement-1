import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@bluebits/product';
import { UsersService } from '@bluebits/users';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import {  OrderService } from '@bluebits/orders';
@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  statistics = [];
  endsubs$ : Subject<any> = new Subject();
  constructor(

    private userService: UsersService,
    private productService: ProductsService,
    private ordersService: OrderService

  ) { }


  // we use take utils observable pipe this is better then unsubscribe also the pipe filter the data and destroy this subscription when endsubs variable is complete
  ngOnInit(): void {
    combineLatest([
       this.ordersService.getOrdersCount(),
      this.productService.getProductsCount(),
     // this.userService.getUsersCount(),
      this.ordersService.getTotalSales()
    ]).pipe(takeUntil(this.endsubs$)).subscribe((values) => {
      this.statistics = values;
    });
  }
  ngOnDestroy() {
    this.endsubs$.next;
    this.endsubs$.complete();
}


}
