import { DataService } from './../services/data.service';
import { InfraprovisionService } from './../services/infraprovision.service';
import { OltprovisionService } from './../services/oltprovision.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'oltprovision',
  templateUrl: './oltprovision.component.html',
  styleUrls: ['./oltprovision.component.css']
})
export class OltprovisionComponent implements OnInit {
  serviceid:any;
  private sub: any;
  infraserviceid;
  complexForm : FormGroup;
  editOlt;
  constructor(private route: ActivatedRoute,public router: Router, private oltservice: OltprovisionService
    , private infraService: InfraprovisionService,public authService: AuthService,
    public fb: FormBuilder, private dataService: DataService) { 
      this.complexForm = fb.group({
        'name' : [null, Validators.required],
        'id': [null, Validators.compose([Validators.required, Validators.min(1),Validators.max(4294967295)])],
        'oltmac' : [null, Validators.compose([Validators.required, Validators.pattern("^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$")])],
        'address': [null, Validators.required],
        'svlan' : [null, Validators.compose([Validators.required, Validators.min(1),Validators.max(4094)])],
        'eanid': [null, Validators.required],
        'eanport' : [null, Validators.required],
        'loopbackIP': [null, Validators.compose([Validators.required, Validators.pattern( "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)")])]        
      })
      this.editOlt=dataService.storage;
      if(this.editOlt!= null){
       // this.complexForm.controls['name'].setValue(this.editOlt.infraserviceid,{disabled:true});
        this.complexForm.controls['id'].setValue(this.editOlt.oltid);
        this.complexForm.controls['id'].disable();
        this.complexForm.controls['oltmac'].setValue(this.editOlt.oltmac);
        this.complexForm.controls['address'].setValue(this.editOlt.address);
        this.complexForm.controls['svlan'].setValue(this.editOlt.svlan);
        this.complexForm.controls['eanid'].setValue(this.editOlt.eanid);
        this.complexForm.controls['eanport'].setValue(this.editOlt.eanport);
        this.complexForm.controls['loopbackIP'].setValue(this.editOlt.loopbackip);  
        this.complexForm.controls['name'].setValue(this.editOlt.serviceid, {onlySelf: true,disabled:true});  
        
        dataService.storage=null;   
         
      }

      
      
    }

  ngOnInit() {
    console.log("in ngOnInit");
    this.sub=this.route.params.subscribe(params => {
      if((typeof (params['serviceid']) != 'undefined') 
      && (params['serviceid']!= null)){
         this.serviceid = params['serviceid']; // (+) converts string 'id' to a number
         console.log(this.serviceid);
         this.infraserviceid=[this.serviceid];
         this.complexForm.controls['name'].setValue(this.serviceid, {onlySelf: true});
      }
  
         // In a real app: dispatch action to load the details here.
      });
     
      this.infraService.getInfraServices()
      .subscribe(response => {       
        console.log("in getInfraServices in oltprovison resp");
        this.infraserviceid = response.infraservices.voltservice;
       },
        error => {
          alert(error.text());
          console.log(error.text());
        }); 
    }
    createOLT(oltmodel) {
      
     // console.log("OLT page ",this.complexForm.getRawValue());
     // console.log("OLT page ",oltmodel.getRawValue());
      this.oltservice.createOLT(oltmodel)
      .subscribe(response => {  
        console.log("Olt Created",response);     
          alert("Olt Created Successfully");
          this.router.navigate(['/home', oltmodel.name]);
        },
        error => {
          alert(error.text());
          console.log("OLT page ",oltmodel.name);
          //this.router.navigate(['/home', oltmodel.name]);
          console.log(error.text());
        });     
    }

    ngOnDestroy() {
      this.sub.unsubscribe();
    }

    clearValue(event,subform)
    {
      event.preventDefault();
      console.log("Olt form clearValue");
      subform.reset();
    }
}


