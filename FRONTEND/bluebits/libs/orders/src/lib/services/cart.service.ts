import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class CartService {

  constructor(){}

  //save cart item to local storage whenn user refereh the page the cart is save in local storage

  initCartLocalStorage(){
    const initialCart = {
      items:[]
    };

    //convert json stringify for set item
    const initialCartJson = JSON.stringify(initialCart);
    localStorage.setItem('cart', initialCartJson)
  }
}
