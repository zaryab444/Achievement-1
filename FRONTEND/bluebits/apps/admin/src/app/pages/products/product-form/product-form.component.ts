import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '@bluebits/product';

@Component({
  selector: 'bluebits-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  editmode = false;
  form: FormGroup;
  isSubmitted = false;
  catagories= [];
  constructor(
    private formBuilder: FormBuilder,
    private categoriesService : CategoriesService
    ) { }

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
  }

  private _initForm(){
    this.form = this.formBuilder.group({
      name:['', Validators.required],
      brand:['', Validators.required],
      price:['', Validators.required],
      category:['', Validators.required],
      countInStock:['', Validators.required],
      description:['', Validators.required],
      richDescription:[''],
      image:[''],
      isFeatured:[''],
    })
  }

  private _getCategories(){
   this.categoriesService.getCategories().subscribe(categoies =>{
     this.catagories = categoies
   })
  }
  get productForm(){
    return this.form.controls;
  }
}
