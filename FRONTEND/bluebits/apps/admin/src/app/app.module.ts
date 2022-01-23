import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {ColorPickerModule} from 'primeng/colorpicker';

import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputSwitchModule} from 'primeng/inputswitch';
import {EditorModule} from 'primeng/editor';
import {InputMaskModule} from 'primeng/inputmask';
import { ChipModule } from "primeng/chip";
import {DropdownModule} from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import {FieldsetModule} from 'primeng/fieldset';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { CategoryFormComponent } from './pages/categories/category-form/category-form.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';




const routes: Routes = [
    {
      path: '',
      component: ShellComponent,
      children: [{
        path:  'dashboard',
        component: DashboardComponent
      },
    {
      path: 'categories',
      component: CategoriesListComponent
    },
    {
      path:'category/form',
      component: CategoryFormComponent
    },
    {
      path:'category/form/:id',
      component: CategoryFormComponent
    },

    {
      path: 'products',
      component: ProductListComponent
    },
    {
      path:'products/form',
      component: ProductFormComponent
    },
    {
      path:'products/form/:id',
      component: ProductFormComponent
    },

    {
      path: 'users',
      component: UsersListComponent
    },
    {
      path:'users/form',
      component: UsersFormComponent
    },
    {
      path:'users/form/:id',
      component: UsersFormComponent
    },

    {
      path: 'orders',
      component: OrdersListComponent
    },
    {
      path: 'orders/:id',
      component: OrdersDetailComponent
    },

    ]
    }
];





@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, DashboardComponent, ShellComponent, SidebarComponent, CategoriesListComponent, CategoryFormComponent, ProductListComponent,ProductFormComponent, UsersListComponent, UsersFormComponent, OrdersDetailComponent, OrdersListComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    ToastModule,
    ColorPickerModule,
    InputTextModule,
    InputNumberModule,
    InputSwitchModule,
    DropdownModule,
    TagModule,
    ChipModule,
    EditorModule,
    FieldsetModule,
    InputMaskModule,
    ConfirmDialogModule,
    RouterModule.forRoot(routes),
  ],
  providers: [MessageService, ConfirmationService ],
  bootstrap: [AppComponent],
})
export class AppModule {}
