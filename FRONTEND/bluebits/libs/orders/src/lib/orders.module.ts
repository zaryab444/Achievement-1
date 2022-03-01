import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import {BadgeModule} from 'primeng/badge';

export const usersRoutes: Route[]=[];
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BadgeModule
  ],
    declarations: [
      CartIconComponent

    ],
    exports:[
      CartIconComponent
    ],
})

export class ordersModule{

  constructor(cartService: CartService){
    //for running only one time
    cartService.initCartLocalStorage();

  }
}
