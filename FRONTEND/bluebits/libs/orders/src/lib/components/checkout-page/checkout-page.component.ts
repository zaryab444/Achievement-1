import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '@bluebits/users';
import { StripeService } from 'ngx-stripe';
import { Subject, take, takeUntil } from 'rxjs';
import { Cart } from '../../models/cart';
import { OrderItem } from '../../models/order-item';
import { Order } from '../../models/orders';
import { ORDER_STATUS } from '../../order.constant';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/orders.service';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private cartService : CartService,
    private paymentService : PaymentService,
    private orderService: OrderService
   
  ) {}
  checkoutFormGroup: FormGroup;
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  userId: string;
  countries = [];
  unsubscribe$ : Subject<any> = new Subject();

  ngOnInit(): void {
    this._initCheckoutForm();
    this._autoFillUserData();
    this._getCartItems();
    this._getCountries();
  }
  ngOnDestroy(){
    this.unsubscribe$.next;
    this.unsubscribe$.complete();

  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  private _getCartItems(){
 const cart : Cart =  this.cartService.getCart();
 this.orderItems = cart.items.map(item =>{
   return{
       product: item.productId,
       quantity: item.quantity
   };
 });

console.log(this.orderItems);

  }

  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }
  
    //if you not use stripe so use this comment code or see above
    const order: Order = {
       
      orderItems : this.orderItems,
     shippingAddress1:this.checkoutForm.street.value,
     shippingAddress2:this.checkoutForm.apartment.value,
     city:this.checkoutForm.city.value,
     zip:this.checkoutForm.zip.value,
     country:this.checkoutForm.country.value,
     phone:this.checkoutForm.phone.value,

     //pending
     status: 0,
     user:this.userId,
     dateOrdered:`${Date.now()}`
    };

this.orderService.cacheOrderData(order);
 this.paymentService.createCheckoutSession(this.orderItems).subscribe(error =>{
     if(error){
       console.log('error in redirect to payment');
     }
   });
  
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }

  private _autoFillUserData(){
    this.usersService.observeCurrentUser().pipe(takeUntil(this.unsubscribe$)).subscribe((user)=>{
      
      if(user){
        this.userId = user.id;
      this.checkoutForm.name.setValue(user.name);
       this.checkoutForm.email.setValue(user.email);
        this.checkoutForm.phone.setValue(user.phone);
         this.checkoutForm.city.setValue(user.city);
          this.checkoutForm.country.setValue(user.country);
           this.checkoutForm.zip.setValue(user.zip);
            this.checkoutForm.apartment.setValue(user.apartment);
             this.checkoutForm.street.setValue(user.street);
      
    
    }

    })
  }
}
