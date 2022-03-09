import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup,Validators  } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations:[
    trigger('fade',[
      state('void',style({opacity:0})),
      transition(':enter,:leave',[
        style({backgroundColor:'yellow',opacity:0}),
        animate(2000,style({backgroundColor:'white',opacity:1}))
      ])
  ])
   ]
})
export class LoginComponent implements OnInit {
  public loginform!:FormGroup
  
  constructor(private builderform:FormBuilder,private http: HttpClient ,private router:Router) { }

  ngOnInit(): void 
          {
            this.loginform=this.loginform=this.builderform.group
             ({
              email:['',Validators.required],
              pwd:['',Validators.required]
              })
          }
  
  login()
  {
  this.http.get<any>("https://61612c7e9cc856001706b6c8.mockapi.io/signupuser").subscribe
        (res=>
          {
           const user =res.find(
                (a:any)=>
                   {
                    return a.email === this.loginform.value.email && a.password === this.loginform.value.password;
                   }           );
           
            if(user)
               {
                  alert("login success");
                  this.loginform.reset();
                  this.router.navigate(['dashboard'])
              }
            else
               {
                   alert("user not found");
               }
         },err=>
              {
                alert("something went wrong")
              }
        )
   }



}
