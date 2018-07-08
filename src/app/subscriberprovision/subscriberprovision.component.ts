import { DataService } from './../services/data.service';
import { InfraprovisionService } from './../services/infraprovision.service';
import { SubscriberprovisionService } from './../services/subscriberprovision.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'subscriberprovision',
  templateUrl: './subscriberprovision.component.html',
  styleUrls: ['./subscriberprovision.component.css']
})
export class SubscriberprovisionComponent implements OnInit {
  serviceid:any;
  private sub: any;
  infraserviceid;
  complexForm : FormGroup;
  editSubscriber;

  constructor(private route: ActivatedRoute,public router: Router, 
    private subProservice: SubscriberprovisionService
    ,private infraService: InfraprovisionService
    ,public  authService: AuthService
    ,public fb: FormBuilder
    ,private dataService: DataService) { 
      this.complexForm = fb.group({
        'name' : [null, Validators.required],
        'subid': [null, Validators.required],
        'uname' : [null, Validators.required],
        'userpassword': [null, Validators.required],
        'rgmac' : [null, Validators.compose([Validators.required, Validators.pattern("^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$")])],
        'cvlan': [null, Validators.compose([Validators.required, Validators.min(1),Validators.max(4094)])],
        'svlan' : [null, Validators.compose([Validators.required, Validators.min(1),Validators.max(4094)])],
        'address': [null, Validators.required]        
      })
      this.editSubscriber=dataService.storage;
      if(this.editSubscriber!= null){
        //this.complexForm.controls['name'].setValue(this.editOlt.infraserviceid);
        this.complexForm.controls['subid'].setValue(this.editSubscriber.subid,{disabled:true});
        //name: [{value: '', disabled:true}]
        this.complexForm.controls['uname'].setValue(this.editSubscriber.username);
        this.complexForm.controls['userpassword'].setValue(this.editSubscriber.userpassword);
        this.complexForm.controls['rgmac'].setValue(this.editSubscriber.rgmac);
        this.complexForm.controls['cvlan'].setValue(this.editSubscriber.cvlan);
        this.complexForm.controls['svlan'].setValue(this.editSubscriber.svlan);
        this.complexForm.controls['address'].setValue(this.editSubscriber.address);
        this.complexForm.controls['name'].setValue(this.editSubscriber.serviceid, {onlySelf: true});
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
      console.log("in getInfraServices in subscriberprovison resp");
      this.infraserviceid = response.infraservices.voltservice;
      
     },
      error => {
        alert(error.text());
        console.log(error.text());
      });   
  }

  createSubscriber(subscriberInfo) {
    console.log("createSubscriber page ",subscriberInfo);
    this.subProservice.createSubscriber(subscriberInfo)
    .subscribe(response => {       
      alert("Subscriber created Successfully");
      this.router.navigate(['/home', subscriberInfo.name]);
      },
      error => {
        alert(error.text());
        console.log("subscriber page ",subscriberInfo.name);
        //this.router.navigate(['/home', subscriberInfo.name]);
        console.log(error.text());
      });     
  }

  clearValue(event,subform)
  {
    event.preventDefault();
    console.log("Subscriber form clearValue");
    subform.reset();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
