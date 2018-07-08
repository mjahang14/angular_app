import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions  } from '@angular/http';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt'; 
import 'rxjs/add/operator/map'; 

@Injectable()
export class InfraprovisionService {
  //currentUser: any; 
  url = 'http://localhost:3001/service/create';
  bngUrl = 'http://localhost:3001/bngpolicy';
  infraServiceUrl = 'http://localhost:3001/getAllInfraService';
  deleteserviceUrl = 'http://localhost:3001/deleteservice';
  constructor(private http: Http) { 
    
  }

  createInfra(infra) {
    console.log(JSON.stringify(infra));
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url,infra,options)
    .map(response=>{
      response.json();
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
    );
  }
  getBngpolicy(bngid)
  {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('bngid', bngid);
    let options = new RequestOptions({ headers: headers});
    
    return this.http.get(this.bngUrl,options)
    .map(response => {
      console.log("response in bngpol ",response);
        return response.json();
      },
    error => {
      alert(error.text());
      console.log(error.text());
    });

  }

  getInfraServices()
  {
    return this.http.get(this.infraServiceUrl)
    .map(response => {
      console.log("response in getInfraServices ",response);
        return response.json();
      },
    error => {
      alert(error.text());
      console.log(error.text());
    });
  }
  getInfradetforservid(infraserviceid)
  {
    console.log("infraserviceid in getInfradetforservid ",infraserviceid);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('infraserviceid', infraserviceid);
    let options = new RequestOptions({ headers: headers});
    return this.http.get(this.infraServiceUrl,options)
    .map(response => {
      console.log("response in getInfraServices ",response);
        return response.json();
      },
    error => {
      alert(error.text());
      console.log(error.text());
    });
  }
  deleteInfra(serviceid)
  {
    console.log("deleteSubscriberService ");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('infraServiceId', serviceid);
    headers.append('deleteservice', "infra");
    let options = new RequestOptions({ headers: headers});
    return this.http.delete(this.deleteserviceUrl, options)
    .map(response => {
      console.log("response in deleteInfra ",response.json());
      let result = response.json();
      if (result) {
        return true;
      }
      else 
      return false; 
      },
    error => {
      alert(error.text());
      console.log(error.text());
    });
  }
 
}
