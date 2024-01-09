import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

baseurl='http://localhost:3000';
httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

constructor(private http:HttpClient) { }

  //Create Restaurent Using Post Method
  postRestraurent(data:any){
    let API_URL = `${this.baseurl}/add-records`;
    return this.http.post(API_URL, data)
  }

  //Get Restaurent Data using Get Method
  getRestaurent(){
    let API_URL = `${this.baseurl}/all-records`;
    return this.http.get(API_URL)
    console.log('data',API_URL);
  }

  //Update Restaurent Data using Put Method
  updateRestaurent(id:number,data:any,){
    let API_URL = `${this.baseurl}/edit-records/${id}`;
    return this.http.put(API_URL, data, {headers : this.httpHeaders} )
    // return this.http.put<any>(this.baseurl+id,data).pipe(map((res:any)=>{
    //   return res;
    //   })) 
  }

  //Delete Restaurent Data using Delete Method
  deleteRestaurent(id:number){
    let API_URL = `${this.baseurl}/delete-records/${id}`;
    return this.http.delete(API_URL, {headers : this.httpHeaders})
    // return this.http.delete<any>(this.baseurl+id).pipe(map((res:any)=>{
    //   return res;
    //   })) 
  }

}
