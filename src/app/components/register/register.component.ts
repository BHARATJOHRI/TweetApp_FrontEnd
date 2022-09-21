import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService:AuthService) { }

  displayMsg:string = 'none';
  isAccountCreated:boolean = false;

  ngOnInit(): void {
  }

  register = new FormGroup({
    name:new FormControl(''),
    email:new FormControl(''),
    password:new FormControl(''),
  });

  registerSubmitted(){
    console.log(this.register);
    this.authService.registerUser([
      this.register.value.name!,
      this.register.value.email!,
      this.register.value.password!
    ]).subscribe(res => {
      if(res == 'Success'){
        this.displayMsg = 'Account Created';
        this.isAccountCreated = true;
      }
      else if(res == 'Already Register'){
        this.displayMsg = 'Account Already Exixts';
        this.isAccountCreated = false;
      }
      else{
        this.displayMsg = 'Something';
        this.isAccountCreated = false;
      }
      
    });
  }

}
