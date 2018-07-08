import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers } from '@angular/http';

@Injectable()
export class BulkprovisionService {

  uploadURL= "http://localhost:3001/upload";
  validateURL= "http://localhost:3001/validate";
  dryrunURL= "http://localhost:3001/dryrun";
  commitURL= "http://localhost:3001/commit";
  displayfileList= "http://localhost:3001/displayFiles";
  validateEnableurl= "http://localhost:3001/validateEnable";

  constructor(private http: Http) { }

  uploadfile(fileinfo){
  return this.http.post(this.uploadURL,fileinfo)
  .map(response=>{
    return response.json();
    },
    error => {
      console.log(error.text());
    });
  }
  displayFiles()
  {
    return this.http.get(this.displayfileList)
    .map(response=>{
      return response.json();
      },
      error => {
        console.log(error.text());
      });
  }
  validateEnable(filename)
  {
    console.log("validateEnable "+filename);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('filename', filename);
    let options = new RequestOptions({ headers: headers}); 
    return this.http.get(this.validateEnableurl,options)
    .map(response=>{
      return response.json();
      },
      error => {
        console.log(error.text());
      });
  }
  validateUI(filename)
  {
    console.log("filename "+filename);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('filename', filename);
    let options = new RequestOptions({ headers: headers});   
    return this.http.get(this.validateURL,options)
    .map(response=>{
      console.log(response);
      return true; 
      },
      error => {
        console.log(error);
        return false;
      });
  } 
  nsoDryrun(filename)
  {
    console.log("filename "+filename);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('filename', filename);
    let options = new RequestOptions({ headers: headers});   
    return this.http.get(this.dryrunURL,options)
    .map(response=>{
      console.log(response);
      return true; 
      },
      error => {
        console.log(error);
        return false;
      });
  }

  nsoCommit(filename)
  {
    console.log("filename "+filename);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('filename', filename);
    let options = new RequestOptions({ headers: headers});   
    return this.http.get(this.commitURL,options)
    .map(response=>{
      console.log(response);
      return true; 
      },
      error => {
        console.log(error);
        return false;
      });
  }
  

}
