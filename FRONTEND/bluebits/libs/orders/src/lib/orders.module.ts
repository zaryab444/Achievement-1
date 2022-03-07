import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import {BadgeModule} from 'primeng/badge';
import { OrderCartPageComponent } from './components/cart-page/orders-cart-page.component';
import {ButtonModule} from 'primeng/button';
import {InputNumberModule} from 'primeng/inputnumber';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';
import {DropdownModule} from 'primeng/dropdown';
import {InputMaskModule} from 'primeng/inputmask';

export const usersRoutes: Route[]=[];


const routes : Routes =[
  {
    path:'cart',
    component:OrderCartPageComponent
  },
  {
    path:'checkout',
    component:CheckoutPageComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BadgeModule,
    ButtonModule,
    DropdownModule,
    InputNumberModule,
    FormsModule,
    InputMaskModule,
    ReactiveFormsModule,

    RouterModule.forChild(routes)
  ],
    declarations: [
      CartIconComponent,
      OrderCartPageComponent,
      OrderSummaryComponent,
      CheckoutPageComponent

    ],
    exports:[
      CartIconComponent,
      OrderCartPageComponent
    ],
})

export class ordersModule{

  constructor(cartService: CartService){
    //for running only one time
    cartService.initCartLocalStorage();

  }
}
