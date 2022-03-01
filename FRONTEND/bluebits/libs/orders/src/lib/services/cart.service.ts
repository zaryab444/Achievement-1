import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Cart, CartItem } from "../models/cart";

export const CART_KEY = "cart";
@Injectable({
  providedIn: 'root'
})

export class CartService {

  cart$ : BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

  constructor(){}

  //save cart item to local storage whenn user refereh the page the cart is save in local storage

  initCartLocalStorage(){

    const cart : Cart = this.getCart();
    if(!cart){
    const initialCart = {
      items:[]
    };
     //convert json stringify for set item
     const initialCartJson = JSON.stringify(initialCart);
     localStorage.setItem(CART_KEY, initialCartJson)
  }



  }


getCart() : Cart {
  const cartJsonString: string = localStorage.getItem(CART_KEY)
  const cart: Cart = JSON.parse(cartJsonString);
  return cart
}


   setCartItem(cartItem: CartItem): Cart {
    const cart = this.getCart();

    //check if the product id is same in cart item then increase the quantity
    const cartItemExist = cart.items.find((item)=> item.productId === cartItem.productId)
    if(cartItemExist){
        cart.items.map(item =>{
          if(item.productId === cartItem.productId){
            item.quantity = item.quantity + cartItem.quantity;
            return item;
          }
        })
    }
    else{
      cart.items.push(cartItem);
    }




   //convert into stringify
   const cartJson = JSON.stringify(cart);

   //set the cart item in local storage
   localStorage.setItem(CART_KEY, cartJson)
   //everyone who is subscribing they will feel the change in cart
   this.cart$.next(cart);
     return cart;

   }




}
