import { Component, OnInit } from '@angular/core';
import { UsersService } from '@bluebits/users';

@Component({
  selector: 'ngshop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private userService: UsersService){

  }

  ngOnInit() {
      this.userService.initAppSession();
  }
  title = 'ngshop';
}
