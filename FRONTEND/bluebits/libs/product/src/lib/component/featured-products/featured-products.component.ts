import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { Product } from "../../models/product";
import { ProductsService } from "../../services/products.service";

@Component({
  selector: 'products-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-product.component.scss']
})
export class FeaturedProductComponent implements OnInit, OnDestroy {

  featuredproducts: Product[] = [];
  endSubs$ : Subject<any> = new Subject();
  constructor(private prodService: ProductsService) { }

  ngOnInit(): void {
    this._getFeaturedProducts();
  }

  ngOnDestroy(): void {
      this.endSubs$.next;
      this.endSubs$.complete();
  }
  private _getFeaturedProducts(){


    //because i have 5 featured product in database
    this.prodService.getFeaturedProduct(5).pipe(takeUntil(this.endSubs$)).subscribe(products => {
      this.featuredproducts =products;
    })

  }

}



