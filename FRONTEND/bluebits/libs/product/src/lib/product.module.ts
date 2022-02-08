import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ProductSearchComponent } from './component/product-search.component';
import { CategoriesBannerComponent } from './component/categories-banner/categories-banner';
import {RouterModule} from '@angular/router';


@NgModule({

  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    ProductSearchComponent,
    CategoriesBannerComponent

  ],
  exports:[
    ProductSearchComponent,
    CategoriesBannerComponent

  ],
})

export class ProductModule{}
