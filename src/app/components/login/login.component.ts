import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginAuth:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  loginform = new FormGroup({
    email:new FormControl(""),
    password:new FormControl("")
  });

  isUserValid:boolean = false;
  loginSubmitted(){
    
    this.loginAuth.loginUser([this.loginform.value.email!,this.loginform.value.password!])
    .subscribe(res=>{
      if(res == 'Failure'){
        this.isUserValid = false;
        alert('Login Unsuccessful');
      }
      else{
        this.isUserValid= true;
        // alert(res);
        // this.setToken(res);
        this.loginAuth.setToken(res);
        this.router.navigateByUrl('tweet');
      }
    });
  }



  get Email():FormControl{
    return this.loginform.get('email') as FormControl;
  }

  get Password():FormControl{
    return this.loginform.get('password') as FormControl;
  }

}
