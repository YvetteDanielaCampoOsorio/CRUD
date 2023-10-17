import { Component } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-add-row',
  templateUrl: './add-row.component.html',
  styleUrls: ['./add-row.component.css']
})
export class AddRowComponent {
  newRow : any = {
    Name: '',
    Gmail: '',
    Password: ''
}
  
constructor(private dataService: DataService) {}

onSubmit() {
  if (!this.newRow.Name || !this.newRow.Gmail || !this.newRow.Password) {
    alert('Por favor, complete todos los campos antes de registrar.');
    return; // No realizar la solicitud si falta algún dato
  }

  this.dataService.createRow(this.newRow).subscribe((response: any) => {
    // Aquí puedes manejar la respuesta del servidor si es necesario.
    
    console.log('Registro agregado:', response);

    location.reload();
  });
}
}
