import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignapiService {

  constructor(private http:HttpClient) { }
  getsigndata()
  {
    return this.http.get("https://61612c7e9cc856001706b6c8.mockapi.io/signupuser");
  }
  postsignindata(val:any)
  {
    return this.http.post("https://61612c7e9cc856001706b6c8.mockapi.io/signupuser",val);
  }
}
