import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ProductSearchComponent } from './component/product-search.component';


@NgModule({

  imports: [CommonModule],
  declarations: [ProductSearchComponent],
  exports:[ProductSearchComponent],
})

export class ProductModule{}
