import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService } from '@bluebits/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'bluebits-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: User [] = [];
  endsubs$ : Subject<any> = new Subject();

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._getUsers();
  }

  ngOnDestroy() {
    this.endsubs$.next;
    this.endsubs$.complete();
}


deleteUser(userId: string){
  this.confirmationService.confirm({
    message: 'Do you delete this User?',
    header: 'Delete User',
    icon: 'pi pi-exclamation-triangle',
    accept:()=>{
      this.usersService.deleteUser(userId).subscribe(()=>{
        this._getUsers();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User is deleted'
        });
      },
      ()=>{
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not deleted'

        })
      }
      )
    }
  })
}


getCountryName(countryKey: string){
     if(countryKey) return this.usersService.getCountry(countryKey);
}


updateUser(userid: string){
  this.router.navigateByUrl(`users/form/${userid}`);
}

// we use take utils observable pipe this is better then unsubscribe also the pipe filter the data and destroy this subscription when endsubs variable is complete
private _getUsers(){
  this.usersService.getUsers().pipe(takeUntil(this.endsubs$)).subscribe((users)=>{
    this.users = users;
  })
}



}
