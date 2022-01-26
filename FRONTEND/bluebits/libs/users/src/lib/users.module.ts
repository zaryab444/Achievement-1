import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes:Routes =[
  {
    path:'login',
    component: LoginComponent
  }

]



@NgModule({
  imports: [

    CommonModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,

    // we use child root  because parent root defined in app.module.ts
    RouterModule.forChild(routes),
     RouterModule,
  ],
  declarations: [
    LoginComponent
  ]
})

export class UserModule{}
