import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getuserurl="https://fakestoreapi.com/products";
 public getusers():Observable<any>
  {
    return this.http.get(`${this.getuserurl}`);
  }
  postuserurl="https://reqres.in/api/users";
  
    public postusers(value:any):Observable<any>
    {
      return this.http.post(`${this.postuserurl}`,value)
    }
    updateuserurl="https://fakestoreapi.com/products/";

    public updateuser(id:any,data:any):Observable<any>
    {
      return this.http.put(`${this.updateuserurl}/${id}`,data)
    }

      deleteuserurl="https://reqres.in/api/users/";

    public deleteuser(id:any):Observable<any>
    {
      return this.http.delete(`${this.deleteuserurl}/${id}`)
    }

    getid()
    {
      return localStorage.getItem("id");

    }
  
}
