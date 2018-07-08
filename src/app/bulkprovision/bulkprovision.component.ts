import { AuthService } from './../services/auth.service';
import { BulkprovisionService } from './../services/bulkprovision.service';
import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Http, Response } from '@angular/http';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

@Component({
  selector: 'bulkprovision',
  templateUrl: './bulkprovision.component.html',
  styleUrls: ['./bulkprovision.component.css']
})
export class BulkprovisionComponent implements OnInit {
  filesToUpload: Array<File>;
  filelist;
  isvalidate;
  isdryrun;
  iscommit;
  
  
  constructor(private http: Http, private el: ElementRef,private bulkProservice: BulkprovisionService
        ,public  authService: AuthService) { 
    this.filesToUpload = [];

  }

  ngOnInit() {
    
    this.bulkProservice.displayFiles()
    .subscribe(response => {       
       this.filelist=response.filelist;
      //  if(this.filelist!=null)
      //  {
      //    console.log("-------")
      //    this.filelist.forEach(file => {
      //      this.isValidatebutton(file);             
      //    })
      //  }
      },
      error => {
        alert(error);            
        console.log(error.text());
      });
      
      
  }
  isValidatebutton(filename)
  {
    this.bulkProservice.validateEnable(filename)
    .subscribe(response => {       
       this.isvalidate=response.validate;
       this.isdryrun=response.dryrun;
       this.iscommit=response.commit;
       console.log("response ",response);
      },
      error => {
        alert(error);            
        console.log(error.text());
      });
    return this.isvalidate;
  }
  isNSODryrunbutton(filename)
  {
    this.bulkProservice.validateEnable(filename)
    .subscribe(response => {       
       this.isvalidate=response.validate;
       this.isdryrun=response.dryrun;
       this.iscommit=response.commit;
       console.log("response ",response);
      },
      error => {
        alert(error);            
        console.log(error.text());
      });
    return this.isdryrun;
  }
  isCommitbutton(filename)
  {
    this.bulkProservice.validateEnable(filename)
    .subscribe(response => {       
       this.isvalidate=response.validate;
       this.isdryrun=response.dryrun;
       this.iscommit=response.commit;
       console.log("response ",response);
      },
      error => {
        alert(error);            
        console.log(error.text());
      });
    return this.iscommit;
  }
  
  fileChangeEvent(fileInput: any){
     this.filesToUpload = <Array<File>> fileInput.target.files;
   }
  upload() {
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    console.log("iam+ "+inputEl);
    this.filesToUpload
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    //let filelist=[];
    if (fileCount > 0) { // a file was selected
        for (let i = 0; i < fileCount; i++) {
          //console.log(inputEl.files.item(i).name.split('.')[0]);
            formData.append(inputEl.files.item(i).name.split('.')[0], inputEl.files.item(i));
        }
        
        this.bulkProservice.uploadfile(formData)
        .subscribe(response => {       
          alert("File uploaded sucessfully!.");
          this.filelist=response.filelist;
          },
          error => {
            alert(error);            
            console.log(error.text());
          });
      }
      
   }
   validate(event,fileName)
   {
    console.log("validate file"+fileName);
    
    this.bulkProservice.validateUI(fileName).subscribe(result => { 
      if (result){
        alert("Validation Finished");
      }             
    },
    error => {      
      console.log("in error comp");
    });
   }
   nsodryrun(event,fileName)
   {
      console.log("NSO Dry Run file"+fileName);
      
      this.bulkProservice.nsoDryrun(fileName).subscribe(result => { 
        if (result){
          alert("Dryrun Finished");
        }             
      },
      error => {      
        console.log("in error comp");
      });
   }
   commit(event,fileName)
   {
    console.log("NSO commit file"+fileName);
    
    this.bulkProservice.nsoCommit(fileName).subscribe(result => { 
      if (result){
        alert("NSO Commit Finished");
      }             
    },
    error => {      
      console.log("in error comp");
    });
   }

}
