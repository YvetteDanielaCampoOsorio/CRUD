import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ListService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  addRow(newData: any) {
    const url = `${this.baseUrl}/add-row`;
    return this.http.post(url, newData);
  }
}


