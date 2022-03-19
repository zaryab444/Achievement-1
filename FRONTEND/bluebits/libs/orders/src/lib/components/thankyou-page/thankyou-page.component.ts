import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/orders.service';

@Component({
  selector: 'thankyou-page',
  templateUrl: './thankyou-page.component.html',
  styleUrls: ['./thankyou-page.component.scss']
})
export class ThankyouPageComponent implements OnInit {

  constructor(private orderService: OrderService, private cartService: CartService) { }

  ngOnInit(): void {
    this.SaveOrder();
    
  }

  SaveOrder(){
    const orderData = this.orderService.getCachedOrderData();

    this.orderService.createOrder(orderData).subscribe(()=>{
      this.cartService.emptyCart();
      this.orderService.removeCachedOrderData();
    })
  }

}
