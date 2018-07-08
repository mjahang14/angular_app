// import { Link } from './../../release/go-debug.d';
// import { Diagram } from './../../release/go.d';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import {TopologyService} from './../services/topology.service';
//import * as go from 'gojs';
import './../../release/goimp.js';
import './../../release/go.js';
import './../../release/goimp_svg.js';
//declare function init() :any;
declare var initobj : any;
declare var initobj_svg : any;
 var topologylist =[];
//declare var go : any;

@Component({
  selector: 'topology',
  templateUrl: './topology.component.html',
  styleUrls: ['./topology.component.css']
})
export class TopologyComponent implements OnInit {

topologylist: any[];

  //myDiagramDiv: go.Diagram = new go.Diagram();
  
//  var topologylist;
  
    

  constructor(public router: Router, public authService: AuthService , private topologyservice: TopologyService) {
    topologylist=[];
    //this.getTopology();
	 // console.log("topologylist in init method ",topologylist);
   }
   
   reload() 
  {
	 // window.location.reload();  
//window.location.href="topology_redirection.html";	  
//this.router.push("/topology");
this.router.navigate(['/topology_redirection']);
    
}
   
  ngOnInit() 
  {
	  console.log("in constructor");
	 this.getTopology("init");
	 console.log("topologylist in init method ",this.topologylist);
    //initobj_svg.init();
     
    
}


getTopology(name) {
    console.log("Inside get of topology component.ts");
    
    this.topologyservice.getTopology().subscribe(response => {       
      
      //var topology = response.topology;
	  this.topologylist=response.topology;
      //console.log("login result ",topology);
	  console.log("topologylist in get method ",this.topologylist);
	  //console.log("topologylist in get method text check",this.topologylist[0].Name);
	  	   
	  //initobj.init(this.topologylist);
	  
	  initobj_svg.init(this.topologylist);
	  
	  //return topology;
      //this.bngpolicy=response;
      },
      error => {
        alert(error.text());
        console.log(error.text());
      });     
  }

}
