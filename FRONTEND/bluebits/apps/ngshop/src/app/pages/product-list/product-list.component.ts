import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category, Product, ProductsService } from '@bluebits/product';

@Component({
  selector: 'ngshop-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  categories: Category[] =[];
  isCategoryPage: boolean;
  constructor(
    private prodService: ProductsService,
    private catService: CategoriesService,
    private route: ActivatedRoute

    ) { }

  ngOnInit(): void {

    this.route.params.subscribe((params)=>{
      //if product is not found based on cat.id then return all product without any filter
      params.categoryid ? this._getProducts([params.categoryid]) : this._getProducts();

      // checkk if the category page is here or not based on hidiing check box
      params.categoryid ? (this.isCategoryPage = true) : (this.isCategoryPage = false);

    });
   // this._getProducts();
    this._getCategories();

  }

  private _getProducts(categoriesFilter?: string[]){
    this.prodService.getProducts(categoriesFilter).subscribe((res)=>{
      this.products = res;
    })
  }

  private _getCategories(){
    this.catService.getCategories().subscribe((res)=>{
      this.categories = res;
    })
  }

  categoryFilter(){

    //filter the array to show selected categries

    //map the filter array to show only category id in array
     const selectedCategories = this.categories.filter((category) => category.checked).map(category => category.id);
     this._getProducts(selectedCategories)
    console.log(selectedCategories)
  }


}
