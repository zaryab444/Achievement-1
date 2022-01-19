import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";
import {environment} from '@env/environment';
import { Product } from "../models/product";

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  apiURLProducts = environment.apiURL + 'products';
  constructor(private http: HttpClient) {}


  getProducts(): Observable  <Product[]>{
    return this.http.get<Product[]>(this.apiURLProducts);
  }

  //we remove array in <Category model> because its single get by id
  getProduct(productId: string): Observable  <Product>{
    return this.http.get<Product>(`${this.apiURLProducts}/${productId}` )
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiURLProducts, productData);
  }

  updateProduct(productData: FormData , productid: string): Observable<Product>{
    return this.http.put<Product>(`${this.apiURLProducts}/${productid}`,productData)
  }



  // deleteCategory(categoryId: string):Observable<any> {
  //   return this.http.delete<any>(`${this.apiURLCategories}/${categoryId}`)
  // }


}
