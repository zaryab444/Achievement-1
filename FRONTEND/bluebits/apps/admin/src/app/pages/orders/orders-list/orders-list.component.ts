import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrderService } from '@bluebits/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { ORDER_STATUS } from './order.constant';





@Component({
  selector: 'bluebits-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OrdersListComponent implements OnInit {


   orders :Order[] = [];
   orderStatus = ORDER_STATUS;
   endsubs$ : Subject<any> = new Subject();
  constructor(
    private orderService : OrderService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this._getOrders();
  }

  ngOnDestroy() {
    this.endsubs$.next;
    this.endsubs$.complete();
}

// we use take utils observable pipe this is better then unsubscribe also the pipe filter the data and destroy this subscription when endsubs variable is complete
   _getOrders(){
    this.orderService.getOrders().pipe(takeUntil(this.endsubs$)).subscribe(data =>{
      this.orders = data;
    })
  }

   showOrder(orderId){
       this.router.navigateByUrl(`orders/${orderId}`)
  }

  deleteOrder(orderId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.orderService.deleteOrder(orderId).subscribe(
          () => {
            this._getOrders();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Order is deleted!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Order is not deleted!'
            });
          }
        );
      }
    });
  }

}
