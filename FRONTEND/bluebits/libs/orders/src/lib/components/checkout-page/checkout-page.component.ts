import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '@bluebits/users';
import { Cart } from '../../models/cart';
import { OrderItem } from '../../models/order-item';
import { Order } from '../../models/orders';
import { ORDER_STATUS } from '../../order.constant';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/orders.service';

@Component({
  selector: 'checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {

  constructor(
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private cartService : CartService,
    private orderService : OrderService
  ) {}
  checkoutFormGroup: FormGroup;
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  userId = "6229de06945574328ba4505d";
  countries = [];

  ngOnInit(): void {
    this._initCheckoutForm();
    this._getCartItems();
    this._getCountries();
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
    this.orderService.createOrder(order).subscribe(()=>{

        //after success fully place order we clear the cart in localstorage also
      this.cartService.emptyCart();

   
    this.router.navigate(['/success']);

    

    },
    ()=>{
      //display some error message to user
    });
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }
}
