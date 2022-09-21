import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  public currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  public ff:any;
  // baseServerUrl = "https://localhost:5001/api/";
baseServerUrl = "https://tweetappazureapi.azurewebsites.net/api/";
  jwtHelperService = new JwtHelperService();

  registerUser(user:Array<string>){
    return this.http.post(this.baseServerUrl+"User/CreateUser",{
      Name: user[0],
      Email: user[1],
      Password: user[2]
    },{
      responseType:'text',
    });
  }

  loginUser(loginInfo:Array<string>){
    return this.http.post(this.baseServerUrl + 'User/LoginUser',{
      Email:loginInfo[0],
      Password:loginInfo[1]
    },
    {
      responseType:'text',
    });
  }

  setToken(token:string){
    localStorage.setItem("access_token",token);
    this.loadCurrentUser();
  }

  loadCurrentUser(){
    const token=localStorage.getItem("access_token");
    const userInfo = token != null ? this.jwtHelperService.decodeToken(token):null;
      
    const data = userInfo ? {
      UserId : userInfo.UserId,
      name: userInfo.name,
      email: userInfo.email
    }:null;
    this.currentUser.next(data);
    return this.currentUser;
  }

  

  isLoggedin():boolean{
    return localStorage.getItem("access_token")?true:false;
  }

  removeToken(){
    localStorage.removeItem("access_token");
  }
}
