import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from './../services/auth.service';
import { InfraprovisionService } from './../services/infraprovision.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  serviceid:any;
  private sub: any;
  infraserviceid;
  infraNotCreate:boolean;
  
  constructor(private route: ActivatedRoute,public router: Router, public http: Http, public authHttp: AuthHttp,
    public authService: AuthService, private infraService: InfraprovisionService) 
    {
    //this.jwt = localStorage.getItem('token');
    //this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);
    
  }

  ngOnInit() {
    console.log("in ngOnInit");
    this.sub=this.route.params.subscribe(params => {
         this.serviceid = params['serviceid']; // (+) converts string 'id' to a number
         console.log(this.serviceid);
         //this.infraserviceid=[this.serviceid];
  
         // In a real app: dispatch action to load the details here.
      });
    }

  logout() {
    localStorage.removeItem('id_token');
    this.router.navigate(['login']);
  } 
  forwardOLT(event)
  {
    console.log("forwardOLT");
    event.preventDefault();
    this.infraService.getInfraServices()
    .subscribe(response => {       
      console.log("in getInfraServices in subscriberprovison resp");
      this.infraserviceid = response.infraservices.voltservice;
      if(this.infraserviceid== null) 
      {        
        if((typeof (this.serviceid) === 'undefined') || (this.serviceid== null)){
          this.infraNotCreate = true; 
        }     
      }
      else
      {
        this.infraNotCreate=false;
        if((typeof (this.serviceid) === 'undefined') || (this.serviceid== null)){    
          this.router.navigate(['/oltpro']);
        }
        else
        {
          this.router.navigate(['/oltpro', this.serviceid]);
        }
      }
      
     },
      error => {
        alert(error.text());
        console.log(error.text());
      });    
  }

  forwardSubscriber(event)
  {  
    event.preventDefault();
    this.infraService.getInfraServices()
    .subscribe(response => {       
      console.log("in getInfraServices in subscriberprovison resp");
      this.infraserviceid = response.infraservices.voltservice;
      if(this.infraserviceid== null) 
      {        
        if((typeof (this.serviceid) === 'undefined') || (this.serviceid== null)){
          this.infraNotCreate = true; 
        }     
        //alert("Create infrasture");
      }
      else
      {
        this.infraNotCreate=false;
        if((typeof (this.serviceid) === 'undefined') || (this.serviceid== null)){   
          this.router.navigate(['/subscriberpro']);
        }
        else
        {
          this.router.navigate(['/subscriberpro', this.serviceid]);
        }
      }
     },
      error => {
        alert(error.text());
        console.log(error.text());
      });
      console.log("forwardSubscriber",this.infraserviceid);
    
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
