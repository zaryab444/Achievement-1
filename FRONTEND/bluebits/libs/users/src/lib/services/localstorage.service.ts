import { Injectable } from "@angular/core";

const TOKEN = 'jwtToken';
@Injectable({
  providedIn: 'root'
})

export class LocalstorageService{
  constructor(){

  }

  setToken(data){
    localStorage.setItem(TOKEN, data);
  }

  getToken():string{
    return localStorage.getItem(TOKEN)
  }

  //when user log out remove the token
  removeToken(){
    localStorage.removeItem(TOKEN)
  }
}
