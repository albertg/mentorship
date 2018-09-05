import { Injectable } from '@angular/core';

@Injectable()
export class UserserviceService {
  public isUserLoggedin;
  public firstname :string;
  public lastName;
  public userid;
  public email;
  public role;
  public profileimage;
  public practiceId;
  constructor() {

    this.isUserLoggedin= false;
  }
  setUserlogin(data){
    if(data.id){
    this.isUserLoggedin=true;
    this.firstname=data.firstName;
    this.lastName=data.lastName;
    this.userid=data.id
    this.email=data.email
    this.role=data.roles[0].roleName
    this.profileimage=data.profileImage
    this.practiceId=data.practiceId;

  }
  }

  getUserLogin(){
    return this.isUserLoggedin;

  }
  logout(){
    return this.isUserLoggedin= false;
  }

}
