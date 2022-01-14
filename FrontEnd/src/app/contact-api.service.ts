import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactApiService {

  readonly contactAPIUrl = "https://localhost:7085/api";

  constructor(private http:HttpClient) { }

  // Contacts
  getContactList(key : string, type : number, page : number):Observable<any> {
    let params = new HttpParams();
    params = params.append('PageNumber',page);
    if (key) {
    params = params.append('SearchKey', key);
    }
    params = params.append('SearchType', type);
    const response = this.http.get<any>(this.contactAPIUrl + '/Contacts', {params: params, observe:"body"});
    return response;
  }
  
  getContactDetails(id : number) {
    return this.http.get<any>(this.contactAPIUrl + `/Contacts/${id}`);
  }

  addContact(data:any) {
    return this.http.post(this.contactAPIUrl + '/Contacts', data);
  }

  updateContact(id:number, data:any) {
    return this.http.put(this.contactAPIUrl + `/Contacts/${id}`, data);
  }

  deleteContact(id:number) {
    return this.http.delete(this.contactAPIUrl + `/Contacts/${id}`);
  }
}
