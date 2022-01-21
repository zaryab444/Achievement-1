import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrderService } from '@bluebits/orders';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'bluebits-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
   orders :Order[] = [];
  constructor(
    private orderService : OrderService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this._getOrders();
  }

  private _getOrders(){
    this.orderService.getOrders().subscribe(data =>{
      this.orders = data;
    })
  }

}
