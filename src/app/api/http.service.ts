import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  readonly ROOT_URL;

  constructor(private http : HttpClient) {
    this.ROOT_URL = 'https://centralAttendance.fly.dev';
   }

  get(uri : string ){
   return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  post(uri :string, payload: Object){
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload)
  }

   patch(uri :string, id : String, payload: Object){
    return this.http.patch(`${this.ROOT_URL}/${uri}/${id}`, payload)
  }
  
  delete(uri : String, id:String){
    return this.http.delete(`${this.ROOT_URL}/${uri}/${id}`)
  }

}
