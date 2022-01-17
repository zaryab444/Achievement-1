import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {ColorPickerModule} from 'primeng/colorpicker';

import {InputTextModule} from 'primeng/inputtext';

import { HttpClientModule } from '@angular/common/http';
import { CategoryFormComponent } from './categories/category-form/category-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';



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

    ]
    }
];





@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, DashboardComponent, ShellComponent, SidebarComponent, CategoriesListComponent, CategoryFormComponent],
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
    ConfirmDialogModule,
    RouterModule.forRoot(routes),
  ],
  providers: [MessageService, ConfirmationService ],
  bootstrap: [AppComponent],
})
export class AppModule {}
