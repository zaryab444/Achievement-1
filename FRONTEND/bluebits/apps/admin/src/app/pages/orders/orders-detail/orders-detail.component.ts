import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrderService } from '@bluebits/orders';

@Component({
  selector: 'bluebits-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.scss']
})
export class OrdersDetailComponent implements OnInit {

  order :Order;
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
   this._getOrder();
  }

  private _getOrder(){
    this.route.params.subscribe((params)=>{
      if(params.id){
        this.orderService.getOrder(params.id).subscribe((order)=>{
          this.order = order;
        })
      }
    })
  }

}
