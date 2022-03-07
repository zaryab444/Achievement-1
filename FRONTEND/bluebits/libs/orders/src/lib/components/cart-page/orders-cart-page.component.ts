import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProductsService } from "@bluebits/product";
import { Subject, takeUntil } from "rxjs";
import { cartItemDetailed } from "../../models/cart";
import { CartService } from "../../services/cart.service";

@Component({
  selector: 'orders-cart-page',
  templateUrl: './orders-cart-page.component.html',
  styleUrls: ['./orders-cart-page.component.scss']
})
export class OrderCartPageComponent implements OnInit, OnDestroy {

  cartItemsDetailed : cartItemDetailed[] = [];
  cartCount = 0;
  endsubs$ : Subject<any> = new Subject();

  constructor(private router: Router, private cartService: CartService, private productService : ProductsService) { }

  ngOnInit(): void {
    this._getCartDetails();
  }

  ngOnDestroy(){
    this.endsubs$.next;
    this.endsubs$.complete();
  }
  private _getCartDetails(){
    this.cartService.cart$.pipe(takeUntil(this.endsubs$)).subscribe((respCart)=>{
      this.cartItemsDetailed =[];
      this.cartCount = respCart?.items.length ?? 0;
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

  deleteCartItem(cartItem : cartItemDetailed){
   this.cartService.deleteCartItem(cartItem.product.id)
  }

  updateCartItemQuantity(event, cartItem: cartItemDetailed){
    console.log(event.value);
    this.cartService.setCartItem({

      productId: cartItem.product.id,
      quantity: event.value
    }, true)

  }
}
