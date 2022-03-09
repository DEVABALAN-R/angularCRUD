import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 
  signdata:any;

  public signupform !:FormGroup;
  
  constructor(private formbuilder:FormBuilder,private http:HttpClient,private router:Router) { }
 
   

  ngOnInit(): void {
    this.signupform=this.formbuilder.group({
      name:['',Validators.required],
      email:['',Validators.required],
      mobile:['',Validators.required],
      pwd:['',Validators.required]
    })
   }
 signUp(){
   this.http.post<any>("https://61612c7e9cc856001706b6c8.mockapi.io/signupuser",this.signupform.value)
   .subscribe(res=>{alert("signup successfull");this.signupform.reset();
  this.router.navigate(['login']);},err=>{alert("somthingwent wrong");})
 }
 
  }



  
