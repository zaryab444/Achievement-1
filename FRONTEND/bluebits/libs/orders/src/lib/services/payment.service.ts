import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';

import {  switchMap } from "rxjs";
import {environment} from '@env/environment';

import { OrderItem } from "../models/order-item";
import { StripeService } from "ngx-stripe";

@Injectable({
  providedIn: 'root'
})

export class PaymentService {
  apiURLOrders = environment.apiURL + 'orders';
 
  constructor(private http: HttpClient,
    private stripeService: StripeService
    
    ) {}


  
  createCheckoutSession(orderItem:OrderItem[]){
    return this.http.post(`${this.apiURLOrders}/create-checkout-session`, orderItem).pipe(switchMap((session:{id:string})=>{
     return this.stripeService.redirectToCheckout({sessionId: session.id})
    }));
  }
}
