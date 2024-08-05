import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }
  apiUrl: any;
  setApiUrl(value: any) {
    this.apiUrl = value;
  }
  getItems(){
    return this.http.get(this.apiUrl)
  }
  getItem(id:any){
    return this.http.get(`${this.apiUrl}/${id}`)
  }
  addItem(item:any){
    return this.http.post(this.apiUrl,item)
  }
  updateItem(item:any,id:any){
    return this.http.put(`${this.apiUrl}/${id}`,item)
  }
  deleteItem(id:any){
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
