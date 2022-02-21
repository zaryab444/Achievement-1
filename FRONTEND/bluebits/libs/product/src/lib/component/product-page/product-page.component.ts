import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { Product } from "../../models/product";
import { ProductsService } from "../../services/products.service";

@Component({
  selector: 'product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, OnDestroy {
  product: Product;
  endSubs$: Subject<any> = new Subject;
  quantity: number;

  constructor(
    private prodService: ProductsService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      if(params.productid){
        this._getProduct(params.productid);
      }
    })
  }
  ngOnDestroy(): void {
    this.endSubs$.next;
    this.endSubs$.complete();

}
  private _getProduct(id: string){
      this.prodService.getProduct(id).pipe(takeUntil(this.endSubs$)).subscribe(res =>{
        this.product = res;
      })
  }
  addProductToCart(){

  }



}
