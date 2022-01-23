import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
//import { Category } from "../models/category";
import { Observable } from "rxjs";
import {environment} from '@env/environment';
import { Order } from "../models/orders";

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  apiURLOrders = environment.apiURL + 'orders';
  constructor(private http: HttpClient) {}


  getOrders(): Observable  <Order[]>{
    return this.http.get<Order[]>(this.apiURLOrders);
  }

  getOrder(orderId: string): Observable<Order>{
    return this.http.get<Order>(`${this.apiURLOrders}/${orderId}`);
  }




}
