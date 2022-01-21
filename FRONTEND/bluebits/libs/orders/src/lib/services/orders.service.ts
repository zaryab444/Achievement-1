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
  apiURLCategories = environment.apiURL + 'orders';
  constructor(private http: HttpClient) {}


  getOrders(): Observable  <Order[]>{
    return this.http.get<Order[]>(this.apiURLCategories);
  }

  //we remove array in <Category model> because its single get by id
  // getCategory(categoryId: string): Observable  <Category>{
  //   return this.http.get<Category>(`${this.apiURLCategories}/${categoryId}` )
  // }

  // createCategory(category: Category): Observable<Category>{
  //   return this.http.post<Category>(this.apiURLCategories, category)
  // }

  // updateCategory(category: Category): Observable<Category>{
  //   return this.http.put<Category>(`${this.apiURLCategories}/${category.id}`,category)
  // }



  // deleteCategory(categoryId: string):Observable<any> {
  //   return this.http.delete<any>(`${this.apiURLCategories}/${categoryId}`)
  // }


}
