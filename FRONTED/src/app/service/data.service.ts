import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  
  private backendUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  //POST agregar una fila a la hoja
  createRow(row: any) {
    const url = `${this.backendUrl}/add-row`;
    return this.http.post(url, row);
  }

  //DELETE eliminar una fila 
  deleteRow(index: string) {
    const url = `${this.backendUrl}/delete-row/${index}`;
    return this.http.delete(url);
  }

  //GET obtener una fila
  getRow(index: string) {
    const url = `${this.backendUrl}/get-row/${index}`;
    return this.http.get(url);
  }
  
  //GET obtener todas las filas
  getRows() {
    const url = `${this.backendUrl}/get-rows`;
    return this.http.get(url);
  }

  //UPDATE actualizar una fila
  updateRow(index: string, updateRow: any) {
    const url = `${this.backendUrl}/update-row/${index}`;
    return this.http.put(url, updateRow);
  }
}
