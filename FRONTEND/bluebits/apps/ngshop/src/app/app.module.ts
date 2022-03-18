import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiModule } from '@bluebits/ui';
import {AccordionModule} from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component';
import {CheckboxModule} from 'primeng/checkbox';

import { ProductModule } from '@bluebits/product';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ordersModule } from '@bluebits/orders';
import { FormsModule } from '@angular/forms';
import { CategoriesBannerComponent } from './pages/categories-banner/categories-banner';
import { MessagesComponent } from './shared/messages/messages.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { JwtInterceptor, UserModule } from '@bluebits/users';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxStripeModule } from 'ngx-stripe';


const routes :Routes =[
  {path:'', component: HomePageComponent},
  {path:'products',component:ProductListComponent},
  {
    path: 'category/:categoryid',
    component: ProductListComponent
  },
  // {
  //   path: 'products/:productid',
  //   component: ProductPageComponent
  // }
]
@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, HomePageComponent, ProductListComponent, HeaderComponent, FooterComponent, NavComponent,  CategoriesBannerComponent, MessagesComponent ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ProductModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    RouterModule.forRoot(routes),
    UiModule,
    AccordionModule,
    ordersModule,
    CheckboxModule,
    FormsModule,
    ToastModule,
    UserModule,
     NgxStripeModule.forRoot('pk_test_51KeeRCHTZ2FrHXoyhJ5ZvAIeMYiZEIstUNMR2WJ8knQYIQ6CGSA0XM3BU7GbjKjVEkgVh2xSBFqOMCWyYLKLL8vo00KSH3lDQz'),



    ],
  providers: [MessageService,
  {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
