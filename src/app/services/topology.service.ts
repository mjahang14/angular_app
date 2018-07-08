import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions  } from '@angular/http';

@Injectable()
export class TopologyService {
	
	topoUrl = 'http://localhost:3001/topology';

  constructor(private http: Http) { }
  
  getTopology()
  {   
    let headers = new Headers({ 'Content-Type': 'application/json' });
    
    let options = new RequestOptions({ headers: headers});
    return this.http.get(this.topoUrl)
    .map(response => {
      console.log("response in topology ",response);
        return response.json();
      },
    error => {
      alert(error.text());
      console.log(error.text());
    });

  }


}
