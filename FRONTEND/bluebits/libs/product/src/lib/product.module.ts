import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ProductSearchComponent } from './component/product-search.component';

import {RouterModule, Routes} from '@angular/router';
import {  FeaturedProductComponent } from './component/featured-products/featured-products.component';
import { ProductItemComponent } from './component/product-item/product-item.component';
import {ButtonModule} from 'primeng/button';
import { ProductPageComponent } from './component/product-page/product-page.component';
import {RatingModule} from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import {InputNumberModule} from 'primeng/inputnumber';

const routes : Routes = [
  {
    path:'products/:productid',
    component: ProductPageComponent
  }
]

@NgModule({

  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    RatingModule,
    FormsModule,
    InputNumberModule,
    RouterModule.forChild(routes),

  ],
  declarations: [
    ProductSearchComponent,
    FeaturedProductComponent,
    ProductItemComponent,
    ProductPageComponent

  ],
  exports:[
    ProductSearchComponent,
    FeaturedProductComponent,
    ProductItemComponent,
    ProductPageComponent
  ],
})

export class ProductModule{}
