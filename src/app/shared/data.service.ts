import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private scriptLoaded = false;
  constructor(private http: HttpClient) {}

  getData(Id: string): Observable<any> {
    const url = `https://ps.visarity.com/campaigns/${Id}/${Id}.json?t=${Date.now()}`;
    return this.http.get<any>(url);
  }

  
}
