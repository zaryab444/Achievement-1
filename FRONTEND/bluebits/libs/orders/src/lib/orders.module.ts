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
import { ThankyouPageComponent } from './components/thankyou-page/thankyou-page.component';
import { AuthGuard, JwtInterceptor } from '@bluebits/users';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export const usersRoutes: Route[]=[];


const routes : Routes =[
  {
    path:'cart',
    component:OrderCartPageComponent
  },
  {
    path:'checkout',
    canActivate: [AuthGuard],
    component:CheckoutPageComponent
  },
  {
    path:'success',
    component: ThankyouPageComponent
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
   providers: [
  {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
    declarations: [
      CartIconComponent,
      OrderCartPageComponent,
      OrderSummaryComponent,
      CheckoutPageComponent,
      ThankyouPageComponent

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
