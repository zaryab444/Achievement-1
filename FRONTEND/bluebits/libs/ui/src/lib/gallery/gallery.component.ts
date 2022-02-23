import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  selectedImage : string;

  //array of string because we have multiple paths
  @Input() images: string[];
  constructor() { }

  ngOnInit(): void {

    //this condtion will show first main image
    if(this.images.length){
    this.selectedImage = this.images[0]
    }
  }

}
