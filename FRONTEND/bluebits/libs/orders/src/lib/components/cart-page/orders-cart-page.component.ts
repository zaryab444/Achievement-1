import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProductsService } from "@bluebits/product";
import { cartItemDetailed } from "../../models/cart";
import { CartService } from "../../services/cart.service";

@Component({
  selector: 'orders-cart-page',
  templateUrl: './orders-cart-page.component.html',
  styleUrls: ['./orders-cart-page.component.scss']
})
export class OrderCartPageComponent implements OnInit {

  cartItemsDetailed : cartItemDetailed[] = []

  constructor(private router: Router, private cartService: CartService, private productService : ProductsService) { }

  ngOnInit(): void {
    this._getCartDetails();
  }

  private _getCartDetails(){
    this.cartService.cart$.pipe().subscribe((respCart)=>{
      respCart.items.forEach((cartItem)=>{
        this.productService.getProduct(cartItem.productId).subscribe(respProduct =>{
          console.log(respProduct)
          this.cartItemsDetailed.push({
            product: respProduct,
            quantity: cartItem.quantity
          })
        })
      })
    })
  }

  backToShop(){
     this.router.navigate(['/products']);
  }

  deleteCartItem(){

  }
}
