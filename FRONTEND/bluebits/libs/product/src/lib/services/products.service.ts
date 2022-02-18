import { Injectable } from "@angular/core";
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from "rxjs";
import {environment} from '@env/environment';
import { Product } from "../models/product";
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  apiURLProducts = environment.apiURL + 'products';
  constructor(private http: HttpClient) {}

   //this comment code is simple get api work
  // getProducts(): Observable  <Product[]>{
  //   return this.http.get<Product[]>(this.apiURLProducts);
  // }

  getProducts(categoriesFilter?: string[]): Observable  <Product[]>{
    //we use http params because in postman we filter product by category in params postman thats why we use http params
    let params = new HttpParams
    if(categoriesFilter){
      //we use array join to seperate the more categories ids when we check in postman
      params = params.append('categories',categoriesFilter.join(','),);
      console.log(params);
    }
    return this.http.get<Product[]>(this.apiURLProducts,{params: params});
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



  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLProducts}/${productId}`);
  }

//for dashboard
  getProductsCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLProducts}/get/count`)
      .pipe(map((objectValue: any) => objectValue.productCount));
  }

  getFeaturedProduct(count: Number): Observable<Product[]>{
      return this.http.get<Product[]>(`${this.apiURLProducts}/get/featured/${count}`)
  }

}
