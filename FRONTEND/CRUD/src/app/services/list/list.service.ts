import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private baseUrl = 'http://localhost:3000';
  
  constructor(private http: HttpClient) { }

  getListData() {
    const url = `${this.baseUrl}/get-row`
    return this.http.get(url);
  }
}
