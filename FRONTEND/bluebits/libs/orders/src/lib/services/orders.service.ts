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
  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiURLOrders, order);
  }

  updateOrder(orderStaus: { status: string }, orderId: string): Observable<Order> {
    return this.http.put<Order>(`${this.apiURLOrders}/${orderId}`, orderStaus);
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLOrders}/${orderId}`);
  }



}
