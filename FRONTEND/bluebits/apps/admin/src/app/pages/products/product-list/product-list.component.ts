import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@bluebits/product';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products = [];
  endsubs$ : Subject<any> = new Subject();
  constructor(
    private productsService : ProductsService,
    private router: Router,
    private confirmationService: ConfirmationService,

    private messageService: MessageService,) { }

  ngOnInit(): void {
    this._getProducts();
  }

  ngOnDestroy() {
    this.endsubs$.next;
    this.endsubs$.complete();
}


// we use take utils observable pipe this is better then unsubscribe also the pipe filter the data and destroy this subscription when endsubs variable is complete
  private _getProducts(){
    this.productsService.getProducts().pipe(takeUntil(this.endsubs$)).subscribe(products =>{
      this.products = products;
    })
  }

  updateProduct(productid : string){
    this.router.navigateByUrl(`products/form/${productid}`)
  }

  deleteProduct(productId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productId).subscribe(
          () => {
            this._getProducts();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product is deleted!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Product is not deleted!'
            });
          }
        );
      }
    });
  }

}
