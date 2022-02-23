import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  selectedImageUrl : string;

  //array of string because we have multiple paths
  @Input() images: string[];
  constructor() { }

  ngOnInit(): void {

    //this condtion will show first main image
    if(this.hasImages){
    this.selectedImageUrl = this.images[0]
    }
  }

  //this method is click to select different image
  changeSelectedImage(imageUrl: string){
    this.selectedImageUrl = imageUrl
  }

  get hasImages(){
    //if no images has found
    return this.images?.length > 0;
  }


}
