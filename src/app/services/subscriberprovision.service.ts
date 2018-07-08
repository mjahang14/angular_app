import { Http,RequestOptions,Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SubscriberprovisionService {

  url = 'http://localhost:3001/service/create';
  subServiceUrl = 'http://localhost:3001/getAllSubDetails';
  deleteserviceUrl = 'http://localhost:3001/deleteservice';
  
    constructor(private http: Http) { }
  
    createSubscriber(subscriberInfo) {
      console.log(JSON.stringify(subscriberInfo));
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      subscriberInfo.create="subscriber";
      console.log(JSON.stringify(subscriberInfo));
      return this.http.post(this.url,subscriberInfo,options)
      .map(response=>{
        response.json();
        },
        error => {
          console.log(error.text());
        }
      );
    }

    getSubscriberServices(infraServiceId)
    {
      console.log("infraServiceId "+infraServiceId);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('infraServiceId', infraServiceId);
      let options = new RequestOptions({ headers: headers});
      return this.http.get(this.subServiceUrl,options)
      .map(response => {
        console.log("response in getSubscriberServices ",response);
          return response.json();
        },
      error => {
        alert(error.text());
        console.log(error.text());
      });
  
    }
    deleteSubscriberService(serviceid,subscriberid)
    {
      console.log("deleteSubscriberService ");
      let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('infraServiceId', serviceid);
      headers.append('serviceId', subscriberid);
      headers.append('deleteservice', "Subscriber");
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
