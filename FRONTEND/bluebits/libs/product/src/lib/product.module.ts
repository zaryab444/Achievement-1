import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ProductSearchComponent } from './component/product-search.component';
import { CategoriesBannerComponent } from './component/categories-banner/categories-banner';
import {RouterModule} from '@angular/router';
import {  FeaturedProductComponent } from './component/featured-products/featured-products.component';
import { ProductItemComponent } from './component/product-item/product-item.component';
import {ButtonModule} from 'primeng/button';

@NgModule({

  imports: [
    CommonModule,
    RouterModule,
    ButtonModule
  ],
  declarations: [
    ProductSearchComponent,
    CategoriesBannerComponent,
    FeaturedProductComponent,
    ProductItemComponent,

  ],
  exports:[
    ProductSearchComponent,
    CategoriesBannerComponent,
    FeaturedProductComponent,
    ProductItemComponent,
  ],
})

export class ProductModule{}
