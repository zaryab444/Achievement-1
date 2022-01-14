import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@bluebits/product';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'bluebits-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {


  form: FormGroup;
  isSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private categoriesService : CategoriesService,
    private messageService: MessageService,
    private location: Location
    ) { }

  ngOnInit(): void {
       this.form = this.formBuilder.group({
            name:['',Validators.required],
            icon:['',Validators.required],
       });
  }

  onSubmit(){
    this.isSubmitted = true
    if(this.form.invalid){
      return;
    }
    const category : Category={

      name: this.categroyForm.name.value,
      icon: this.categroyForm.icon.value

    }
    this.categoriesService.createCategory(category).subscribe(response =>{

      this.messageService.add({severity:'success', summary:'Success', detail:'Category is Created'});
      timer(2000).toPromise().then(done =>{
        this.location.back();
      })

    },
    (error)=>{
      this.messageService.add({severity:'error', summary:'error', detail:'Category is not Created'});
    }

    );

  }


  get categroyForm()
  {

    return this.form.controls;
  }



}
