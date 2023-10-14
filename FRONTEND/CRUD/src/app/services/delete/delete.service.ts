import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DeleteService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  deleteRow(index: number) {
    const url = `${this.baseUrl}/delete-row/${index}`;
    return this.http.delete(url);
  }
}

