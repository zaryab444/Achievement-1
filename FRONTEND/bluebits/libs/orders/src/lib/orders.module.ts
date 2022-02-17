import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { CartService } from './services/cart.service';

export const usersRoutes: Route[]=[];
@NgModule({
  imports: [CommonModule, RouterModule]
})

export class ordersModule{

  constructor(cartService: CartService){
    //for running only one time
    cartService.initCartLocalStorage();

  }
}
