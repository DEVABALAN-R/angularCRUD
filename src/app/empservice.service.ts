import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpserviceService {

  constructor(private empapi:HttpClient) { }
  getempdata()
  {
    return this.empapi.get("https://61612c7e9cc856001706b6c8.mockapi.io/employees");
   
  }
  postempdata(data:any)
  {
    return this.empapi.post<any>("https://61612c7e9cc856001706b6c8.mockapi.io/employees",data);
   
  }
 
  deleteempdata(id:number)
  {
  return this.empapi.delete<any>("https://61612c7e9cc856001706b6c8.mockapi.io/employees/"+id);
  
  }
  updateempdata(id:number,data:any)
  {
  return this.empapi.put<any>("https://61612c7e9cc856001706b6c8.mockapi.io/employees/"+id,data);
  
  }

}


