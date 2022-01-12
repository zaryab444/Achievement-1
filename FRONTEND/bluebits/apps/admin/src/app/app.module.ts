import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import {InputTextModule} from 'primeng/inputtext';

import { HttpClientModule } from '@angular/common/http';
import { CategoryFormComponent } from './categories/category-form/category-form.component';


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
    }
    ]
    }
];





@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, DashboardComponent, ShellComponent, SidebarComponent, CategoriesListComponent, CategoryFormComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
