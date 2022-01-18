import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@bluebits/product';

@Component({
  selector: 'admin-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products = [];
  constructor(private productsService : ProductsService) { }

  ngOnInit(): void {
    this._getProducts();
  }

  private _getProducts(){
    this.productsService.getProducts().subscribe(products =>{
      this.products = products;
    })
  }

}
