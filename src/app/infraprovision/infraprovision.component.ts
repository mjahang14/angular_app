import { DataService } from './../services/data.service';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import {InfraprovisionService} from './../services/infraprovision.service';
import { AuthService } from './../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-infraprovision',
  templateUrl: './infraprovision.component.html',
  styleUrls: ['./infraprovision.component.css']
})
export class InfraprovisionComponent {
  jwt: string;
  decodedJwt: string;
  response: string;
  api: string;
  bngpolicy;
  complexForm : FormGroup;
	serviceid:any;
  private sub: any;
  infraserviceid;
  infradet;
  editservice;

  constructor(private route: ActivatedRoute,public router: Router, private infraService: InfraprovisionService
    ,public authService: AuthService,public fb: FormBuilder, private dataService:DataService) { 
      
      this.complexForm = fb.group({
        'name' : [null, Validators.required],
        'bngid': [null, Validators.required],
        'bngport' : [null, Validators.required],
        'eanid': [null, Validators.required],
        'eanport' : [null, Validators.required],
        'bngpolicy': [null, Validators.required],
        'voltid' : [null, Validators.required],
        'subscribermgmtip': [null, Validators.required],
        'loopbackIP' : [null, Validators.compose([Validators.required, Validators.pattern( "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)")])]       
      })

      this.editservice= dataService.storage;  
      
      if(this.editservice!= null){

        this.infraService.getBngpolicy(this.editservice.bngid)
        .subscribe(response => {       
          
          var policy = response.bngpolicy;
          console.log("login result ",policy);
          this.bngpolicy=response.bngpolicy;
          
          console.log(this.bngpolicy);
          },
          error => {
            alert(error.text());
            console.log(error.text());
          });
        this.complexForm.controls['name'].setValue(this.editservice.infraserviceid);
        this.complexForm.controls['bngid'].setValue(this.editservice.bngid);
        this.complexForm.controls['bngport'].setValue(this.editservice.bngport);
        this.complexForm.controls['eanid'].setValue(this.editservice.eanid);
        this.complexForm.controls['eanport'].setValue(this.editservice.eanport);
        this.complexForm.controls['voltid'].setValue(this.editservice.voltid);
        this.complexForm.controls['subscribermgmtip'].setValue(this.editservice.subscribermgmtid);
        this.complexForm.controls['loopbackIP'].setValue(this.editservice.loopbackip);
        this.complexForm.controls['bngpolicy'].setValue(this.editservice.bngpolicy, {onlySelf: true});
    }
  }
  ngOnInit() {
    // this.editservice= this.dataService.storage;
    
    // console.log(this.complexForm.touched);  
    // if(this.editservice!= null){
    //   this.getBngpolicy(this.editservice.bngid);
    //   this.complexForm.controls['bngpolicy'].setValue(this.bngpolicy, {onlySelf: true});
    // }
        
    }

    // ngOnDestroy() {
    //   this.sub.unsubscribe();
    // }
  createInfra(infra) {
    console.log("Infra page ",infra);
    this.infraService.createInfra(infra)
    .subscribe(response => {       
        alert("Infrastructure created Successfully");
        this.router.navigate(['/home', infra.name]);
      },
      error => {
        alert(error.text());
        console.log("Infra page ",infra.name);
        //this.router.navigate(['/home', infra.name]);
        console.log(error.text());
      });     
  }
  getBngpolicy(bngid) {
    console.log("Infra page ",bngid);
    
    this.infraService.getBngpolicy(bngid)
    .subscribe(response => {       
      
      var policy = response.bngpolicy;
      console.log("login result ",policy);
      this.bngpolicy=response.bngpolicy;
      },
      error => {
        alert(error.text());
        console.log(error.text());
      });     
  }
  clearValue(event,infraform)
  {
    event.preventDefault();
    console.log("Infra form clearValue");
    infraform.reset();
  }
 

}
