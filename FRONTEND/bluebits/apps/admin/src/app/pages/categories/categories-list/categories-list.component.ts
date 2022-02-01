import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CategoriesService, Category} from '@bluebits/product';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
    endsubs$ : Subject<any> = new Subject();
  constructor(
    private confirmationService: ConfirmationService,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private router: Router

    ) { }

  ngOnInit(): void {
   this._getCategories();

  }



  ngOnDestroy() {
    this.endsubs$.next;
    this.endsubs$.complete();
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

updateCategory(categoryId :string){
   this.router.navigateByUrl(`category/form/${categoryId}`)
}



// we use take utils observable pipe this is better then unsubscribe also the pipe filter the data and destroy this subscription when endsubs variable is complete
private _getCategories(){
  this.categoriesService.getCategories().pipe(takeUntil(this.endsubs$)).subscribe(cats => {
    this.categories = cats;
  });
}
}
