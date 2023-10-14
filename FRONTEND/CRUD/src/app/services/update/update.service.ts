import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ListService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  updateRow(rowNumber: number, updatedData: any) {
    const url = `${this.baseUrl}/update-row/${rowNumber}`;
    return this.http.put(url, updatedData);
  }
}

