import { Component, OnInit } from "@angular/core";
import { CartService } from "../../services/cart.service";

@Component({
  selector: 'orders-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss']
})
export class CartIconComponent implements OnInit {

  cartCount = 0;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {

    //every current changes in cart they observe and subscribe it
    this.cartService.cart$.subscribe(cart=>{
         //get the current cart which is loaded in application
         console.log(cart);
           //two questionmark to avoid error is is null to provide zero
      this.cartCount = cart?.items?.length ?? 0;
    })



  }

}
