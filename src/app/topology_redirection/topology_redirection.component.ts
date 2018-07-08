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
  templateUrl: './../topology/topology.component.html',
  styleUrls: ['./../topology/topology.component.css']
})
export class TopologyRedirectionComponent implements OnInit {

topologylist: any[];

  //myDiagramDiv: go.Diagram = new go.Diagram();
  
//  var topologylist;
  
    

  constructor(public router: Router, public authService: AuthService , private topologyservice: TopologyService) {
    topologylist=[];
    //this.getTopology();
	 // console.log("topologylist in init method ",topologylist);
   }
   
   
   
  ngOnInit() 
  {
	  
	  this.router.navigate(['/topology']);
	 
    
}




}