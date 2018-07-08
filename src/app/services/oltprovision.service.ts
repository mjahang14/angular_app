import { Http,Headers,RequestOptions  } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class OltprovisionService {
  url = 'http://localhost:3001/service/create';
  oltServiceUrl = 'http://localhost:3001/getAllOLTDetails';
  deleteserviceUrl = 'http://localhost:3001/deleteservice';

  constructor(private http: Http) { }

  createOLT(oltinfo) {
    console.log(JSON.stringify(oltinfo));
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    oltinfo.create="olt";
    console.log(JSON.stringify(oltinfo));
    return this.http.post(this.url,oltinfo,options)
    .map(response=>{
      response.json();
      },
      error => {
        console.log(error.text());
      }
    );
  }
  getOLTServices(infraServiceId)
  {
    console.log("infraServiceId "+infraServiceId);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('infraServiceId', infraServiceId);
    let options = new RequestOptions({ headers: headers});
    return this.http.get(this.oltServiceUrl,options)
    .map(response => {
      console.log("response in getInfraServices ",response);
        return response.json();
      },
    error => {
      alert(error.text());
      console.log(error.text());
    });

  }
  deleteOLTService(serviceid,oltid)
  {
    console.log("deleteSubscriberService ");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('infraServiceId', serviceid);
    headers.append('serviceId', oltid);
    headers.append('deleteservice', "OLT");
    let options = new RequestOptions({ headers: headers});
    return this.http.delete(this.deleteserviceUrl, options)
    .map(response => {
      console.log("response in getSubscriberServices ",response);
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
