import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category, Product, ProductsService } from '@bluebits/product';

@Component({
  selector: 'ngshop-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  categories: Category[] =[];
  constructor(
    private prodService: ProductsService,
    private catService: CategoriesService) { }

  ngOnInit(): void {
    this._getProducts();
    this._getCategories();

  }

  private _getProducts(){
    this.prodService.getProducts().subscribe((res)=>{
      this.products = res;
    })
  }

  private _getCategories(){
    this.catService.getCategories().subscribe((res)=>{
      this.categories = res;
    })
  }
}
