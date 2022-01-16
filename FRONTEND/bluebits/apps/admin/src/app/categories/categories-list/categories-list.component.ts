import { Component, OnInit } from '@angular/core';
import {CategoriesService, Category} from '@bluebits/product';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'bluebits-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private confirmationService: ConfirmationService,
    private categoriesService: CategoriesService,
    private messageService: MessageService

    ) { }

  ngOnInit(): void {
   this._getCategories()
  }



  deleteCategory(categoryId :string){
    this.confirmationService.confirm({
      message: 'Are you sure to delete this category ?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).subscribe(
          (response)=>{
            this._getCategories();
          this.messageService.add({severity:'success',
          summary:'Success',
           detail:'Category is deleted'});
        },
        (error)=>{
          this.messageService.add({severity:'error', summary:'error', detail:'Category is not deleted'});
        }
        );
      },
      reject: (type) => {

      }
  });


}

private _getCategories(){
  this.categoriesService.getCategories().subscribe(cats => {
    this.categories = cats;
  });
}
}
