import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@bluebits/users';
import { LocalstorageService } from 'libs/users/src/lib/services/localstorage.service';


@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(  private token: LocalstorageService,   private router: Router) {}

  ngOnInit(): void {}

  logoutUser() {
    this.token.removeToken();
    this.router.navigate(['/login'])
  }
}
