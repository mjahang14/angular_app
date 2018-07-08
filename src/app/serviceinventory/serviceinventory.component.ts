import { DataService } from './../services/data.service';
import {ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { InfraprovisionService } from './../services/infraprovision.service';
import { OltprovisionService } from './../services/oltprovision.service';
import { SubscriberprovisionService } from './../services/subscriberprovision.service';
import { AuthService } from './../services/auth.service';


@Component({
  selector: 'serviceinventory',
  templateUrl: './serviceinventory.component.html',
  styleUrls: ['./serviceinventory.component.css']
})
export class ServiceinventoryComponent implements OnInit {

  current: number = 0;
  items: Array<any>;
  subitems: Array<any>;
  infraservices: Array<any>;
  oltservices: Array<any>;
  subServices: Array<any>;
  title="Infrastructure's";
  serviceid;
  deletesub:boolean;
  deleteolt:boolean;
  deleteinfra:boolean;
  disableLink: boolean = true;
  
  constructor(public router: Router, private infraService: InfraprovisionService,
    private oltService: OltprovisionService,
    private subService: SubscriberprovisionService,
    public authService: AuthService,
    private dataService: DataService) { 
      console.log("In constructor");
      this.infraService.getInfraServices()
      .subscribe(response => {       
        console.log("in resp");
        this.infraservices = response.infraservices.voltservice;
        //console.log("login result ",response.infraservices.voltservice[0]['bng-id']);
        //this.infraservices=infraservice;
        this.items =[
          {
            "title": this.title,
              "infradetails":response.infraservices.voltservice
          }
        ]
        //console.log(this.items);
        },
        error => {
          alert(error.text());
          console.log(error.text());
        });  
  }
  ngOnInit() {
    console.log("Ng init method");
  }

  openservicelist(event,volthaid)
  {
    this.serviceid=volthaid;
    event.preventDefault();
    this.oltService.getOLTServices(volthaid)
    .subscribe(response => {       
      console.log("in getOLTServices resp",response);
    if(response!=null){
      this.oltservices = response.oltinfo.olt;
    }
    else
    {
      this.oltservices=null;
    }
    
     // console.log("oltservicelist result ",response.oltinfo.olt);
    },
    error => {
      alert(error.text());
      console.log(error.text());
    });
    
    this.subService.getSubscriberServices(volthaid)
    .subscribe(response => {       
      console.log("in getSubscriberServices resp",response);
      if(response!=null){
        this.subServices = response.subinfo.subscriber;
      }
      else
      {
        this.subServices=null;
      }
          
    },
    error => {
        alert(error.text());
        console.log(error.text());
      });      
    }
    deleteInfra(event,serviceid,index)
    {
      console.log("deleteInfra",serviceid);
      event.preventDefault();
      this.infraService.deleteInfra(serviceid)
      .subscribe(result => { 
        console.log("deleteInfra result ",result);
        //let index = this.infraservices.indexOf(serviceid);
        console.log("index ",index);
        this.infraservices.splice(index, 1);
        this.oltservices= null;
        this.subServices=null;
      },
      error => {
        alert(error.text());
        console.log("in error comp",error.text());
      });
     
    }
    editInfra(event,infraserviceid)
    {
      console.log("editInfra"+infraserviceid);
      event.preventDefault();
      for (let entry of this.infraservices) {
        if(entry.name==infraserviceid){
          console.log(entry.name); 
          this.dataService.storage=
          {
            "infraserviceid":infraserviceid,
            "bngid":entry['bng-id'],
            "bngport":entry['bng-port'],
            "voltid":entry['volt-id'],
            "eanid":entry['ean-id'],
            "eanport":entry['ean-port'],
            "bngpolicy":entry['bng-policy'],
            "subscribermgmtid":entry['subscriber-mgmt-id'],
            "loopbackip":entry['loopback_ip']
          }
        }
      }     
      this.router.navigate(['/infraprovision']);
    }
    editOLT(event,infraserviceid,oltid)
    {
      console.log("editOlt"+infraserviceid);
      event.preventDefault();
      for (let entry of this.oltservices) {
        if(entry['olt_id']==oltid){
          console.log(entry['olt_id']); 
          this.dataService.storage=
          {
            "serviceid":infraserviceid,
            "oltid":entry['olt_id'],
            "oltmac":entry['olt_mac'],
            "svlan":entry['s-vlan'],
            "eanid":entry['ean-id'],
            "eanport":entry['ean-port'],
            "loopbackip":entry['loopback_ip'],
            "address": entry['address'] 
          }
        }
      }     
      this.router.navigate(['/oltpro']);
    }
    editSubscriber(event,infraserviceid,subid)
    {
      console.log("editSub"+infraserviceid);
      event.preventDefault();
      for (let entry of this.subServices) {
        if(entry['subscriber_id']==subid){
          console.log(entry['subscriber_id']); 
          this.dataService.storage=
          {
            "serviceid":infraserviceid,
            "subid":entry['subscriber_id'],
            "username":entry['username'],
            "userpassword":entry['password'],
            "svlan":entry['s-vlan'],
            "rgmac":entry['rg-mac'],
            "cvlan":entry['c-vlan'],
            "address": entry['address']   
          }
        }
      }     
      this.router.navigate(['/subscriberpro']);
    }
    deleteOLT(event,serviceid,oltid,index)
    {
      console.log("deleteOLT");
      event.preventDefault();
      this.oltService.deleteOLTService(serviceid,oltid)
      .subscribe(result => {
        console.log("deleteOLT result ",result);           
        console.log("index ",index);
        this.oltservices.splice(index, 1);          
        this.subServices=null;                  
      },
      error => {
        alert(error.text());
        console.log("in error comp",error.text());
      });
    }
  
    deleteSub(event,serviceid,subscriberid,index)
    {
      console.log("deleteSub");
      event.preventDefault();
      this.subService.deleteSubscriberService(serviceid,subscriberid)
      .subscribe(result => {  
        console.log("deleteSub result ",result);   
        console.log("index",index);
        this.subServices.splice(index, 1);             
      },
      error => {
        alert(error.text());
        console.log("in error comp",error.text());
      }); 
    }
    

}
