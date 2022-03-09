
import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder } from '@angular/forms';
import { EmpserviceService } from '../empservice.service';
import { Router } from '@angular/router';
import { EmployeeModel } from './employee-dashboard.model';

import { ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  employeeData !: any;
  formValue !:  FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  
  showadd !: boolean;
  showupdate !: boolean;
  constructor(private empcall:EmpserviceService,private router:Router,private formbuilder:FormBuilder,private observer: BreakpointObserver ) { }
  

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      name : [''],
      email :[''],
      pwd :['']
                                         })
    this.getEmployeeDetails();  
                   }                           
postEmployeeDetails()
    {
         this.employeeModelObj.name = this.formValue.value.name;
         this.employeeModelObj.email = this.formValue.value.email;
         this.employeeModelObj.pwd = this.formValue.value.pwd;

         this.empcall.postempdata(this.employeeModelObj)
         .subscribe
         (res=>
                {
                  alert("added successfullly")
                  let ref = document.getElementById('cancel')
                  ref?.click();
                  this.formValue.reset();
                  this.getEmployeeDetails();
                 },err=>
                          {
                          alert("error");
                           }
          )
     }
 


getEmployeeDetails()
{
  this.empcall.getempdata().subscribe
  (res=>
    {
      this.employeeData = res;
    }
  )
}



deleteEmployeeDetails(row : any)
{
  this.empcall.deleteempdata(row.id)
  .subscribe(res=>
    {
      alert("deleted");
      this.getEmployeeDetails(); 
    },err=>
    {
      alert("some error");
    }     
            )
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

onEdit(row:any){
  this.showadd=false;
  this.showupdate=true;

  this.employeeModelObj.id=row.id;
  this.formValue.controls['name'].setValue(row.name);
  this.formValue.controls['email'].setValue(row.email);
  this.formValue.controls['pwd'].setValue(row.pwd);
 }
 updateEmployeeDetails(){
  this.employeeModelObj.name = this.formValue.value.name;
  this.employeeModelObj.email = this.formValue.value.email;
  this.employeeModelObj.pwd = this.formValue.value.pwd;
  this.empcall.updateempdata(this.employeeModelObj.id,this.employeeModelObj)
  .subscribe(res=>
    {
      alert("updated");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getEmployeeDetails();
      } )
 }
whenclickadd(){
  this.formValue.reset();
  this.showadd=true;
  this.showupdate=false;
}


}
