import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http,Headers  } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { AuthService } from './../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  invalidLogin: boolean; 
  url = 'http://localhost:3001/sessions/create';
  complexForm : FormGroup;
  constructor(public router: Router, 
              private authService: AuthService, 
              public fb: FormBuilder) {
    this.complexForm = fb.group({
      'username' : [null, Validators.required],
      'password': [null, Validators.required]
    })
   
  }

  login(login) {
    this.authService.login(login.username,login.password)
    .subscribe(result => { 
      
      if (result){
        console.log("login result ",result);
        this.router.navigate(['/mainscreen']);
      }
      else 
        this.invalidLogin = true;         
    },
    error => {
      this.invalidLogin = true;
      console.log("in error comp",error.text());
    }
  );
      
  }

}
