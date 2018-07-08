import { Http,Headers  } from '@angular/http';
import { Injectable } from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt'; 
import 'rxjs/add/operator/map'; 

@Injectable()
export class AuthService {
  currentUser: any; 
  url = 'http://localhost:3001/sessions/authenticate';
  constructor(private http: Http) {
    let token = localStorage.getItem('token');
    if (token) {
      let jwt = new JwtHelper();
      this.currentUser = jwt.decodeToken(token);
    }
  }

  login(username,password) { 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Username', username);
    headers.append('Password', password);
    return this.http.get(this.url,{headers:headers})
    .map(response => {
      let result = response.json();
          
      if (result && result.token) {
        console.log("result ",result);
        localStorage.setItem('token', result.token);

        let jwt = new JwtHelper();
        this.currentUser = jwt.decodeToken(localStorage.getItem('token'));

        return true; 
      }
      else 
      return false; 
    });
      
  }

  logout() { 
    localStorage.removeItem('token');
    this.currentUser = null;
  }

  isLoggedIn() { 
    return tokenNotExpired('token');
  }

  openDashboard(event):void
  {
    event.preventDefault();
    window.open("http://10.64.109.247:8888/sources/1/dashboards/1#", "_blank");
  }

  
}

