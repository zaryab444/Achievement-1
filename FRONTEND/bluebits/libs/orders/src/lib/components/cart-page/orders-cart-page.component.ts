import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'orders-cart-page',
  templateUrl: './orders-cart-page.component.html',
  styleUrls: ['./orders-cart-page.component.scss']
})
export class OrderCartPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  backToShop(){
     this.router.navigate(['/products']);
  }

  deleteCartItem(){

  }
}
