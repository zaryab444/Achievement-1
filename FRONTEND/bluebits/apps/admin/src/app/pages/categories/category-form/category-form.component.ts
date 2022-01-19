import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService, Category } from '@bluebits/product';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {


  form: FormGroup;
  isSubmitted = false;

  //we initialize false  because form by default not edit mode
  editmode = false;
  currentCategoryId : string;

  constructor(private formBuilder: FormBuilder,
    private categoriesService : CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
       this.form = this.formBuilder.group({
            name:['',Validators.required],
            icon:['',Validators.required],
            color:['#fff']
       });

       //this method check the form is edit mode or not
      this._checkEditMode();
  }

 private _checkEditMode(){
   this.route.params.subscribe((params)=>{
     if(params.id){
       this.editmode = true;
       this.currentCategoryId = params.id
       this.categoriesService.getCategory(params.id).subscribe((category)=>{
        this.categroyForm.name.setValue(category.name);
        this.categroyForm.icon.setValue(category.icon);
        this.categroyForm.color.setValue(category.color);
       })

     }
   });

 }
  onSubmit(){
    this.isSubmitted = true
    if(this.form.invalid){
      return;
    }
    const category : Category={
      id: this.currentCategoryId,
      name: this.categroyForm.name.value,
      icon: this.categroyForm.icon.value,
      color: this.categroyForm.color.value

    }
    if(this.editmode){
      this._updateCategory(category)
    }
    else{
      this._addCategory(category);
    }

  }

  private _addCategory(category: Category){
    this.categoriesService.createCategory(category).subscribe((category: Category) =>{

      this.messageService.add({severity:'success',
      summary:'Success',
      detail:`Category  ${category.name} is Created`});
      timer(2000).toPromise().then(() =>{
        this.location.back();
      })

    },
    (error)=>{
      this.messageService.add({severity:'error', summary:'error', detail:'Category is not Created'});
    }

    );
  }
  private _updateCategory(category: Category){
    this.categoriesService.updateCategory(category).subscribe(response =>{

      this.messageService.add({severity:'success', summary:'Success', detail:'Category is Updated'});
      timer(2000).toPromise().then(done =>{
        this.location.back();
      })

    },
    (error)=>{
      this.messageService.add({severity:'error', summary:'error', detail:'Category is not Updated'});
    }

    );
  }

  get categroyForm()
  {

    return this.form.controls;
  }
  onCancel(){
    this.router.navigateByUrl('/categories')
  }


}
