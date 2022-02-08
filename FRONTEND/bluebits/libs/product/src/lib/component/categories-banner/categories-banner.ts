import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, take, takeUntil } from "rxjs";
import { Category } from "../../models/category";
import { CategoriesService } from "../../services/categories.service";

@Component({
  selector: 'categories-banner',
  templateUrl: './categories-banner.component.html',
  styleUrls: ['./categories-banner.scss']
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {

  categories: Category[] =[];
  endSubs$  :  Subject<any> = new Subject();
  constructor(private categoryservice : CategoriesService) { }

  ngOnInit(): void {
    this.categoryservice.getCategories().pipe(takeUntil(this. endSubs$ )).subscribe(categories =>{
      this.categories = categories;
    })
  }

  ngOnDestroy(){

    //go to next step
      this.endSubs$.next;
      //complete the subscription then destroy
      this.endSubs$.complete();
  }

}
